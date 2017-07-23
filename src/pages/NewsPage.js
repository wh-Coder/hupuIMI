'use strict'
import React, {Component} from 'react'
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';

import {ScrollTabBar, ScrollableTabBar} from '../components'
import NewsListPage from './NewsListPage'

class NewsPage extends Component {

  leagues = []

  constructor(props) {
    super(props);
    this.state = {
      newsFollow: [],
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
    // Alert.alert('hello')
    this.setState({newsFollow: [0, 1, 2, 3, 4, 5, 6, 7, 8]})
  }

  renderScrollTabView() {
    return (
      <ScrollableTabView renderTabBar={() => (
       <ScrollableTabBar prerenderingSiblingsNumber={1} addTabItem={this.addTabItem} />)}>
        {
          this.state.newsFollow.map((item, index) => {
            item = this.leagues[item]
            return (
              <View tabLabel={item.nav_name} style={styles.tabLabel} key={index}>
                <NewsListPage en={item.en} navigate={this.props.navigate} />
              </View>
            )
          })
        }
      </ScrollableTabView>
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