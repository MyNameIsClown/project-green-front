import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Card } from '@rneui/base'

export const UserConfigPage = ({ data }) => {
  const user = data
  return (
    <View style={styles.container}>
      <Card>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User Details:</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Full Name: {user.fullname}</Text>
      </Card>
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
