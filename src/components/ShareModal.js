import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import {dp, theme, commonStyle} from '../commons/style'

const shareConfig = {
  share: [{
    name: 'wx',
    icon: require('../icon/wx.png'),
    title: '微信好友',
    bgColor: '#1ed621'
  }, {
    name: 'pyq',
    icon: require('../icon/pyq.png'),
    title: '微信朋友圈',
    bgColor: '#6fd026'
  }, {
    name: 'qq',
    icon: require('../icon/qq.png'),
    title: 'QQ好友',
    bgColor: '#3a94e8'
  }, {
    name: 'zone',
    icon: require('../icon/zone.png'),
    title: 'QQ空间',
    bgColor: '#fcc600'
  }, {
    name: 'weibo',
    icon: require('../icon/weibo.png'),
    title: '新浪微博',
    bgColor: '#eb4e4e'
  }],
  other: [{
    name: 'collect',
    icon: 'ios-star',
    title: '收藏',
  }, {
    name: 'copy',
    icon: 'ios-link',
    title: '复制链接',
  }, {
    name: 'setting',
    icon: 'ios-options',
    title: '阅读设置',
  }, {
    name: 'more',
    icon: 'ios-more',
    title: '更多',
  }]
}

class ShareModal extends Component {

  renderShare() {
    return (
      <View style={[styles.buttonBox,commonStyle.bottomLine]}>
        {
          shareConfig.share.map((item) => {
            return (
              <View style={styles.shareItem} key={item.name}>
                <View style={[styles.shareIcon,{backgroundColor: item.bgColor}]}>
                  <Image source={item.icon} style={{width: dp(60),height: dp(60)}}/>
                </View>
                <Text style={styles.shareText}>{item.title}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderOther() {
    return (
      <View style={[styles.buttonBox,commonStyle.bottomLine]}>
        {
          shareConfig.other.map((item) => {
            return (
              <View style={styles.shareItem} key={item.name}>
                <View style={styles.shareIcon}>
                  <Icon name={item.icon} size={dp(60)}
                        style={{color: item.name === 'copy' ? theme.hpBlue : theme.hpGray}}/>
                </View>
                <Text style={styles.shareText}>{item.title}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  renderCancel() {
    return (
      <View style={styles.cancelBox}>
        <Text style={styles.cancelText}>取消</Text>
      </View>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.close()}>
        <View style={styles.fullContainer}>
          <View style={styles.container}>
            {this.renderShare()}
            {this.renderOther()}
            {this.renderCancel()}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  fullContainer: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    height: dp(470),
    width: theme.screenWidth,
    left: 0,
    bottom: 0,
  },

  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: theme.bgColorPassive,
    paddingTop: dp(20),
    paddingBottom: dp(24),
  },
  shareItem: {
    // flex: 1,
    width: theme.screenWidth / 5,
    alignItems: 'center',
  },
  shareIcon: {
    width: dp(100),
    height: dp(100),
    borderRadius: dp(20),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    fontSize: dp(25),
    color: theme.fontColorPassive,
    paddingTop: dp(16)
  },

  cancelBox: {
    height: dp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cancelText: {
    fontSize: dp(30),
  }

});

module.exports = ShareModal;