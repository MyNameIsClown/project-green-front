import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Header, Button } from '@rneui/base'
import HomePage from './Pages/HomePage'
import { CommunityPage } from './Pages/CommunityPage'
import { UserConfigPage } from './Pages/UserConfigPage'
import { theme } from '../../theme'
import HistoryPage from './Pages/HistoryPage'

export const WebHomePaginator = ({ data, navigation }) => {
  const [index, setIndex] = useState(0)
  const { user, totalCo2Emitted, totalGreenScore } = data
  const carbonFootprintData = { totalCo2Emitted, totalGreenScore }

  const goToPage = (index) => {
    setIndex(index)
  }

  const renderPage = () => {
    switch (index) {
      case 0:
        return <HomePage data={carbonFootprintData} navigation={navigation} />
      case 1:
        return <HistoryPage />
      case 2:
        return <CommunityPage data={data} />
      case 3:
        return <UserConfigPage data={user} />
      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{ text: 'Home', style: { color: '#fff', fontSize: 20, fontWeight: 'bold' } }}
        containerStyle={{ backgroundColor: theme.colors.primary }}
        rightComponent={
          <View style={{ flexDirection: 'row' }}>
            <Button title="Home" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(0)} />
            <Button title="History" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(1)} />
            <Button title="Community" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(2)} />
            <Button title="Profile" type="clear" titleStyle={{ color: '#fff' }} onPress={() => goToPage(3)} />
          </View>
        }
      />
      <View style={styles.pageContainer}>{renderPage()}</View>
      <View />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
})
