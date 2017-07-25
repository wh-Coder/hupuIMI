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
// import SortableList from 'react-native-sortable-list';
import SortableListView from 'react-native-sortable-listview'
import Icon from 'react-native-vector-icons/Ionicons';
import {HeaderBar} from '../components'
import {dp, theme, commonStyle} from '../commons/style'

class RowComponent extends React.Component {
  render() {
    return (
      <View style={[styles.rowBox,commonStyle.bottomLine]}>
        <TouchableOpacity onPress={() => this.props.increase()} style={styles.rowBtn}>
          <Text style={styles.rowBtnTitle}>一</Text>
        </TouchableOpacity>

        <Image style={styles.image} source={{uri: this.props.data.logo}}/>
        <Text style={styles.rowTitle}>{this.props.data.nav_name}</Text>

        <TouchableOpacity
          {...this.props.sortHandlers}
          style={styles.sortableBar}>
          <Icon color={theme.fontColorPassive} size={dp(40)} name="ios-menu"/>
        </TouchableOpacity>
      </View>
    )
  }
}


class TabSelectPage extends Component {

  constructor(props) {
    super(props)

    let tabOptionsArr = this.props.tabOptions.concat()

    this.props.tabSelected.map((item) => {
      tabOptionsArr[item].selected = true
    })

    this.state = {
      order: this.props.tabSelected,
      tabOptionsArr: tabOptionsArr
    }
  }

  _onCompleted() {
    this.props.onCompleted(this.state.order)
  }

  _decrease(rowID) {
    _.pull(this.state.order, rowID)
    this.state.tabOptionsArr[rowID].selected = false
    this.setState({
      tabOptionsArr: this.state.tabOptionsArr,
      order: this.state.order
    })
  }

  _increase(rowID) {
    console.log(rowID)
    // this.setState({order: this.state.order.push(rowID)})
    this.state.order.push(rowID)
    this.state.tabOptionsArr[rowID].selected = true
    this.setState({
      tabOptionsArr: this.state.tabOptionsArr,
      order: this.state.order
    })
  }

  _onRowMoved = e => {
    this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[0])
    console.log(this.state.order)
    this.forceUpdate()
  }

  renderCard(title) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    )
  }

  renderFooter = () => {
    return (
      <View style={styles.notSelectedBox}>
        {this.renderCard('未添加频道')}
        {
          this.state.tabOptionsArr.map((item, index) => {
            console.log(item)
            if (!item.selected) {
              return (
                <View key={index} style={[styles.rowBox,commonStyle.bottomLine]}>
                  <Image style={styles.image} source={{uri: item.logo}}/>
                  <Text style={styles.rowTitle}>{item.nav_name}</Text>

                  <View style={styles.sortableBar}>
                    <TouchableOpacity onPress={() => this._increase(index)} style={styles.rowBtn}>
                      <Text style={styles.rowBtnTitle}>＋</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          })
        }
      </View>
    )
  }

  render() {
    const tabOptionsObj = Object.assign({}, this.props.tabOptions)

    return (
      <View style={styles.container}>
        <HeaderBar title="自定义频道"/>
        <TouchableOpacity onPress={() => this._onCompleted()} style={styles.completed}>
          <Text style={styles.completedTitle}>完成</Text>
        </TouchableOpacity>
        <SortableListView
          data={tabOptionsObj}
          order={this.state.order}
          renderFooter={this.renderFooter}
          renderHeader={() => this.renderCard('已添加频道')}
          onRowMoved={this._onRowMoved}
          renderRow={(rowData, sectionID, rowID) => (
            <RowComponent increase={() => this._decrease(rowID)} data={rowData} />
          )}
        />
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
    flexDirection: 'row',
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