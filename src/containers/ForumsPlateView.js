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

import Icon from 'react-native-vector-icons/Ionicons'

import {dp, theme, commonStyle} from '../commons/style'
import request from '../commons/request'
import config from '../commons/config'

class ForumsPlateView extends Component {

  myRefs = {
    forumRightScroll: null
  }

  constructor(props) {
    super(props)
    this.state = {
      forumsData: [],
      forumsIndex: 0,
      forumsDetailData: [],
    }
  }

  componentDidMount() {
    this._getForumsData()
  }

  _getForumsData() {
    request.get(config.api.bbs + 'forums/getForums')
      .then((res) => {
        if (res && res.data) {
          this.setState({
            forumsData: res.data,
            forumsDetailData: res.data[this.state.forumsIndex].sub
          })
        } else {
          Alert.alert("签名错误：" + res);
        }
      }).done()
  }

  _selectForumsIndex(index) {
    // this.myRefs.forumRightScroll.scrollToIndex({index: 0})
    this.setState({
      forumsIndex: index,
      forumsDetailData: this.state.forumsData[index].sub
    })
  }

  _goToPlatePage(item) {
    console.log(item)
    this.props.navigate('PlatePage', {data: item})
  }

  renderForumsListItem = ({item, index}) => (
    <TouchableHighlight
      underlayColor={theme.bgColorDefault}
      style={index === this.state.forumsIndex ? styles.forumsBoxActive : null}
      onPress={this._selectForumsIndex.bind(this,index)}>
      <Text style={index === this.state.forumsIndex ? styles.forumsActive : styles.forumsSelect}>
        {item.name}
      </Text>
    </TouchableHighlight>
  )

  renderForumsSubList = ({item}) => (
    <View style={styles.detailGroup}>
      <View style={[styles.groupTitleBox, commonStyle.bottomLine]}>
        <Text style={styles.groupTitle}>{item.name}</Text>
      </View>
      <FlatList
        numColumns={3}  // 3列
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={item.data}
        extraData={item.data}
        keyExtractor={(item) => item.fid}
        renderItem={this.renderForumsSubListItem}
      />
    </View>
  )

  renderForumsSubListItem = ({item}) => (
    <TouchableOpacity style={styles.tableBox} onPress={this._goToPlatePage.bind(this,item)}>
      <Image style={styles.tableLogo} source={{uri: item.logo}} resizeMode={'cover'}/>
      {
        item.name.length <= 6
          ? <Text style={styles.tableName}>{item.name}</Text>
          : <Text style={styles.tableName}>{item.name.slice(0, 5) + '...'}</Text>
      }
      <View style={styles.tableCountBox}>
        <Icon name="ios-chatboxes" style={styles.tableCountIcon}/>
        <Text style={styles.tableCount}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  )

  render() {
    return (
      <View style={styles.forumBox}>
        <View style={styles.forumLeft}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={this.state.forumsData}
            extraData={[this.state.forumsData,this.state.forumsIndex]}
            keyExtractor={(item) => item.fid}
            renderItem={this.renderForumsListItem}/>
        </View>
        <View style={styles.forumRight}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={(forumRightScroll) => {this.myRefs.forumRightScroll = forumRightScroll}}
            data={this.state.forumsDetailData}
            extraData={this.state.forumsDetailData}
            keyExtractor={(item) => item.weight}
            renderItem={this.renderForumsSubList}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forumBox: {
    flex: 1,
    flexDirection: 'row'
  },
  forumLeft: {
    flex: 1,
  },
  forumRight: {
    flex: 2,
  },
  forumsSelect: {
    fontSize: dp(30),
    paddingLeft: dp(30),
    paddingVertical: dp(30),
    color: theme.fontColorPassive,
    backgroundColor: theme.bgColorPassive,
  },
  forumsActive: {
    fontSize: dp(32),
    paddingLeft: dp(32),
    paddingVertical: dp(32),
    color: theme.fontColorActive,
    backgroundColor: theme.bgColorDefault,
  },
  forumsBoxActive: {
    borderLeftColor: theme.fontColorActive,
    borderLeftWidth: dp(8)
  },
  detailGroup: {
    marginLeft: dp(20)
  },
  groupTitleBox: {
    marginLeft: dp(20)
  },
  groupTitle: {
    fontSize: dp(32),
    paddingVertical: dp(26),
  },
  tableBox: {
    width: (theme.screenWidth / 3 * 2 - 10) / 3,
    alignItems: 'center',
  },
  tableLogo: {
    margin: dp(20),
    width: dp(70),
    height: dp(70),
  },
  tableName: {
    fontSize: dp(22),
    paddingBottom: dp(16),
  },
  tableCountBox: {
    flexDirection: 'row'
  },
  tableCountIcon: {
    fontSize: dp(28),
    color: theme.fontColorPassive,
    paddingRight: dp(10),
  },
  tableCount: {
    fontSize: dp(20),
    color: theme.fontColorPassive,
    alignSelf: 'center'
  }
});

module.exports = ForumsPlateView;