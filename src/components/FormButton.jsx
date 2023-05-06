import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { theme } from '../theme'

export default function FormButton(props) {
  const buttonStyle = [props.primary && styles.buttonPrimary, props.secondary && styles.buttonSecondary]
  return (
    <TouchableOpacity onPress={props.handleSubmit} style={buttonStyle}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  )
}
FormButton.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  primary: PropTypes.any,
  secondary: PropTypes.any,
}

const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 0,
    width: 200,
    color: 'white',
  },
  buttonPrimary: {
    marginTop: 20,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.primary,
    minWidth: 200,
  },
  buttonSecondary: {
    marginTop: 20,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.secondary,
    minWidth: 200,
  },
})
