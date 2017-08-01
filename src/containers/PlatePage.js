import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {dp, theme, commonStyle} from '../commons/style'
import request from '../commons/request'
import config from '../commons/config'
import ThreadsListView from './ThreadsListView'
import {HeaderBar, SpinLoading} from '../components'

class PlatePage extends Component {

  constructor(props) {
    super(props)
    const {state} = this.props.navigation;
    const {data} = state.params
    this.state = {
      fid: data.fid,
      forumInfoData: [],
      dataLoaded: false,
    }
  }

  componentDidMount() {
    this._getForumsAttendStatusData()
  }

  _getForumsAttendStatusData() {
    return request.get(config.api.bbs + 'forums/getForumsAttendStatus', {
      fid: this.state.fid
    })
      .then((res) => {
        console.log(res)
        // setTimeout(() => {
        if (res.status === 200) {
          this.setState({
            forumInfoData: res.forumInfo,
            dataLoaded: true,
          })
        } else {
          Alert.alert("数据返回：" + res);
        }
        // },5000)
      }).done()
  }

  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <HeaderBar back={() => goBack()}/>
        {
          this.state.dataLoaded ?
            <ScrollableTabView
              tabBarBackgroundColor='#fff'
              tabBarActiveTextColor={theme.fontColorActive}
              tabBarInactiveTextColor={theme.fontColorPassive}
              tabBarUnderlineStyle={{backgroundColor: theme.fontColorActive}}>
              {
                this.state.forumInfoData.tab.map((item) => (
                  <View tabLabel={item.name} style={styles.listBox} key={item.type}>
                    <ThreadsListView
                      fid={this.state.fid}
                      method="forums"
                      type={item.type}
                      navigate={navigate}
                    />
                  </View>
                ))
              }
            </ScrollableTabView>
            : <SpinLoading/>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerTitle: {
    color: '#fff',
    fontSize: dp(40),
    lineHeight: dp(100),
    textAlign: 'center',
  },
  btnRight: {
    flexDirection: 'row'
  },
  headerBtn: {
    width: dp(100),
    height: dp(100),
    padding: dp(20),
  },

  scrollBar: {
    height: dp(40),
  },
  listBox: {
    flex: 1,
    height: dp(200),
  }
});

export default PlatePage;
