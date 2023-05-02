/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function home() {
  const navigator = useNavigation()
  return (
    <View style={styles.container}>
      <Text>Hola mundo</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Login" onPress={() => navigator.navigate('Login')} />
        <Button title="Register" onPress={() => navigator.navigate('Register')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#gffd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: 40,
  },
})
