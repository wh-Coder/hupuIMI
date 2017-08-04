import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {HeaderBar, InputText, Mask} from '../components'
import Icon from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {loginAction} from '../redux/action'
import Toast from 'react-native-simple-toast';

import {dp, theme, commonStyle} from '../commons/style'
import config from '../commons/config'
import request from '../commons/request'

class LoginPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  login() {
    request.post(config.api.games + 'user/loginUsernameEmail?client=517666297116686', {
      username: this.state.username,
      password: this.state.password,
      crt: Date.parse(new Date()),
      // sign:	'ab7afd7bc82c024db2dec05e34582149',
    }, true).then((res) => {
      console.log(res)
      if (res.is_login) {
        this.props.navigation.goBack()
        this.props.loginAction(res)
        Toast.show('登录成功');
      } else {
        Toast.show('登录失败');
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar title="我的账号" back={() => this.props.navigation.goBack()}/>
        <View style={styles.cardBox}>
          <View style={[styles.cardItem,commonStyle.bottomLine]}>
            <InputText
              placeholder="登录名/手机号/邮箱" style={styles.input}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            <View style={styles.ItemIconBox}>
              <Icon name="ios-person-outline" size={dp(36)} style={styles.ItemIcon}/>
            </View>
          </View>
          <View style={[styles.cardItem,commonStyle.bottomLine]}>
            <InputText
              placeholder="密码" style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}/>
            <View style={styles.ItemIconBox}>
              <Icon name="ios-lock-outline" size={dp(36)} style={styles.ItemIcon}/>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => this.login()} style={styles.loginButton}>
          <Text style={styles.loginText}>登录</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgColorPassive
  },
  cardBox: {
    marginTop: dp(30),
    backgroundColor: '#fff',
  },
  cardItem: {
    height: dp(90),
    paddingLeft: dp(110),
    justifyContent: 'center'
  },
  input: {
    fontSize: dp(30)
  },
  loginButton: {
    marginVertical: dp(30),
    marginHorizontal: dp(40),
    justifyContent: 'center',
    alignItems: 'center',
    height: dp(90),
    backgroundColor: theme.fontColorActive,
  },
  loginText: {
    fontSize: dp(34),
    color: theme.fontColorDefaultOp
  },
  ItemIconBox: {
    width: dp(50),
    height: dp(50),
    position: 'absolute',
    left: dp(20),
    top: dp(20),
    borderWidth: 1,
    borderColor: theme.fontColorPassive,
    borderRadius: dp(25),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ItemIcon: {
    color: theme.fontColorPassive,
  }
});

export default connect(state => ({}), dispatch => (
  bindActionCreators({loginAction: loginAction}, dispatch)
))(LoginPage);
