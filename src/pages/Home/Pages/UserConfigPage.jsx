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
          setGroupData(data)
        }
      } catch (error) {
        console.log(error.response.data)
      }
      try {
        const { status, data } = await activity.getActivitiesJoined()
        if (status === 200) {
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
    navigation.navigate("ChangePassword")
  }

  const handleManageGroup = async (id) => {
    setLoading(true)
    try {
      const { status, data } = await groups.getDetail(id)
      if (status === 200) {
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
      <Card containerStyle={{flex:1, marginBottom: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'space-evenly'}}>
        <Card.Title>{item.item.name}</Card.Title>
        <Text style={{fontWeight: 'bold'}}>Celebration date: </Text>
        <Text>{new Date(item.item.celebrationDate.toString()).toLocaleDateString()}</Text>
        
        {item.item.privacity === false 
          ? <Text style={{marginTop: 10, fontStyle: 'italic'}}>This activity is public</Text>
          : <Text>This activity is private</Text>
        }
        <Button
          title="See more"
          containerStyle={styles.buttonActivity}
          color={theme.colors.primary}
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
              <Card.Title>User info</Card.Title>
              <Card.Divider/>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Username: </Text>
                <Text>{userData.username}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Text style={{fontWeight: 'bold'}}>Email: </Text>
                <Text>{userData.email}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontWeight: 'bold'}}>Full name: </Text>
                <Text>{userData.fullname}</Text>
              </View>
              <Button
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                titleStyle={styles.buttonTitleStyle}
                title="Change Password"
                onPress={() => handleChangePassword()}
              />
            </Card>
            {userData.hasGroup && groupData ? (
              <Card containerStyle={styles.cardContainer}>
                <Card.Title>My group</Card.Title>
                <Card.Divider/>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Name: </Text>
                  <Text>{groupData.name}</Text>
                </View>
                <Text style={{fontWeight: 'bold'}}>Description: </Text>
                <Text style={{marginBottom: 10}}>{groupData.description}</Text>
                <View style={{flexDirection: 'row', marginBottom: 10}}>
                  <Text style={{fontWeight: 'bold'}}>Location: </Text>
                  <Text>{groupData.locationName}</Text>
                </View>
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
              {inscriptionData.length > 0 ?
              <FlatList
                data={inscriptionData}
                renderItem={(item) => <InvitationCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
              :
              <Text>You haven't signed up for any activity yet</Text>
              }
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
  scrollContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
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
  buttonTitleStyle: { 
    fontWeight: 'bold' 
  },
  buttonActivity:{
    borderRadius: 20,
    margin: 20
  }
})
