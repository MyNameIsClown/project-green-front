import React, { useState } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Header, Button } from '@rneui/base'
import HomePage from './Pages/HomePage'
import { CommunityPage } from './Pages/CommunityPage'
import { UserConfigPage } from './Pages/UserConfigPage'
import { theme } from '../../theme'
import HistoryPage from './Pages/HistoryPage'
import { TouchableOpacity } from 'react-native-web'


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
        return <HistoryPage navigation={navigation} />
      case 2:
        return <CommunityPage navigation={navigation} />
      case 3:
        return <UserConfigPage data={user} navigation={navigation} />
      default:
        return null
    }
  }

  const headerTitle = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Landing')
        }}
        style={(styles.headerLogoContainer, [{ flexDirection: 'row', backgroundColor: '0000' }])}
      >
        <Image source={require('../../../assets/favicon.png')} style={styles.logo} />
        <Text style={{ fontFamily: 'BrunoAce', fontSize: 30, textTransform: 'uppercase', color: 'white' }}>Coper</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={headerTitle}
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
    flexGrow: 1,
    backgroundColor: '#EEEEEE',
  },
  headerLogoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
  },
})
