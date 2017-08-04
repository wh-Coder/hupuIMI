import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import {dp, theme, commonStyle} from '../commons/style'
import ForWard from '../components/basic/Forward'
import config from '../commons/config'
import request from '../commons/request'
import store from 'react-native-simple-store';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {loginAction} from '../redux/action'

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
  'dark': '夜间模式',

  'DEMO': 'DEMO'
}

class MorePage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      is_login: this.props.is_login,
      loginInfo: this.props.loginInfo
    }
  }

  onPress(type) {
    switch (type) {
      case 'DEMO':
        this.props.navigate('Demos')
        break;
      case 'setting':
        this.props.navigate('SettingPage')
        break;
    }
  }

  componentDidMount() {
    store.get('login').then((res) => {
      console.log(res)

      if (res && res.is_login) {
        this.props.loginAction(res)
        // this.props.is_login = res.is_login
        // this.props.loginInfo = res.reload
      }
    })
  }

  gotoLoginPag() {
    if (this.props.is_login) {
      this.props.navigate('MyPage')
    } else {
      this.props.navigate('LoginPage')
    }
  }

  renderCardItem(type, source, row = false) {
    return (
      row ? <View style={styles.userMsgItem}>
          <Image source={source} style={styles.userMsgIcon}/>
          <Text style={styles.userMsgText}>{title[type]}</Text>
          {type === 'beans' && this.props.loginInfo
            ? <Text style={styles.userMsgTextSub}>{this.props.loginInfo.balance}</Text> : null}
        </View>
        : <TouchableHighlight underlayColor={theme.bgColorPassiveDeep} onPress={() => this.onPress(type)}>
          <View style={[styles.otherMsg,commonStyle.bottomLine]}>
            <Image source={source} style={styles.otherMsgIcon}/>
            <Text style={styles.otherMsgText}>{title[type]}</Text>
            <ForWard size={dp(30)}/>
          </View>
        </TouchableHighlight>
    )
  }

  render() {
    console.log(this.props.is_login)
    console.log(this.props.loginInfo)
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.cardBox}>
            <TouchableHighlight underlayColor={theme.bgColorPassiveDeep} onPress={() => this.gotoLoginPag()}>
              <View style={[styles.userInfo,commonStyle.bottomLine]}>
                <Image source={this.props.is_login ? {uri: this.props.loginInfo.header} : require('../icon/man.png')}
                       style={styles.avatar}/>
                {
                  this.props.is_login
                    ? <View style={styles.signuped}>
                      <Text style={styles.username}>{this.props.loginInfo.username}</Text>
                    </View>
                    : <Text style={styles.signup}>登录/注册</Text>
                }

                <ForWard size={dp(30)}/>
              </View>
            </TouchableHighlight>
            <View style={styles.userMsg}>
              {this.renderCardItem('star', require('../icon/star.png'), true)}
              {this.renderCardItem('clock', require('../icon/clock.png'), true)}
              {this.renderCardItem('message', require('../icon/message.png'), true)}
              {this.renderCardItem('money', require('../icon/money.png'), true)}
              {this.renderCardItem('beans', require('../icon/beans.png'), true)}
            </View>
          </View>

          <View style={styles.cardBox}>
            {this.renderCardItem('DEMO', require('../icon/setting.png'))}
          </View>

          <View style={styles.cardBox}>
            {this.renderCardItem('LRW', require('../icon/moreLRW.png'))}
            {this.renderCardItem('FTX', require('../icon/moreFTX.png'))}
            {this.renderCardItem('YX', require('../icon/moreYX.png'))}
            {this.renderCardItem('SC', require('../icon/moreSC.png'))}
            {this.renderCardItem('CG', require('../icon/moreCG.png'))}
            {this.renderCardItem('KLL', require('../icon/moreKLL.png'))}
          </View>

          <View style={styles.cardBox}>
            {this.renderCardItem('setting', require('../icon/setting.png'))}
            {this.renderCardItem('dark', require('../icon/dark.png'))}
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
  signuped: {
    padding: dp(20),
    alignSelf: 'center'
  },
  username: {
    fontSize: dp(30),
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
  userMsgTextSub: {
    fontSize: dp(26),
    paddingTop: dp(10),
    color: theme.fontColorPassive
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

export default connect(state => ({
  is_login: state.loginout.is_login,
  loginInfo: state.loginout.result
}),dispatch => (
  bindActionCreators({loginAction: loginAction}, dispatch)
))(MorePage);