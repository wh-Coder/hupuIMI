import React from 'react'
import {
  StyleSheet,
  TextInput,
  Text,
  View,
} from 'react-native'

const InputText = (props) => (
  <TextInput
    style={{padding: 0}}
    underlineColorAndroid="transparent"
    multiline = {true}
    {...props}
  />
)

const styles = StyleSheet.create({})

export default InputText
