/**
 * Created by busyrat on 2017/7/20.
 */
import {StackNavigator} from 'react-navigation';
import DemoList from '../demos'

import HomePage from '../pages/HomePage'
import WebViewPage from '../pages/WebViewPage'

const RouteConfigs = {
  HomePage: {screen: HomePage},
  WebViewPage: {screen: WebViewPage},
  ...DemoList,
}

const StackNavigatorConfig = {
  navigationOptions: {header: null}
}

const Navigation = StackNavigator(RouteConfigs, StackNavigatorConfig)

export default Navigation