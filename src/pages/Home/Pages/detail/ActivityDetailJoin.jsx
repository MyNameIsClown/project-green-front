import { Button, Card } from '@rneui/base'
import React, { useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import { theme } from '../../../../theme'
import { activity } from '../../../../services/ActivityService'
import alert from '../../../../components/AlertComponent'
import { Ionicons } from '@expo/vector-icons'

const isWeb = Platform.OS === 'web'
const activityStates = ['Started', 'Finished', 'Canceled']

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
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.head}>
              <Card.Title style={styles.headText}>{data.title}</Card.Title>
              {data.hasSuscribeToGroup === true ? (
                <View style={styles.headButtons}>
                  {data.hasJoined ? (
                    <Button 
                    title="Delete Join" 
                    color={theme.colors.secondary} 
                    onPress={() => handleDeleteJoin(data.id)}
                    containerStyle={styles.button}
                    disabled={data.started || data.finished}
                    />
                  ) : (
                    <Button 
                    title="Join" 
                    color={theme.colors.primary} 
                    onPress={() => handleJoin(data.id)} 
                    containerStyle={styles.button}
                    disabled={data.started || data.finished}
                    />
                  )}
                </View>) :
                  (<Ionicons
                    name='information-circle'
                    size={30}
                    color={theme.colors.primary}
                    onPress={()=>alert("Info", "You have to suscribe to join to this activity")}
                  />
                )}
            </View>
            <Card.Divider />
            <Text style={[styles.label, {marginTop: 10}]}>Description: </Text>
            <Text>{data.description}</Text>
            <View style={styles.section}>
              <Text style={styles.label}>State: </Text>
              <Text>
                {data.started && activityStates[0]}
                {data.finished && activityStates[1]}
                {data.canceled && activityStates[2]}
                {!data.started && !data.finished && !data.canceled
                  && "Waiting for celebration date"
                }
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Type: </Text>
              <Text>{data.type}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Location: </Text>
              <Text>{data.locationName}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Celebration date: </Text>
              <Text>{new Date(data.celebrationDate.toString()).toLocaleDateString()}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.label}>Last date to sign up: </Text>
              <Text>{new Date(data.lastTimeToSignUp.toString()).toLocaleDateString()}</Text>
            </View>
          </Card>
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  cardStyle: {
    borderRadius: 20,
    width: isWeb ? '70%' : '100%',
    alignSelf: 'center',
  },
  head: { 
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  headButtons:{
    flex: 1,
  },
  button:{
    borderRadius: 20,
    margin: 10
  },
  headText:{
    fontSize: 20,
    flex: 2
  },
  section:{
    marginTop: 10,
    flexDirection: 'row'
  },
  label:{
    fontWeight: 'bold'
  }
})
export default ActivityDetailJoin
