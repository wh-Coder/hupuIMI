'use strict'
import React, {Component} from 'react'
import {
  Text,
  View,
  Alert,
  Modal,
  Animated,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import store from 'react-native-simple-store';
import {dp, theme, commonStyle} from '../commons/style'
import {ScrollableTabBar} from '../components'
import KanqiuListView from './KanqiuListView'
import TabSelectView from './TabSelectView'

class KanqiuPage extends Component {

  tabNav = []

  constructor(props) {
    super(props);
    this.state = {
      kanqiuFollow: [],
      showTabSelectView: false,
    }
  }

  componentDidMount() {
    store.get('init').then((res) => {
      this.tabNav = res.result.client.tab_nav

      // 模拟查找本地 follow
      setTimeout(() => {
        this.setState({kanqiuFollow: [0, 1, 2, 3, 4, 7]})
      }, 100)
    })

  }

  renderScrollTabView() {
    return (
      <ScrollableTabView
        onChangeTab={this.handleChangeTab}
        renderTabBar={() => (<ScrollableTabBar prerenderingSiblingsNumber={0} addTabItem={this.addTabItem} />)}>
        {
          this.state.kanqiuFollow.map((item, index) => {
            item = this.tabNav[item]
            return (
              <View tabLabel={item.name} style={styles.tabLabel} key={index}>
                <KanqiuListView
                  en={item.en}
                  item={item}
                  navigate={this.props.navigate}/>
              </View>
            )
          })
        }
      </ScrollableTabView>
    )
  }

  addTabItem = () => {
    // 模拟选择完成之后
    // this.setState({kanqiuFollow: [0, 1, 2, 3, 4, 5, 6, 7, 8]})
    this.setState({showTabSelectView: true})
  }

  _onCompleted(selected) {
    // console.log(selected)
    this.setState({
      kanqiuFollow: selected,
      showTabSelectView: false
    })
  }

  renderTabSelectView() {
    return (
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.state.showTabSelectView}>
        <TabSelectView
          tabOptions={this.tabNav}
          tabSelected={this.state.kanqiuFollow}
          onCompleted={(selected) => this._onCompleted(selected)}
        />
      </Modal>
    )
  }

  render() {
    console.log('render KanqiuPage')
    return (
      <View style={styles.container}>
        {
          this.state.kanqiuFollow
            ? this.renderScrollTabView()
            : null
        }
        {this.renderTabSelectView()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listBox: {
    flex: 1,
  },
  tabLabel: {
    flex: 1,
  }
});

module.exports = KanqiuPage;