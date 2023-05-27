import React from 'react'
import { View, Text } from 'react-native'

const InitialPage = ({ data }) => {
  return (
    <View>
      <Text>Response: {data}</Text>
    </View>
  )
}

export default InitialPage
