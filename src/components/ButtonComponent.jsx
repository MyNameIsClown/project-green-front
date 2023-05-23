import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { theme } from '../theme'

const ButtonComponent = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity style={[styles.button, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>{title.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    marginVertical: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#666666',
  },
})

export default ButtonComponent
