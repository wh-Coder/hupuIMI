/*
 * showForum: 推荐中的列表有个分区头
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {dp, theme, commonStyle} from '../commons/style'

import {IconCount} from '../components'

class ThreadsItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let item = this.props.item
    return (
      <TouchableOpacity
        style={[styles.itemBox,commonStyle.bottomLine]}
        onPress={() => this.props.onPress()}>
        {
          this.props.showForum
            ? <View style={styles.forumBox}>
              <Image style={styles.forumLogo} source={{uri: item.forum_logo}}/>
              <Text style={styles.forumName}>{item.forum_name}</Text>
            </View> : null
        }
        <View style={styles.titleBox}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
        <View style={styles.footerBox}>
          <Text style={styles.userName}>{item.userName}</Text>
          <View style={styles.infoBox}>
            <IconCount type='nps' count={item.nps + ''}/>
            <IconCount type='lights' count={item.lightReply + ''}/>
            <IconCount type='replies' count={item.replies + ''}/>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    height: dp(80),
  },

  //
  itemBox: {
    padding: dp(20),
    backgroundColor: '#fff',
  },
  forumBox: {
    flex: 1,
    flexDirection: 'row',
  },
  forumLogo: {
    width: dp(52 / 88 * 110),
    height: dp(52)
  },
  forumName: {
    fontSize: dp(24),
    paddingLeft: dp(12),
    color: theme.fontColorPassive,
    alignSelf: 'center'
  },
  titleBox: {
    paddingTop: dp(8),
    paddingBottom: dp(20)
  },
  title: {
    fontSize: dp(36),
    lineHeight: dp(48),
  },
  footerBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userName: {
    color: theme.fontColorPassive
  },
  infoBox: {
    flexDirection: 'row',
  }
});

export default ThreadsItem;






















