import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash'
import SortableList from 'react-native-sortable-list';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderBar} from '../components'
import {dp, theme, commonStyle} from '../commons/style'

class TabSelectPage extends Component {

  constructor(props) {
    super(props)
    this.tabOptions = Object.assign({}, this.props.tabOptions)

    // 移动部分
    this.nextOrder = this.props.tabSelected

    this.state = {
      order: this.props.tabSelected,
      sortingEnabled: false,
      notSelected: this.props.tabOptions,
    }
  }

  _onCompleted() {
    this.props.onCompleted(this.nextOrder)
  }

  _renderRow = ({key,data}) => {
    return (
      <View style={[styles.rowBox,commonStyle.bottomLine]}>
        <TouchableOpacity onPress={() => this._increase(key)} style={styles.rowBtn}>
          <Text style={styles.rowBtnTitle}>一</Text>
        </TouchableOpacity>

        <Image style={styles.image} source={{uri: data.logo}}/>
        <Text style={styles.rowTitle}>{data.nav_name}</Text>

        <TouchableOpacity
          onPressIn={() => this.setState({sortingEnabled: true})}
          onPressOut={() => this.setState({sortingEnabled: false})}
          style={styles.sortableBar}>
          <Icon color={theme.fontColorPassive} size={dp(40)} name="ios-menu"/>
        </TouchableOpacity>
      </View>
    )
  }

  _renderFooter = () => {
    return (
      <View style={styles.notSelectedBox}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>未添加频道</Text>
        </View>
        {
          this.state.notSelected.map((item,index) => (
            <View key={index} style={[styles.rowBox,commonStyle.bottomLine]}>
              <Image style={styles.image} source={{uri: item.logo}}/>
              <Text style={styles.rowTitle}>{item.nav_name}</Text>

              <View style={styles.sortableBar}>
                <TouchableOpacity onPress={() => this._increase(key)} style={styles.rowBtn}>
                  <Text style={styles.rowBtnTitle}>＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </View>
    )
  }

  _onChangeOrder(nextOrder) {
    console.log(nextOrder)
    this.nextOrder = nextOrder
  }

  _increase(key) {
    console.log(key)
    _.pull(this.nextOrder, key)
    console.log(this.nextOrder)
    this.setState({
      order: this.nextOrder
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar title="自定义频道"/>
        <TouchableOpacity onPress={() => this._onCompleted()} style={styles.completed}>
          <Text style={styles.completedTitle}>完成</Text>
        </TouchableOpacity>
        <ScrollView
          scrollEnabled={!this.state.sortingEnabled}>
          <View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>已添加频道</Text>
            </View>
            <SortableList
              rowActivationTime={0}
              data={this.tabOptions}
              order={this.state.order}
              onChangeOrder={(nextOrder) => this._onChangeOrder(nextOrder)}
              scrollEnabled={false}
              renderFooter={this._renderFooter}
              sortingEnabled={this.state.sortingEnabled}
              renderRow={this._renderRow}/>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee'
  },
  completed: {
    backgroundColor: theme.fontColorActive,
    position: 'absolute',
    right: dp(20),
    top: dp(60),
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: dp(20),
    paddingVertical: dp(10),
  },
  completedTitle: {
    fontSize: dp(23),
    color: '#fff',
  },


  card: {
    height: dp(75),
    backgroundColor: theme.bgColorPassive,
    paddingLeft: dp(30),
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: dp(28),
    color: theme.fontColorPassive
  },

  rowBox: {
    flexDirection:'row',
    height: dp(90),
    width: theme.screenWidth,
    paddingLeft: dp(30),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rowBtn: {
    width: dp(52),
    height: dp(52),
    backgroundColor: theme.fontColorActive,
    borderRadius: dp(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowBtnTitle: {
    color: '#fff',
    fontSize: dp(26),
    fontWeight: 'bold',
  },
  image: {
    width: dp(90),
    height: dp(90),
  },
  rowTitle: {
    fontSize: dp(30)
  },
  sortableBar: {
    position: 'absolute',
    height: dp(90),
    right: dp(50),
    justifyContent: 'center'
  },
  notSelectedBox: {
    width: theme.screenWidth,
  }

});

module.exports = TabSelectPage;