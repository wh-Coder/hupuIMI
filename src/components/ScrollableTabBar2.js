import React, {Component} from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  Animated,
  StyleSheet
} from 'react-native'

import {dp, theme, commonStyle} from '../commons/style'

const TABLEFTSPACE = dp(80)
const TABRIGHTSPACE = dp(60)

class ScrollableTabBar extends Component {

  myRefs = {
    tabTitle: [],
    tabScroll: null,
    underLine: null,
  }

  tabItemWidth = []

  constructor(props) {
    super(props)
    this.state = {
      tabItemWidth0: 0
    }
  }

  // 记录每个 tabItem 的宽度
  tabItemLayout = (e, i) => {

    // TODO: 暂时对第一个这样处理
    if (i === 0) {
      this.setState({tabItemWidth0: e.layout.width})
    }
    this.tabItemWidth[i] = e.layout.width
  }

  // 计算每个 tabItem 的左边距离
  tabItemLeft(index) {
    let left = 0
    for (let i = 0; i < index; i++) {
      left += this.tabItemWidth[i]
    }
    return left
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.setAnimationValue);
  }

  // 动画宽度
  underLineWidth(value) {
    const floor = Math.floor(value)
    const ceil = Math.ceil(value)
    if (floor < 0 || ceil >= this.tabItemWidth.length) return
    return this.tabItemWidth[floor] + (this.tabItemWidth[ceil] - this.tabItemWidth[floor]) * (value - floor)
  }

  // 动画左边距
  underLineLeft(value) {
    const floor = Math.floor(value)
    const ceil = Math.ceil(value)
    if (floor < 0 || ceil >= this.tabItemWidth.length) return
    return this.tabItemLeft(floor) + (this.tabItemLeft(ceil) - this.tabItemLeft(floor)) * (value - floor)
  }

  titleColor(progress) {
    const red = 189 + (160 - 189) * progress;
    const green = 45 + (160 - 45) * progress;
    const blue = 45 + (160 - 45) * progress;
    return `rgb(${red}, ${green}, ${blue})`;
  }

  setAnimationValue = ({value}) => {
    this.myRefs.underLine.setNativeProps({
      style: {
        width: this.underLineWidth(value),
        left: this.underLineLeft(value),
      }
    })

    // 这个字体颜色过渡的动画不是那么流畅
    // this.myRefs.tabTitle.forEach((title, i) => {
    //   const progress = Math.min(1, Math.abs(value - i))
    //   title.setNativeProps({
    //     style: {
    //       color: this.titleColor(progress),
    //     },
    //   });
    // });

    // 最大移动范围: 所有标签的长度 - 可视移动范围 - 左边必须留下的空间 + 小 BUG 补偿
    let scrollMax = this.tabItemLeft(this.tabItemWidth.length) - ( theme.screenWidth - TABRIGHTSPACE - dp(40)) - TABLEFTSPACE + dp(5)

    // 底部的滑动条保持相对静止
    // TODO:IOS 上的效果和 Android 不同 , 从第一个过渡到第二个有点卡
    if (value >= 1) {
      let moveX = this.underLineLeft(value) - TABLEFTSPACE
      if (moveX <= scrollMax) {
        this.myRefs.tabScroll.scrollTo({x: moveX,animated: false})
      } else {
        this.myRefs.tabScroll.scrollToEnd()
      }
    } else {
      this.myRefs.tabScroll.scrollTo({x: 0})
    }
  }

  onPress(i) {
    this.props.goToPage(i)
  }

  render() {
    // 滚动的另一种增量的方法,留着备用
    // const width = tabItemWidth[this.props.activeTab]
    // const left = this.tabItemLeft(this.props.activeTab)
    // const left = this.props.scrollValue.interpolate({
    //   inputRange: [this.props.activeTab, this.props.activeTab + 1],
    //   outputRange: [this.tabItemLeft(this.props.activeTab), this.tabItemLeft(this.props.activeTab + 1)],
    // });
    //
    // const width = this.props.scrollValue.interpolate({
    //   inputRange: [this.props.activeTab, this.props.activeTab + 1],
    //   outputRange: [tabItemWidth[this.props.activeTab], tabItemWidth[this.props.activeTab + 1]],
    // });
    return (
      <View style={[styles.container,commonStyle.bottomLine]}>
        <View style={styles.scrollViewBox}>
          <ScrollView
            ref={(tabScroll) => {
              this.myRefs.tabScroll = tabScroll;
            }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {this.props.tabs.map((tab, i) => {
              return (<TouchableOpacity
                onPress={() => this.onPress(i)}
                key={tab} // 这个尤其重要!!!!!!!!
                activeOpacity={1}
                accessible={true}
                accessibilityLabel={tab}
                accessibilityTraits='button'
                style={styles.tabItem}
                onLayout={({nativeEvent: e}) => this.tabItemLayout(e, i)}>
                <Text
                  style={this.props.activeTab === i ? styles.tabTitleActive : styles.tabTitle}
                  ref={(title) => {
                    this.myRefs.tabTitle[i] = title
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>)
            })}
            <Animated.View style={[styles.tabUnderline,{width: this.state.tabItemWidth0}]} ref={(underLine) => {
              this.myRefs.underLine = underLine
            }}/>
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.button} activeOpacity={1} onPress={this.props.addTabItem}>
          <Text style={styles.buttonTitle}>＋</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: dp(100),
    flexDirection: 'row',
  },
  scrollViewBox: {
    width: theme.screenWidth - TABRIGHTSPACE,
    height: dp(100),
    paddingHorizontal: dp(20),
  },
  button: {
    width: TABRIGHTSPACE,
    height: dp(100),
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonTitle: {
    fontSize: dp(60),
    color: theme.fontColorPassive
  },
  tabItem: {
    height: dp(100),
    justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: dp(32),
  },
  tabTitle: {
    fontSize: dp(32),
    color: theme.fontColorPassive,
  },
  tabTitleActive: {
    fontSize: dp(32),
    color: theme.fontColorActive
  },
  tabUnderline: {
    position: 'absolute',
    height: dp(8),
    backgroundColor: theme.fontColorActive,
    bottom: 0,
  }
})

export default ScrollableTabBar