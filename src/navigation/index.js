/**
 * Created by busyrat on 2017/7/20.
 */
import {StackNavigator} from 'react-navigation';
import DemoList from '../demos'

import HomePage from '../containers/HomePage'
import WebViewPage from '../containers/WebViewPage'
import PlatePage from '../containers/PlatePage'
import LoginPage from '../containers/LoginPage'
import MyPage from '../containers/MyPage'
import SettingPage from '../containers/SettingPage'

const RouteConfigs = {
  HomePage: {screen: HomePage},
  WebViewPage: {screen: WebViewPage},
  PlatePage: {screen: PlatePage},
  LoginPage: {screen: LoginPage},
  MyPage: {screen: MyPage},
  SettingPage: {screen: SettingPage},
  ...DemoList,
}

const StackNavigatorConfig = {
  navigationOptions: {header: null}
}

const Navigation = StackNavigator(RouteConfigs, StackNavigatorConfig)

export default Navigation