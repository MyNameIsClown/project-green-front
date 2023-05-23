import React, { useState } from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const InputComponent = React.memo(({ placeholder, ...rest }) => {
  const { colors } = useTheme()
  const [text, setText] = useState('')

  const handleChangeText = (inputText) => {
    setText(inputText)
  }

  return (
    <TextInput
      style={[styles.input, { borderColor: colors.secondary, color: colors.text }]}
      placeholder={placeholder}
      placeholderTextColor={colors.text}
      onChangeText={handleChangeText}
      value={text}
      {...rest}
    />
  )
})

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    color: 'white',
  },
})

export default InputComponent
