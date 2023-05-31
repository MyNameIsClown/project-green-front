import React from 'react'
import { View, Text } from 'react-native'
import { Card } from '@rneui/base'

export const UserConfigPage = ({ data }) => {
  const user = data
  return (
    <View>
      <Card containerStyle={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User Details:</Text>
        <Text>Username: {user.username}</Text>
        <Text>Email: {user.email}</Text>
        <Text>Full Name: {user.fullname}</Text>
      </Card>
    </View>
  )
}
