import {Dimensions, StyleSheet} from 'react-native'

export const dp = (px) => (px * Dimensions.get('window').width / 720)

export const theme = {

  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,

  // hupu 颜色值
  fontColorDefault: '#000',
  fontColorDefaultOp: '#fff',
  fontColorActive: '#bd2d2d', // 189,45,45
  fontColorActiveDeep: '#b52525',
  fontColorPassive: '#a0a0a0', //160,160,160
  fontColorLink: '#0081ec',
  bgColorPassive: '#edebe7',
  bgColorPassiveDeep: '#dddbd7',
  bgColorDefault: '#fff',
}

export const commonStyle = StyleSheet.create({
  centerContain: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomLine: {
    borderBottomColor: 'rgba(160,160,160,.1)',
    borderBottomWidth: 1,
  }
})