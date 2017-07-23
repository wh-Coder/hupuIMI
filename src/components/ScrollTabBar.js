import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import {dp, theme, commonStyle} from '../commons/style'

const mockTabList = ['新闻', '视频', '自由市场', '深度', '图集', '场外']

class ScrollTabBar extends Component {

  static propTypes = {
    tabList: PropTypes.array,
    onTabChange: PropTypes.func,
  }

  static defaultProps = {
    // tabList: ['全部']
    tabList: mockTabList
  }

  measureTab = []
  myRefs = {
    scroll: null
  }

  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0
    }
  }

  _measureTab(nativeEvent, index) {
    this.measureTab[index] = {left: nativeEvent.layout.x, width: nativeEvent.layout.width}
  }

  _changeTab(index) {
    this.setState({activeTab: index})

    const width = this.measureTab[index].width
    const left = this.measureTab[index].left
    const scroll_x = left - (theme.screenWidth - width) / 2
    const lastTab = this.measureTab[this.measureTab.length - 1]
    const max = lastTab.left + lastTab.width - theme.screenWidth

    if (scroll_x <= 0) {
      this.myRefs.scroll.scrollTo({x: 0})
    } else if (scroll_x >= max) {
      this.myRefs.scroll.scrollToEnd()
    } else {
      this.myRefs.scroll.scrollTo({x: scroll_x})
    }

    // TODO: 为什么不能传数字????
    this.props.onTabChange(index + '')
  }

  render() {
    const {activeTab} = this.state

    return (
      <View style={[styles.container,commonStyle.bottomLine]}>
        <ScrollView
          ref={scroll => this.myRefs.scroll = scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          {
            this.props.tabList.map((tab, index) => (
              <TouchableHighlight
                style={[styles.tabBox,activeTab === index ? {backgroundColor: theme.fontColorActive}: '']}
                key={index}
                underlayColor={theme.fontColorActive}
                onLayout={({nativeEvent}) => this._measureTab(nativeEvent, index)}
                onPress={() => this._changeTab(index)}>
                <Text style={[styles.tabTitle, activeTab === index ? {color: '#fff'}:'']}>{tab}</Text>
              </TouchableHighlight>
            ))
          }
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: dp(20),
    paddingBottom: dp(16),
    paddingRight: dp(20),
  },
  tabBox: {
    height: dp(60),
    paddingHorizontal: dp(32),
    marginLeft: dp(20),
    borderRadius: dp(20),
    borderBottomLeftRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.bgColorPassive
  },
  tabTitle: {
    fontSize: dp(26),
    color: theme.fontColorPassive
  }
});

module.exports = ScrollTabBar;