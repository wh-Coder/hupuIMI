import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

class Forward extends Component {

  static defaultProps = {
    size: 60,
    color: '#ccc'
  };

  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center'}}>
        <Icon style={{alignSelf: 'flex-end',color: this.props.color}} size={this.props.size} name="ios-arrow-forward"/>
      </View>
    )
  }
}


module.exports = Forward;