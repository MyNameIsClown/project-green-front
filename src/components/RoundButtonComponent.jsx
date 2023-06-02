import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

const RoundButton = ({ handlePress, colors, text }) => {
  return (
    <TouchableOpacity onPress={handlePress} style={[styles.roundButton, { backgroundColor: colors }]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  roundButton: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 130,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
  },
})

export default RoundButton
