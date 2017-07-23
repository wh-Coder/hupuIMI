import React, {Component, PropTypes} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native'

class Avatar extends Component {
  static propTypes = {
    source: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    size: PropTypes.number.isRequired,
    onPress: PropTypes.func,
    backgroundColor: PropTypes.string,
    activeOpacity: PropTypes.number,
  };

  static defaultProps = {
    size: 200,
    progress: 0,
    loading: false,
    backgroundColor: '#ccc',
    activeOpacity: 0.8,
  };

  render() {
    const {source, size, onPress, backgroundColor, activeOpacity} = this.props
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        onPress={onPress}>
        <View style={{width: size, height: size, borderRadius: size / 2, backgroundColor}}>
          <Image
            source={source}
            style={{width: size, height: size, borderRadius: size / 2}}>
          </Image>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({})

module.exports = Avatar