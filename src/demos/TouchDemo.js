import React from 'react'
import {
  TouchableWithoutFeedback,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {dp, theme, commonStyle} from '../commons/style'
import {HeaderBar, Touch} from '../components'

const TouchDemo = ({navigation}) => (
  <View style={styles.container}>
    <HeaderBar title={'TouchDemo'}
               back={() => navigation.goBack()}
               search={() => navigation.goBack()}
               share={() => navigation.goBack()}
    />
    <TouchableHighlight
      onPress={() => console.log('TouchableHighlight')}
      underlayColor={theme.bgColorPassive}
    >
      <View style={[commonStyle.bottomLine,styles.button,commonStyle.centerContain]}>
        <Text style={styles.buttonTitle}>TouchableHighlight</Text>
      </View>
    </TouchableHighlight>

    <TouchableOpacity
      onPress={() => console.log('TouchableOpacity')}
      activeOpacity={1}
    >
      <View style={[styles.button,commonStyle.centerContain]}>
        <Text style={styles.buttonTitle}>TouchableHighlight</Text>
      </View>
    </TouchableOpacity>

    <TouchableWithoutFeedback
      onPress={() => console.log('TouchableWithoutFeedback')}
    >
      <View style={[styles.button,commonStyle.centerContain]}>
        <Text style={styles.buttonTitle}>TouchableHighlight</Text>
      </View>
    </TouchableWithoutFeedback>


    <Touch
      onPress={() => console.log('Touch')}
    >
      <View style={[styles.button,commonStyle.centerContain]}>
        <Text style={styles.buttonTitle}>Touch</Text>
      </View>
    </Touch>

    <View style={{width:200,height: 40,backgroundColor:'#ccc',borderRadius:25}}>
      <TouchableHighlight
        style={{margin:10,width: 40,height: 40,borderRadius: 20,backgroundColor: '#aaa',justifyContent:'center',alignItems:'center'}}
        onPress={() => console.log('TouchableHighlight')}
        underlayColor={theme.fontColorActive}>
        <Text>测试</Text>
      </TouchableHighlight>
    </View>

  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  button: {
    height: 50,
    padding: 10,
    marginHorizontal: 10
  },
  buttonTitle: {
    fontSize: 20
  }
})

export default TouchDemo