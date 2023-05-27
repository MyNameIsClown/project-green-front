import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const InputComponent = React.memo(({ placeholder, numeric = false, ...rest }) => {
  const { colors } = useTheme()

  return (
    <TextInput
      style={[styles.input, { borderColor: colors.secondary, color: colors.text }]}
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      keyboardType={numeric ? 'numeric' : 'default'}
      value={rest.value}
      {...rest}
    />
  )
})

const styles = StyleSheet.create({
  input: {
    minHeight: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: 'white',
  },
})

export default InputComponent
