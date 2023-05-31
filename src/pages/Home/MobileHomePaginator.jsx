import React from 'react'
import { StyleSheet } from 'react-native'
import { Tab, TabView } from '@rneui/themed'
import HomePage from './Pages/HomePage'
import { theme } from '../../theme'
import { CommunityPage } from './Pages/CommunityPage'
import { UserConfigPage } from './Pages/UserConfigPage'

export const MobileHomePaginator = ({ data }) => {
  const [index, setIndex] = React.useState(0)
  const { user, totalCo2Emitted, totalGreenScore } = data
  const carbonFootprintData = { totalCo2Emitted, totalGreenScore }
  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item>
          <HomePage data={carbonFootprintData} />
        </TabView.Item>
        <TabView.Item>
          <CommunityPage />
        </TabView.Item>
        <TabView.Item>
          <UserConfigPage data={user} />
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="default"
        buttonStyle={{
          backgroundColor: theme.colors.primary,
        }}
      >
        <Tab.Item title="Home" titleStyle={styles.titleStyle} icon={{ name: 'timer', type: 'ionicon', color: 'white' }} />
        <Tab.Item title="Community" titleStyle={styles.titleStyle} icon={{ name: 'heart', type: 'ionicon', color: 'white' }} />
        <Tab.Item title="Profile" titleStyle={styles.titleStyle} icon={{ name: 'cart', type: 'ionicon', color: 'white' }} />
      </Tab>
    </>
  )
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 12,
    color: 'white',
  },
})
