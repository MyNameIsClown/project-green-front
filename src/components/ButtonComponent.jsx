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
    elevation: 8,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    minWidth: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  disabledButtonText: {
    color: '#666666',
  },
})

export default ButtonComponent
