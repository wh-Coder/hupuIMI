import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Alert,
  RefreshControl,
  FlatList,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'
import request from '../commons/request'
import config from '../commons/config'
import {List,ThreadsItem} from '../components'

const defaultState = {
  data: [],
  page: 1,
  stamp: 0,
  refreshing: true,
  lastTid: 0,
  nextPage: true,
}

class ThreadsListView extends PureComponent {

  requestType = {
    'recommend': 'recommend/getThreadsList',
    'forums': 'forums/getForumsInfoList'
  }

  constructor(props) {
    super(props)

    this.state = defaultState
  }

  componentDidMount() {
    this._getData()
  }

  _getData() {
    if (this.state.nextPage) {
      // 这个接口必传参数：fid,type,page,stamp
      request.get(config.api.bbs + this.requestType[this.props.method], {
        fid: this.props.fid,
        type: this.props.type,
        page: this.state.page,
        stamp: this.state.stamp,
        lastTid: this.state.lastTid,
      })
        .then((res) => {
          console.log(res)
          this.setState({
            refreshing: false,
            moreLoading: false,
            data: this.state.data.concat(res.result.data),
            page: this.state.page + 1,
            stamp: res.result.stamp,
            lastTid: res.result.data[res.result.data.length - 1].tid,
            nextPage: res.result.nextPage,
          })
        }).done()
    } else {
      Alert.alert("没有更多数据啦");
    }
  }

  _onEndReached = () => {
    this.setState({moreLoading: true},() => {
      this._getData()
    })
  }

  _onRefresh = () => {
    this.setState(defaultState, () => {
      this._getData()
    });
  }

  _gotoThreadsWeb(item){
    this.props.navigate('WebViewPage',{
      url: `https://bbs.hupu.com/${item.tid}.html`
    })
  }

  render() {
    return (
      <List
        renderItem={({item}) => (
          <ThreadsItem item={item} onPress={() => this._gotoThreadsWeb(item)} showForum={this.props.method === 'recommend'}/>
        )}
        data={this.state.data}
        keyExtractor={(item) => item.tid}
        onEndReached={this._onEndReached}
        moreLoading={this.state.moreLoading}
        onRefresh={this._onRefresh}
        refreshing={this.state.refreshing}
      />
    )
  }
}

ThreadsListView.defaultProps = {
  fid: 0,
  type: 0,
  showForum: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

module.exports = ThreadsListView;