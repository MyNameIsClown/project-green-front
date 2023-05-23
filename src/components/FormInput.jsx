import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

export default function FormInput(props) {
  return (
    <TextInput style={styles.formInput} placeholder={props.placeholder} onBlur={props.onBlur} onChangeText={props.onChange} value={props.value} />
  )
}
FormInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onBlur: PropTypes.any.isRequired,
  onChange: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const styles = StyleSheet.create({
  formInput: {
    minWidth: 200,
    minHeight: 50,
    marginTop: 20,
    borderRadius: 30,
    borderColor: '#000000',
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    backgroundColor: 'white',
  },
})
