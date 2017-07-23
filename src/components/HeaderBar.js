import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {dp, theme, commonStyle} from '../commons/style'

const propTypes = {
  title: PropTypes.string,
  back: PropTypes.func,
  share: PropTypes.func,
  search: PropTypes.func,
}

const defaultProps = {
  title: '虎扑体育'
}

const HeaderBtn = ({onPress, iconName}) => {
  if (onPress) {
    return (
      <View>
        <TouchableOpacity style={[commonStyle.centerContain,styles.btnIcon]} onPress={onPress}>
          <Icon style={{color: '#fff'}} name={iconName} size={dp(60)}/>
        </TouchableOpacity>
      </View>
    )
  }
  return <View/>
}

const HeaderBar = ({title, back, share, search}) => (
  <View style={styles.header}>
    <View style={[commonStyle.centerContain,styles.titleBox]}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
    <View style={styles.iconBox}>
      <HeaderBtn onPress={back} iconName="ios-arrow-back"/>
    </View>
    <View style={styles.iconBox}>
      <HeaderBtn onPress={share} iconName="ios-more"/>
      <HeaderBtn onPress={search} iconName="ios-search-outline"/>
    </View>
  </View>
)

HeaderBar.propTypes = propTypes

HeaderBar.defaultProps = defaultProps

const styles = StyleSheet.create({
  header: {
    paddingTop: Platform.OS === 'ios' ? dp(36) : dp(0),
    height: Platform.OS === 'ios' ? dp(136) : dp(100),
    backgroundColor: theme.fontColorActive,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  titleBox: {
    height: dp(100),
    width: theme.screenWidth,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  headerTitle: {
    fontSize: dp(40),
    color: '#fff'
  },
  iconBox: {
    flexDirection: 'row'
  },
  btnIcon: {
    width: dp(100),
    height: dp(100)
  },
});

export default HeaderBar