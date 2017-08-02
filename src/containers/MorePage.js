import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'
import ForWard from '../components/basic/Forward'

const title = {
  'star': '收藏',
  'clock': '浏览记录',
  'message': '消息',
  'money': '虎扑币',
  'beans': '金豆',

  'LRW': '路人王',
  'FTX': '每日范特西',
  'YX': '虎扑优选',
  'SC': 'JRs商城',
  'CG': '场馆预订',
  'KLL': '卡路里运动营养',

  'setting': '设置',
  'dark': '夜间模式'
}

class CardItem extends Component {
  // props.type
  constructor(props){
    super(props)
  }

  static defaultProps = {
    row: false
  };

  render() {
    return (
      this.props.row
        ? <View style={styles.userMsgItem}>
          <Image source={this.props.source} style={styles.userMsgIcon}/>
          <Text style={styles.userMsgText}>{title[this.props.type]}</Text>
        </View>
        : <View style={[styles.otherMsg,commonStyle.bottomLine]}>
          <Image source={this.props.source} style={styles.otherMsgIcon}/>
          <Text style={styles.otherMsgText}>{title[this.props.type]}</Text>
          <ForWard size={dp(30)}/>
        </View>
    )
  }
}

class MorePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardBox}>
            <View style={[styles.userInfo,commonStyle.bottomLine]}>
              <Image source={require('../icon/man.png')} style={styles.avatar}/>
              <Text style={styles.signup}>登录/注册</Text>
              <ForWard size={dp(30)}/>
            </View>
            <View style={styles.userMsg}>
              <CardItem row={true} type="star" source={require('../icon/star.png')}/>
              <CardItem row={true} type="clock" source={require('../icon/clock.png')}/>
              <CardItem row={true} type="message" source={require('../icon/message.png')}/>
              <CardItem row={true} type="money" source={require('../icon/money.png')}/>
              <CardItem row={true} type="beans" source={require('../icon/beans.png')}/>
            </View>
          </View>

          <View style={styles.cardBox}>
            <CardItem type="LRW" source={require('../icon/moreLRW.png')}/>
            <CardItem type="FTX" source={require('../icon/moreFTX.png')}/>
            <CardItem type="YX" source={require('../icon/moreYX.png')}/>
            <CardItem type="SC" source={require('../icon/moreSC.png')}/>
            <CardItem type="CG" source={require('../icon/moreCG.png')}/>
            <CardItem type="KLL" source={require('../icon/moreKLL.png')}/>
          </View>

          <View style={styles.cardBox}>
            <CardItem type="setting" source={require('../icon/setting.png')}/>
            <CardItem type="dark" source={require('../icon/dark.png')}/>
          </View>

          <View style={styles.bottomSpace}/>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColorPassive,
  },
  cardBox: {
    marginTop: dp(30),
    backgroundColor: '#fff',
  },
  userInfo: {
    padding: dp(20),
    flexDirection: 'row',
  },
  avatar: {
    width: dp(132),
    height: dp(132),
    borderRadius: dp(66),
    backgroundColor: 'green',
  },
  signup: {
    padding: dp(20),
    fontSize: dp(32),
    alignSelf: 'center'
  },
  userMsg: {
    paddingVertical: dp(30),
    flexDirection: 'row',
  },
  userMsgItem: {
    flex: 1,
    alignItems: 'center'
  },
  userMsgIcon: {
    width: dp(60),
    height: dp(60),
    // backgroundColor: 'red'
  },
  userMsgText: {
    paddingTop: dp(20),
    fontSize: dp(32)
  },
  otherMsg: {
    paddingVertical: dp(22),
    paddingHorizontal: dp(20),
    flexDirection: 'row',
    alignItems: 'center'
  },
  otherMsgIcon: {
    width: dp(52),
    height: dp(52),
    borderRadius: dp(26),
  },
  otherMsgText: {
    paddingLeft: dp(20),
    fontSize: dp(30),
  },
  bottomSpace: {
    height: dp(30)
  }
});

module.exports = MorePage;