import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {HeaderBar} from '../components'

const DemoItems = [
  'ReduxDemo',
  'TouchDemo',
  'ScrollBarDemo',
  'SpinDemo',
  'SortableDemo'
]


const ItemContainer = ({index, route, navigate}) => (
  <TouchableOpacity onPress={() => navigate(route)}>
    <View style={styles.item}>
      <Text style={styles.itemTitle}>{index + '. ' + route}</Text>
      <Text style={styles.itemTitle}> > </Text>
    </View>
  </TouchableOpacity>
)

class Demos extends Component {
  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <HeaderBar title='Demos' back={() => navigation.goBack()}/>
        {
          DemoItems.map((item, index) => (
            <ItemContainer index={index} key={index} navigate={navigate} route={item}/>
          ))
        }
      </View>
    )
  }
}

import ReduxDemo from './ReduxDemo'
import TouchDemo from './TouchDemo'
import ScrollBarDemo from './ScrollBarDemo'
import SpinDemo from './SpinDemo'
import SortableDemo from './SortableDemo'

export default DemoList = {
  Demos: {screen: Demos},
  ReduxDemo: {screen: ReduxDemo},
  TouchDemo: {screen: TouchDemo},
  ScrollBarDemo: {screen: ScrollBarDemo},
  SpinDemo: {screen: SpinDemo},
  SortableDemo: {screen: SortableDemo},
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    marginHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 20,
  }
});








// Demo Example
//
// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
// } from 'react-native';
// import {HeaderBar} from '../components'
//
// class ScrollBarDemo extends Component {
//
//   render() {
//     const {goBack} = this.props.navigation
//     return (
//       <View style={styles.container}>
//         <HeaderBar title="ScrollBarDemo" back={() => goBack()}/>
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   }
// });
//
// module.exports = ScrollBarDemo;













