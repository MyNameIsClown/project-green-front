import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { theme } from '../theme'

const TitleComponent = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    width: 300,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.secondary,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
})

export default TitleComponent
