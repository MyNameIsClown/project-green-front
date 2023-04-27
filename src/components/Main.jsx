import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import Login from '../pages/Login'
import { StatusBar } from 'expo-status-bar'

export default function Main() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/PrimaryIcon.png')} />
      <Login />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 40,
  },
})
