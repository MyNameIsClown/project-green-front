import { Button, Card } from '@rneui/base'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { theme } from '../../../../theme'
import { activity } from '../../../../services/ActivityService'
import alert from '../../../../components/AlertComponent'

const ActivityDetailJoin = ({ route, navigation }) => {
  const data = route.params
  const [loading, setLoading] = useState(false)

  const handleJoin = async (index) => {
    setLoading(true)
    try {
      const { status } = await activity.join(index)
      if (status === 200) {
        alert('Success', 'Congrats you has joined to the activity')
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    } finally {
      handleReload(index)
      setLoading(false)
    }
  }
  const handleDeleteJoin = async (index) => {
    setLoading(true)
    try {
      const { status } = await activity.deleteJoin(index)
      if (status === 200) {
        alert('Success', 'Congrats you has delete your join to the activity')
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    } finally {
      handleReload(index)
      setLoading(false)
    }
  }
  const handleReload = async (index) => {
    try {
      const { status, data } = await activity.getDetailJoin(index)
      if (status === 200) {
        navigation.navigate('ActivityDetailJoin', data)
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View>
          <Card>
            <View style={styles.head}>
              <Card.Title>{data.title}</Card.Title>
              {data.hasSuscribeToGroup && (
                <View>
                  {data.hasJoined ? (
                    <Button title="Delete Join" color={theme.colors.secondary} onPress={() => handleDeleteJoin(data.id)} />
                  ) : (
                    <Button title="Join" color={theme.colors.primary} onPress={() => handleJoin(data.id)} />
                  )}
                </View>
              )}
            </View>
            <Card.Divider />
            <Text>Description: {data.description}</Text>
            <Text>Type: {data.type}</Text>
            <Text>Location Name: {data.locationName}</Text>
            <Text>Celebration Date: {new Date(data.celebrationDate).toLocaleString()}</Text>
            <Text>Last time to sign up: {new Date(data.lastTimeToSignUp).toLocaleString()}</Text>
          </Card>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  headText: { margin: 6, color: 'white', fontWeight: 'bold' },
  head: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
})
export default ActivityDetailJoin
