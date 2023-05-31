import React, { useState } from 'react'
import { View } from 'react-native'
import { Header, Button } from '@rneui/base'
import HomePage from './Pages/HomePage'
import { CommunityPage } from './Pages/CommunityPage'
import { UserConfigPage } from './Pages/UserConfigPage'
import { theme } from '../../theme'

export const WebHomePaginator = ({ data }) => {
  const [index, setIndex] = useState(0)
  const { user, totalCo2Emitted, totalGreenScore } = data
  const carbonFootprintData = { totalCo2Emitted, totalGreenScore }

  const goToPage = (index) => {
    setIndex(index)
  }

  const renderPage = () => {
    switch (index) {
      case 0:
        return <HomePage data={carbonFootprintData} />
      case 1:
        return <CommunityPage data={data} />
      case 2:
        return <UserConfigPage data={user} />
      default:
        return null
    }
  }

  return (
    <View>
      <Header
        leftComponent={{ text: 'Home', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
        containerStyle={{ backgroundColor: theme.colors.primary }}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <Button title="Home" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(0)} />
            <Button title="Community" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(1)} />
            <Button title="Profile" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(2)} />
          </View>
        }
      />
      <View>{renderPage()}</View>
      <View />
    </View>
  )
}
