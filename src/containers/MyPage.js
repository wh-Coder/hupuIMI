import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderBar} from '../components'

class MyPage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <HeaderBar title="我的主页" back={() => this.props.navigation.goBack()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

module.exports = MyPage;