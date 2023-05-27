import React from 'react'
import { View, Text } from 'react-native'
import { ThemeProvider, Card, Header, Icon } from '@rneui/themed'
import { theme } from '../theme'

const HomePage = ({ route, navigation }) => {
  const { calculationData } = route.params
  const { user, totalCo2Emitted, totalGreenScore } = calculationData

  return (
    <ThemeProvider>
      <View>
        <Header
          backgroundColor={theme.colors.primary}
          placement="left"
          leftComponent={<Icon name="user" type="feather" />}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
        />
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Green Score: {totalGreenScore}</Text>
          <Text style={{ fontSize: 18 }}>CO2 Emitted: {totalCo2Emitted}</Text>
        </View>
        <Card containerStyle={{ marginHorizontal: 20, marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User Details:</Text>
          <Text>Username: {user.username}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Full Name: {user.fullname}</Text>
        </Card>
      </View>
    </ThemeProvider>
  )
}

export default HomePage
