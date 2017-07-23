import React from 'react'
import {View, StyleSheet, TouchableOpacity,Text} from 'react-native'
import ScrollableTabBar from './basic/ScrollableTabBar'
import {dp, theme, commonStyle} from '../commons/style'

const TABRIGHTSPACE = dp(60)

const TabBar = (props) => (
  <View {...props} style={[styles.container,commonStyle.bottomLine]}>
    <ScrollableTabBar
      {...props}
      tabStyle={{paddingHorizontal: dp(30)}}
      underlineStyle={{height: dp(8),backgroundColor: theme.fontColorActive}}
      textStyle={{fontSize: dp(30)}}
      inactiveTextColor={theme.fontColorPassive}
      activeTextColor={theme.fontColorActive}
      leftSpaceWidth={dp(100)}
      tabsContainerType="leftSpace"
    />
    <TouchableOpacity style={styles.button} activeOpacity={1} onPress={props.addTabItem}>
      <Text style={styles.buttonTitle}>＋</Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingLeft: dp(20),
    paddingRight: TABRIGHTSPACE,
  },
  button: {
    position: 'absolute',
    right: 0,
    width: TABRIGHTSPACE,
    height: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: dp(60),
    color: theme.fontColorPassive
  },
})

export default TabBar
