import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  WebView,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from 'react-native';

import queryString from 'query-string';

import {dp, theme, commonStyle} from '../commons/style'
import config from '../commons/config'
import request from '../commons/request'
import {HeaderBar, ShareModal, Mask} from '../components'

const shareConfig = {
  share: [{
    name: 'wx',
    icon: require('../icon/wx.png'),
    title: '微信好友',
    bgColor: '#1ed621'
  }, {
    name: 'pyq',
    icon: require('../icon/pyq.png'),
    title: '微信朋友圈',
    bgColor: '#6fd026'
  }, {
    name: 'qq',
    icon: require('../icon/qq.png'),
    title: 'QQ好友',
    bgColor: '#3a94e8'
  }, {
    name: 'zone',
    icon: require('../icon/zone.png'),
    title: 'QQ空间',
    bgColor: '#fcc600'
  }, {
    name: 'weibo',
    icon: require('../icon/weibo.png'),
    title: '新浪微博',
    bgColor: '#eb4e4e'
  }],
  other: [{
    name: 'collect',
    icon: 'ios-star',
    title: '收藏',
  }, {
    name: 'copy',
    icon: 'ios-link',
    title: '复制链接',
  }, {
    name: 'setting',
    icon: 'ios-options',
    title: '阅读设置',
  }, {
    name: 'more',
    icon: 'ios-more',
    title: '更多',
  }, {
    name: ''
  }]
}

class WebViewPage extends Component {

  myRefs = {webView: null}

  mask = new Animated.Value(0);

  en = 'nba'
  nid = 0
  ncid = 0
  tid = 0
  postListPage = 1
  source = null
  page = ''

  constructor(props) {
    super(props)
    let {url} = this.props.navigation.state.params

    // 处理各种地址, 目前还没找到优雅的方式
    // 如果是帖子 https://bbs.hupu.com/19644160.html?entrance=6
    if (url.indexOf('bbs') > -1) {
      this.page = 'thread'
      let temp = ''
      if (url.indexOf('?')) {
        temp = url.split('?')[0].split('/')
      } else {
        temp = url.split('/')
      }
      // 19644160.html
      this.tid = temp[temp.length - 1].split('.')[0]

      this.source = {uri: 'http://localhost:8080'}
      // if (Platform.OS === 'ios') {
      //   this.source = require('../webview/thread/index.html')
      // } else {
      //   this.source = {uri: 'file:///android_asset/thread/index.html'}
      // }

      // http://lite.hupu.com/s?u=nba/news/2180154&type=1
    } else if (url.indexOf('news') > -1) {
      this.page = 'news'
      const params = queryString.parse('?' + url.split('?')[1])
      const uInfo = params.u.split('/')
      this.nid = uInfo[2]
      this.en = uInfo[0]

      // newState.source = {uri: config.webview.host}
      if (Platform.OS === 'ios') {
        this.source = require('../webview/news/index.html')
      } else {
        this.source = {uri: 'file:///android_asset/news/index.html'}
      }
    }

    this.state = {
      share: false,
    }
  }

  componentDidMount() {
    switch (this.page) {
      case 'thread':
        this.getThreadsSchemaInfo();
        break;
      case 'news':
        this.getNewsDetailSchema();
        break;
    }
  }

  // 帖子正文内容
  getThreadsSchemaInfo = () => {
    return request.get(config.api.bbs + 'threads/getThreadsSchemaInfo', {
      tid: this.tid,
    }).then((res) => {
      let data = {
        type: 'threads',
        res: res
      }
      console.log(data)
      // RN 和 webview 通信慢一点,太快了似乎处理不过来
      setTimeout(() => {
        this.myRefs.webView.postMessage(JSON.stringify(data));
      }, 1000)
    })
  }

  // 帖子普通回复
  getThreadPostListData = () => {
    return request.get(config.api.bbs + 'threads/getsThreadPostList', {
      tid: this.tid,
      page: this.postListPage - 1,
    }).then((res) => {
      let data = {
        type: 'reply',
        res: res,
        page: this.postListPage
      }
      console.log(data)
      this.myRefs.webView.postMessage(JSON.stringify(data));
    })
  }

  // 帖子高亮回复
  getsThreadLightReplyList = () => {
    return request.get(config.api.bbs + 'threads/getsThreadLightReplyList', {
      tid: this.tid,
    }).then((res) => {
      let data = {
        type: 'light',
        res: res
      }
      this.myRefs.webView.postMessage(JSON.stringify(data));
    })
  }

  // 新闻正文内容
  getNewsDetailSchema = () => {
    return request.get(config.api.games + this.en + '/getNewsDetailSchema', {
      nid: this.nid,
    }).then((res) => {
      let data = {
        type: 'news',
        res: res
      }
      // RN 和 webview 通信慢一点,太快了似乎处理不过来
      setTimeout(() => {
        this.myRefs.webView.postMessage(JSON.stringify(data));
      }, 1000)
    })
  }

  // 新闻评论
  getCommentH5 = () => {
    return request.get(config.api.games + 'news/getCommentH5', {
      nid: this.nid,
      ncid: this.ncid,
    }).then((res) => {
      let data = {
        type: 'reply',
        res: res,
      }
      this.myRefs.webView.postMessage(JSON.stringify(data));
    })
  }

  // RN 和 WebView 的通信
  onMessage = (e) => {
    // console.log(e.nativeEvent.data)
    let data = e.nativeEvent.data

    // 正文内容加载完毕,请求回复数据
    if (data.indexOf('OK') > -1) {
      switch (data) {
        case 'threadOK':
          this.getThreadPostListData()
          this.getsThreadLightReplyList()
          break;
        case 'newsOK':
          this.getCommentH5()
          break;
      }
    }

    // 帖子回复页数
    if (data.indexOf('page') > -1) {
      let page = Number(data.replace('page', ''))
      this.postListPage = Number(page)
      this.getThreadPostListData()
    }

    // 调试
    if (data.indexOf('log') > -1) {
      data = data + ''
      data = data.replace('log', '')
      data = JSON.parse(data)
      console.log(data)
    }

  }

  toggleShare = () => {
    this.setState({share: !this.state.share})
  }

  // webView 地址变化
  onNavigationStateChange = (navState) => {
    console.log(navState)
  }


  renderWebView() {
    return (
      <WebView
        style={{flex: 1}}
        automaticallyAdjustContentInsets={false}
        ref={webView => {this.myRefs.webView = webView}}
        source={this.source}
        onNavigationStateChange={this.onNavigationStateChange}
        onMessage={this.onMessage}
        bounces={false}
      />
    )
  }

  renderShare() {
    return (
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={this.state.share}>
        <ShareModal close={this.toggleShare}/>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar back={() => this.props.navigation.goBack()} share={this.toggleShare}/>
        { this.renderWebView() }
        { this.renderShare() }
        {this.state.share ? <Mask/> : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

module.exports = WebViewPage;