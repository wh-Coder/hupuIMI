'use strict'
import React, {Component} from 'react'
import {
  Text,
  View,
  Alert,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import {dp, theme, commonStyle} from '../commons/style'
import {ScrollableTabBar} from '../components'
import NewsListView from './NewsListView'
import TabSelectView from './TabSelectView'

class NewsPage extends Component {

  leagues = []

  constructor(props) {
    super(props);
    this.state = {
      newsFollow: [],
      showTabSelectView: false,
    }
  }

  componentDidMount() {
    store.get('init').then((res) => {
      this.leagues = res.result.leagues

      // 模拟查找本地 follow
      setTimeout(() => {
        this.setState({newsFollow: [0, 1, 2, 3, 4, 7]})
      }, 100)
    })

  }

  addTabItem = () => {
    // 模拟选择完成之后
    // this.setState({newsFollow: [0, 1, 2, 3, 4, 5, 6, 7, 8]})
    this.setState({showTabSelectView: true})
  }

  renderScrollTabView() {
    return (
      <ScrollableTabView
        onChangeTab={this.handleChangeTab}
        renderTabBar={() => (
          <ScrollableTabBar prerenderingSiblingsNumber={0} addTabItem={this.addTabItem} />)}>
        {
          this.state.newsFollow.map((item, index) => {
            item = this.leagues[item]
            return (
              <View tabLabel={item.nav_name} style={styles.tabLabel} key={index}>
                <NewsListView
                  en={item.en}
                  navigate={this.props.navigate}/>
              </View>
            )
          })
        }
      </ScrollableTabView>
    )
  }

  _onCompleted(selected) {
    // console.log(selected)
    this.setState({
      newsFollow: selected,
      showTabSelectView: false
    })
  }

  renderTabSelectView() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.showTabSelectView}>
        <TabSelectView
          tabOptions={this.leagues}
          tabSelected={this.state.newsFollow}
          onCompleted={(selected) => this._onCompleted(selected)}
        />
      </Modal>
    )
  }

  render() {
    console.log('render NewsPage')
    return (
      <View style={styles.container}>
        {
          this.state.newsFollow
            ? this.renderScrollTabView()
            : null
        }
        {this.renderTabSelectView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listBox: {
    flex: 1,
  },
  tabLabel: {
    flex: 1,
  }
});

module.exports = NewsPage;