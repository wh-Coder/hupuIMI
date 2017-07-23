import React from 'react'
import PropTypes from 'prop-types';
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {theme} from '../commons/style'

const propTypes = {
  type: PropTypes.string,
  onPress: PropTypes.func,
}

const defaultProps = {
  type: 'without'   // without,highlight, opacity
}

class Touch extends React.Component {

  constructor(props) {
    super(props)
  }

  renderTouch() {
    const {type, children, onPress} = this.props
    switch (type) {
      case 'without':
        return (
          <TouchableWithoutFeedback onPress={onPress}>
            {children}
          </TouchableWithoutFeedback>)
      case 'highlight':
        return (
          <TouchableHighlight
            onPress={onPress}
            underlayColor={theme.bgColorPassive}>
            {children}
          </TouchableHighlight>
        )
      case 'opacity':
        return (
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.5}>
            {children}
          </TouchableOpacity>
        )
    }
  }

  render() {
    return (
      <View>
        {this.renderTouch()}
      </View>
    )
  }
}

Touch.propTypes = propTypes
Touch.defaultProps = defaultProps

const styles = StyleSheet.create({})

export default Touch
