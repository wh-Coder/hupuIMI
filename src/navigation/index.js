/**
 * Created by busyrat on 2017/7/20.
 */
import {StackNavigator} from 'react-navigation';
import Demos from '../demos'
import ReduxDemo from '../demos/ReduxDemo'
import TouchDemo from '../demos/TouchDemo'
import ScrollBarDemo from '../demos/ScrollBarDemo'
import SpinDemo from '../demos/SpinDemo'
import HomePage from '../pages/HomePage'

const DemosContainer = {
  Demos: {screen: Demos},
  ReduxDemo: {screen: ReduxDemo},
  TouchDemo: {screen: TouchDemo},
  ScrollBarDemo: {screen: ScrollBarDemo},
  SpinDemo: {screen: SpinDemo},
}

const RouteConfigs = {
  HomePage: {screen: HomePage},
  ...DemosContainer,
}

const StackNavigatorConfig = {
  navigationOptions: {header: null}
}

const Navigation = StackNavigator(RouteConfigs, StackNavigatorConfig)

export default Navigation