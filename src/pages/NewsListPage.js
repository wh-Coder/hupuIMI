import React, {Component} from 'react';
import {
  TouchableHighlight,
  RefreshControl,
  ScrollView,
  StyleSheet,
  FlatList,
  Alert,
  Text,
  View,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'
import config from '../commons/config'
import request from '../commons/request'
import {SpinLoading, ScrollTabBar, NewsItem, GameLists} from '../components'

class NewsListPage extends Component {

  nid = 0
  cateId = 0
  currentCat = {cate_type: 'news'}
  isClearData = false
  newsMoreLoading = false

  constructor(props) {
    super(props)
    this.state = {
      newsCateLoading: true,
      newsListLoading: true,
      newsListRefreshing: true,
      newsMoreLoading: false,
      cateList: [],
      data: [],
      cateName: '全部',
    }
  }

  componentDidMount() {
    this._getCateData('News')
  }

  _getCateData(type) {
    return request.get(config.api.games + this.props.en + '/get' + type, {
      nid: this.nid,
    }).then((res) => {
      console.log(res)
      // this.setState({newsCateLoading: false})
      this._handleNewsData(res)
    })
  }

  _getCateNews() {
    return request.get(config.api.games + 'news/getCateNews', {
      nid: this.nid,
      cate_id: this.cateId
    }).then((res) => {
      console.log(res)
      this._handleNewsData(res)
    })
  }

  _handleNewsData(res) {
    // 普通列表数据
    let newState = {data: []}

    // 比赛信息列表
    if (res.result.game && res.result.game.game_lists && res.result.game.game_lists.length !== 0) {
      newState.data.push({
        // 暂时只展示两个
        gameLists: res.result.game.game_lists.slice(0, 2)
      })
    }

    // 热门列表数据拼接到普通列表前面
    if (res.result.hot_list && res.result.hot_list.length !== 0) {
      newState.data = newState.data.concat(res.result.hot_list)
    }

    // 是否清除已经保存的新闻列表
    if (this.isClearData) {
      newState.data = newState.data.concat(res.result.data)
    } else {
      newState.data = this.state.data.concat(newState.data.concat(res.result.data))
    }

    // 目录导航
    if (!this.state.cateList.length) {
      newState.cateList = res.result.cate_list
    }

    // 次页列表的 nid 作为下次请求的节点
    this.nid = res.result.data[res.result.data.length - 1].nid

    // 异步太慢双重保障
    this.newsMoreLoading = false

    this.setState({
      ...newState,
      newsCateLoading: false,
      newsListLoading: false,
      newsMoreLoading: false,
      newsListRefreshing: false,
    })
  }

  _onTabChange(index) {
    // console.log(index)
    this.currentCat = this.state.cateList[index]
    this.setState({
      newsListLoading: true
    }, () => {
      this._getData(true)
    })
  }

  _getData(isClearData) {
    this.isClearData = isClearData
    if (isClearData) {
      this.nid = 0
    }
    switch (this.currentCat.cate_type) {
      case 'cate_news':
        this.cateId = this.currentCat.cate_id
        this._getCateNews();
        break;
      case 'news':
        this._getCateData('News');
        break;
      case 'video':
        this._getCateData('Video');
        break;
      default:
        Alert.alert(this.currentCat.cate_type);
    }
  }

  renderNewsCate() {
    const cate = this.state.cateList.map(item => item.name)

    return (
      <ScrollTabBar tabList={cate} onTabChange={(index) => this._onTabChange(index)}/>
    )
  }

  _onEndReached() {
    // 异步太慢, 双重保障
    if (!this.newsMoreLoading && !this.state.newsMoreLoading) {
      this.newsMoreLoading = true
      this.setState({newsMoreLoading: true}, () => {
        this._getData(false)
      })
    }
  }

  _gotoNewsWeb(item) {
    console.log(item)
  }

  _onRefresh() {
    Alert.alert('_onRefresh')
  }

  renderNewsList() {
    return (
      <View style={styles.listBox}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          keyExtractor={() => Math.random()}
          onEndReachedThreshold={0.3}
          onEndReached={() => this._onEndReached()}
          renderItem={({item, index}) => {
            return item.nid === 0
              ? <GameLists gameLists={item.gameLists}/>
              : <NewsItem onPress={() => this._gotoNewsWeb(item)} item={item} />
          }}
          refreshControl={<RefreshControl
            refreshing={this.state.newsListRefreshing}
            onRefresh={() => this._onRefresh()}
            tintColor="#ff0000"
            title="正在加载"
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />}
        />
        {this.state.newsMoreLoading && this.newsMoreLoading ? <SpinLoading size={dp(40)} fullScreen={false}/> : null}
      </View>
    )
  }

  renderNewsListPage() {
    return (
      <View style={styles.container}>
        {this.renderNewsCate()}
        {this.state.newsListLoading ? <SpinLoading/> : this.renderNewsList()}
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.newsCateLoading ? <SpinLoading/> : this.renderNewsListPage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewBox: {
    marginTop: dp(20),
    marginBottom: dp(16),
    marginRight: dp(20),
  },
  category: {
    marginLeft: dp(20),
    paddingVertical: dp(16),
    paddingHorizontal: dp(28),
    borderRadius: dp(20),
    borderBottomLeftRadius: 0,
    backgroundColor: theme.hpBgGray,
  },
  categoryActive: {
    backgroundColor: theme.hpRed,
  },
  cateTitle: {
    color: theme.hpGray
  },
  cateTitleActive: {
    color: '#fff'
  },
  listBox: {
    flex: 1,
  }
});

export default NewsListPage;