import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function FormInput(props) {
  return (
    <TextInput
      style={[styles.formInput, { minWidth: props.width }]}
      placeholder={props.placeholder}
      onBlur={props.onBlur}
      onChangeText={props.onChange}
      value={props.value}
      secureTextEntry={props.password}
    />
  )
}
FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  width: PropTypes.any,
  password: PropTypes.bool,
}

const styles = StyleSheet.create({
  formInput: {
    minHeight: 50,
    marginTop: 20,
    marginHorizontal: 100,
    borderRadius: 10,
    borderColor: '#000000',
    borderWidth: 0,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
  },
})
