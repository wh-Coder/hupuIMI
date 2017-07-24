# StyleSheet

## 盒子模型:

- width/height 包含 padding, 不包含 margin

- border 在 padding 和 margin 之间

- backgroundColor 不包括 margin




```
import React, {PureComponent} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import SortableListView from 'react-native-sortable-listview'
import {HeaderBar} from '../components'
import {dp, theme, commonStyle} from '../commons/style'

let data = {
  1: {text: 'world'},
  2: {text: 'are you'},
  3: {text: '123'},
  4: {text: 'is'},
}


let order = [1, 3, 2, 4]

class RowComponent extends React.Component {
  render() {
    return (
      <TouchableOpacity
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableOpacity>
    )
  }
}

class TabSelectPage extends PureComponent {

  constructor(props) {
    super(props)
  }

  _onCompleted() {
    this.props.onCompleted('hello')
  }

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <HeaderBar title="自定义频道"/>
        <TouchableOpacity onPress={() => this._onCompleted()} style={styles.completed}>
          <Text style={styles.completedTitle}>完成</Text>
        </TouchableOpacity>

        <SortableListView
          scrollEnabled={false}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0])
            this.forceUpdate()
          }}
          renderRow={row => <RowComponent data={row} />}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc'
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
  }
});

module.exports = TabSelectPage;
```