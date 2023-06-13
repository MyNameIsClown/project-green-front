import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform, ScrollView, FlatList } from 'react-native'
import { Card, Button } from '@rneui/base'
import { groups } from '../../../services/Groups'
import alert from '../../../components/AlertComponent'
import { user } from '../../../services/UserService'
import { theme } from '../../../theme'
import { activity } from '../../../services/ActivityService'

const isWeb = Platform.OS === 'web'

export const UserConfigPage = ({ data, navigation }) => {
  const [userData, setUserData] = useState(data)
  const [loading, setLoading] = useState(false)
  const [groupData, setGroupData] = useState()
  const [inscriptionData, setInscriptionData] = useState([])

  useEffect(() => {
    const fetchGroupData = async () => {
      setLoading(true)
      try {
        const { status, data } = await user.currentUser()
        if (status === 200) {
          setUserData(data)
        } else if (status === 401) {
          alert('Error:', 'There was a problem with the current session')
          navigation.navigate('Login')
        }
      } catch (error) {
        console.log(error.response.data)
      }
      try {
        const { status, data } = await groups.getOwn()
        if (status === 200) {
          console.log(data)
          setGroupData(data)
        }
      } catch (error) {
        console.log(error.response.data)
      }
      try {
        const { status, data } = await activity.getActivitiesJoined()
        if (status === 200) {
          console.log(data)
          setInscriptionData(data)
        }
      } catch (error) {
        console.log(error.response.data)
      } finally {
        setLoading(false)
      }
    }
    fetchGroupData()
  }, [navigation])

  const handleChangePassword = () => {
    console.log('Change Password')
  }

  const handleManageGroup = async (id) => {
    setLoading(true)
    try {
      const { status, data } = await groups.getDetail(id)
      if (status === 200) {
        console.log(data)
        navigation.navigate('ManageGroup', data)
      }
    } catch (error) {
      console.log(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGroup = () => {
    navigation.navigate('CreateGroup')
  }

  const handleJoinActivity = async (id) => {
    setLoading(true)
    try {
      const { status, data } = await activity.getDetailJoin(id)
      if (status === 200) {
        navigation.navigate('ActivityDetailJoin', data)
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    } finally {
      setLoading(false)
    }
  }
  const InvitationCard = ({ item }) => {
    return (
      <Card containerStyle={{ marginHorizontal: 20, marginBottom: 20 }}>
        {console.log(item.item)}
        <Card.Title>{item.item.name}</Card.Title>
        <Text>{item.item.celebrationDate}</Text>
        <Text>{item.item.privacity.toString()}</Text>
        <Button
          title="Join"
          buttonStyle={styles.subscribeButton}
          titleStyle={styles.subscribeButtonText}
          onPress={() => handleJoinActivity(item.item.id)}
        />
      </Card>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : (
          <View>
            <Card containerStyle={styles.cardContainer}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>User Details:</Text>
              <Text>Username: {userData.username}</Text>
              <Text>Email: {userData.email}</Text>
              <Text>Full Name: {userData.fullname}</Text>
              <Button
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
                title="Change Password"
                onPress={() => handleChangePassword}
              />
            </Card>
            {userData.hasGroup && groupData ? (
              <Card containerStyle={styles.cardContainer}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>My Group:</Text>
                <Text>Group Name: {groupData.name}</Text>
                <Text>Description: {groupData.description}</Text>
                <Text>Location: {groupData.locationName}</Text>
                <Button
                  buttonStyle={styles.buttonStyle}
                  containerStyle={styles.buttonContainerStyle}
                  titleStyle={styles.buttonTitleStyle}
                  title="Manage"
                  onPress={() => handleManageGroup(groupData.id)}
                />
              </Card>
            ) : (
              <Button
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
                title="Create group"
                onPress={() => handleCreateGroup()}
              />
            )}
            <Card containerStyle={styles.cardContainer}>
              <Card.Title>Activities Joined</Card.Title>
              <Card.Divider />
              <FlatList
                data={inscriptionData}
                renderItem={(item) => <InvitationCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{ paddingVertical: 20, alignItems: 'center' }}
              />
            </Card>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  cardContainer: {
    width: isWeb ? '60%' : '100%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
  },
  buttonContainerStyle: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonTitleStyle: { fontWeight: 'bold' },
  scrollContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
})
