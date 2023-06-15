import React from 'react'
import { View, StyleSheet } from 'react-native'

const CicleMetter = () => {
  return <View style={[styles.halfCircle]} />
}

const styles = StyleSheet.create({
  halfCircle: {
    width: 50,
    height: 100,
    borderTopLeftRadius: 27.5,
    borderTopRightRadius: 27.5,
    backgroundColor: 'red',
  },
})

export default CicleMetter
