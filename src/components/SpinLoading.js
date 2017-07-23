import React from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import PropTypes from 'prop-types';
import {dp, theme, commonStyle} from '../commons/style'
import {MKSpinner} from 'react-native-material-kit';

const SpinLoading = ({fullScreen,size}) => (
  <View style={fullScreen ? styles.fullScreen : styles.container}>
    <MKSpinner style={{width: size, height: size}} strokeWidth={4} strokeColor={theme.fontColorActive} />
  </View>
)

SpinLoading.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.number,
};
SpinLoading.defaultProps = {
  fullScreen: true,
  size: 40
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default SpinLoading
