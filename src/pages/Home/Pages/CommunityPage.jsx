import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const CommunityPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>En desarollo...</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
})
