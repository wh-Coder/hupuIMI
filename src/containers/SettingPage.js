import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import store from 'react-native-simple-store';

import {HeaderBar} from '../components'
import {dp, theme, commonStyle} from '../commons/style'

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {logoutAction} from '../redux/action'

class SettingPage extends Component {

  logout() {
    this.props.navigation.goBack()
    this.props.logoutAction()
    Toast.show('退出成功');
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar title="设置" back={() => this.props.navigation.goBack()}/>
        <TouchableOpacity onPress={() => this.logout()} style={styles.logoutButton}>
          <Text style={styles.logoutText}>退出</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoutButton: {
    marginVertical: dp(30),
    marginHorizontal: dp(40),
    justifyContent: 'center',
    alignItems: 'center',
    height: dp(90),
    backgroundColor: theme.fontColorActive,
  },
  logoutText: {
    fontSize: dp(34),
    color: theme.fontColorDefaultOp
  }
});

export default connect(state => ({}), dispatch => (
  bindActionCreators({logoutAction: logoutAction}, dispatch)
))(SettingPage);

