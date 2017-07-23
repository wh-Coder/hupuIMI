import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HeaderBar} from '../components'
import {MKSpinner} from 'react-native-material-kit';
import SpinLoading from '../components/SpinLoading'

const SingleColorSpinner = MKSpinner.singleColorSpinner()
  .withStyle({width: 60, height: 60})
  .withStrokeWidth(6)
  .withStrokeColor('red')
  .build();

class SpinDemo extends Component {

  render() {
    const {goBack} = this.props.navigation
    return (
      <View style={styles.container}>
        <HeaderBar title="SpinDemo" back={() => goBack()}/>
        <View style={styles.box}>
          <SingleColorSpinner/>
        </View>

        <View style={styles.box}>
          <MKSpinner style={{width: 60, height: 60}} strokeWidth={10} strokeColor={['red','green','blue']} />
        </View>

        <View style={styles.box}>
          <SpinLoading/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box: {
    height: 100,
    borderWidth: 1
  }
});

module.exports = SpinDemo;