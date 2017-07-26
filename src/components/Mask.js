import React, {Component} from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {theme} from '../commons/style'

class Mask extends Component {

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress()}>
        <View style={styles.container}/>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: theme.screenWidth,
    height: theme.screenHeight
  }
});

module.exports = Mask;