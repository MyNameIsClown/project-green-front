import React from 'react'
import { StyleSheet } from 'react-native'
import { Tab, TabView } from '@rneui/themed'
import HomePage from './Pages/HomePage'
import { theme } from '../../theme'
import { CommunityPage } from './Pages/CommunityPage'
import { UserConfigPage } from './Pages/UserConfigPage'
import HistoryPage from './Pages/HistoryPage'

export const MobileHomePaginator = ({ data, navigation }) => {
  const [index, setIndex] = React.useState(0)
  const { user, totalCo2Emitted, totalGreenScore } = data
  const carbonFootprintData = { totalCo2Emitted, totalGreenScore }
  return (
    <>
      <TabView value={index} onChange={setIndex} disableTransition containerStyle={styles.container}>
        <TabView.Item style={styles.pageContainer}>
          <HomePage data={carbonFootprintData} navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.pageContainer}>
          <HistoryPage navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.pageContainer}>
          <CommunityPage navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={styles.pageContainer}>
          <UserConfigPage data={user} navigation={navigation} />
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        disableIndicator
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="default"
        buttonStyle={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <Tab.Item title="Home" titleStyle={styles.titleStyle} icon={{ name: 'home', type: 'ionicon', color: 'white' }} />
        <Tab.Item title="History" titleStyle={styles.titleStyle} icon={{ name: 'history', type: 'font-awesome-5', color: 'white' }} />
        <Tab.Item title="Group " titleStyle={styles.titleStyle} icon={{ name: 'people-circle-outline', type: 'ionicon', color: 'white' }} />
        <Tab.Item title="Profile" titleStyle={styles.titleStyle} icon={{ name: 'person-circle-outline', type: 'ionicon', color: 'white' }} />
      </Tab>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  pageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
  titleStyle: {
    fontSize: 10,
    color: 'white',
  },
})
