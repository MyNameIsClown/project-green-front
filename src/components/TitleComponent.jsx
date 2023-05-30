import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { theme } from '../theme'
import { useFonts } from 'expo-font'

const TitleComponent = ({ title }) => {
  const [loaded] = useFonts({
    BrunoAce: require('../../assets/fonts/BrunoAce-Regular.ttf'),
  })
  if (!loaded) {
    return null
  }
  return (
    <View>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'black',
    marginBottom: 20,
  },
})

export default TitleComponent
