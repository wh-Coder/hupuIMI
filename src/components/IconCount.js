/*
 * 描述：一个图标加一个数字的组合
 * 参数：size   图标和字体大小，图标是字体的1.5倍
 *       color  图标和字体颜色
 *       type   数据类型
 *       count  数据大小
 * 使用：<IconCount type="lights" count={lights} />
 */
import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import {dp, theme, commonStyle} from '../commons/style'

import Icon from 'react-native-vector-icons/Ionicons'

const iconName = {
  'lights': 'ios-bulb-outline',
  'replies': 'ios-chatbubbles-outline',
  'playtime': 'ios-clock-outline',
  'viewnum': 'ios-eye-outline',
  'nps': 'ios-code',
}

class IconCount extends Component {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
    type: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
  };
  static defaultProps = {
    size: dp(26),
    color: theme.fontColorPassive,
    count: 0,
  };

  constructor(props) {
    super(props)
  }

  render() {
    let {size, color, type, count} = this.props
    return (
      <View>
        {
          count !== '0' && count !== 'undefined'
            ? <View style={styles.container}>
              <Icon style={type === 'nps' ? styles.rotate90 : null }
                    name={iconName[type]} size={size * 1.5} color={theme.fontColorPassive}/>
              <Text style={[styles.text, {color, fontSize: size}]}>{count}</Text>
            </View> : null
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: dp(16),
  },
  text: {
    paddingLeft: dp(4),
    alignSelf: 'center'
  },
  rotate90: {
    transform: [{rotate: '90deg'}]
  }
})

export default IconCount