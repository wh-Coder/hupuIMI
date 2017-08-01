import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  FlatList,
  Alert,
  Text,
  View,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import ForumsPlateView from '../containers/ForumsPlateView'
import ThreadsListView from '../containers/ThreadsListView'

class ForumsPage extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    console.log('ForumsPage render')
    const {navigate} = this.props
    return (
      <ScrollableTabView
        tabBarBackgroundColor='#fff'
        tabBarActiveTextColor={theme.fontColorActive}
        tabBarInactiveTextColor={theme.fontColorPassive}
        tabBarUnderlineStyle={{backgroundColor: theme.fontColorActive}}>
        <ForumsPlateView navigate={navigate} tabLabel='板块' />
        <ThreadsListView
          tabLabel='推荐'
          method='recommend'
          navigate={navigate}/>
      </ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

module.exports = ForumsPage;