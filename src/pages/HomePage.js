import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons'
import store from 'react-native-simple-store';

import {HeaderBar} from '../components'
import {dp, theme, commonStyle} from '../commons/style'
import config from '../commons/config'
import request from '../commons/request'

import NewsPage from './NewsPage'

const tabConfig = [{
  title: '新闻',
  icon: 'paper',
  content: (navigate) => <NewsPage navigate={navigate}/>
}, {
  title: '看球',
  icon: 'basketball',
  content: (navigate) => <View><Text>1</Text></View>
}, {
  title: '社区',
  icon: 'chatboxes',
  content: (navigate) => <View><Text>2</Text></View>
}, {
  title: '装备',
  icon: 'basket',
  content: (navigate) => <View><Text>3</Text></View>
}, {
  title: '更多',
  icon: 'cube',
  content: (navigate) => <View><Text>4</Text></View>
}]

class HomePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab: 0
    }
  }

  componentDidMount() {
    this.getStatusInit()
  }

  getStatusInit() {
    return request.get(config.api.games + 'status/init')
      .then((res) => {
        // console.log(res)
        // store.update('init', {...res})
      })
  }

  search = () => {
    console.log('search')
  }

  render() {
    console.log('device size ===> w:' + theme.screenWidth + ',h:' + theme.screenHeight)
    return (
      <View style={styles.container}>
        <HeaderBar search={this.search}/>
        <TabNavigator tabBarStyle={{paddingBottom: dp(4)}} sceneStyle={styles.scene}>
          {tabConfig.map((item, index) => (
              <TabNavigator.Item
                key={index}
                selected={this.state.selectedTab === index}
                title={item.title}
                titleStyle={{color: theme.fontColorPassive}}
                selectedTitleStyle={{color: theme.fontColorActive}}
                renderIcon={() => <Icon name={`ios-${item.icon}-outline`} size={dp(50)} color={theme.fontColorPassive}/>}
                renderSelectedIcon={() => <Icon name={`ios-${item.icon}`} size={dp(50)} color={theme.fontColorActive}/>}
                onPress={() => this.setState({selectedTab: index})}>
                {item.content(this.props.navigation)}
              </TabNavigator.Item>
            )
          )}
        </TabNavigator>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    backgroundColor: theme.bgColorDefault
  }
})

module.exports = HomePage