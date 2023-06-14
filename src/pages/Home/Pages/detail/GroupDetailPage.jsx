import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, FlatList} from 'react-native'
import { Button, Card} from '@rneui/base'
import { theme } from '../../../../theme'
import { groups } from '../../../../services/Groups'
import { activity } from '../../../../services/ActivityService'
import alert from '../../../../components/AlertComponent'

const isWeb = Platform.OS === 'web'

const GroupDetailPage = ({ route, data, navigation }) => {
  const [loading, setLoading] = useState(false)
  const groupData = data || route.params

  const handleSubscribe = async (id) => {
    setLoading(true)
    try {
      const { status } = await groups.suscribe(id)
      if (status === 200) {
        alert('Welcome to the group')
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    } finally {
      handleReloadData(id)
      setLoading(false)
    }
  }
  const handleUnsubscribe = async (id) => {
    setLoading(true)
    try {
      const { status } = await groups.unsubscribe(id)
      if (status === 200) {
        alert('Unsubscribe success')
      }
    } catch (error) {
      alert('Error: ', error.response.data)
    } finally {
      handleReloadData(id)
      setLoading(false)
    }
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
            title="Join"
            color={theme.colors.primary}
            buttonStyle={styles.subscribeButton}
            titleStyle={styles.subscribeButtonText}
            onPress={() => handleJoinActivity(item.item.id)}
          />
      </Card>
    )
  }
  const MemberItem = ({ member }) => {
    return (
      <View style={styles.memberItem}>
        <View style={styles.memeberInnerItem}>
          <Text style={{fontWeight: 'bold'}}>Username: </Text>
          <Text>{member.item.username}</Text>
        </View>
        <View style={styles.memeberInnerItem}>
          <Text style={{fontWeight: 'bold'}}>Role: </Text>
          <Text>{member.item.groupRole}</Text>
        </View>
      </View>
    )
  }
  const handleReloadData = async (index) => {
    setLoading(true)
    try {
      const { status, data } = await groups.getDetail(index)
      if (status === 200) {
        console.log(data)
        navigation.navigate('GroupDetails', data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Card containerStyle={styles.cardStyle}>
            <View style={styles.head}>
              <Card.Title style={styles.title}>{groupData.name}</Card.Title>
              {groupData.currentUserIsTheOwner === false &&
                <View style={{flex: 1}}>
                  {groupData.currentUserIsRegistrated ? (
                    <Button
                      title="Unsubscribe"
                      buttonStyle={[styles.subscribeButton, { backgroundColor: theme.colors.secondary }]}
                      titleStyle={styles.subscribeButtonText}
                      onPress={() => handleUnsubscribe(groupData.id)}
                    />
                  ) : (
                    <Button
                      title="Subscribe"
                      buttonStyle={[styles.subscribeButton, { backgroundColor: theme.colors.primary }]}
                      titleStyle={styles.subscribeButtonText}
                      onPress={() => handleSubscribe(groupData.id)}
                    />
                  )}
                </View>
              }
            </View>

            <Card.Divider />
            <Text style={styles.description}>{groupData.description}</Text>
            <View style={styles.section}>
              <Card.Title>Members</Card.Title>
              <Card.Divider/>
              <FlatList
              data={groupData.members}
              renderItem={(item)=><MemberItem member={item}/>}
              keyExtractor={(item) => item.username}
              />
            </View>
            <View style={styles.section}>
              <Card.Title>Activities</Card.Title>
              <Card.Divider/>
              <FlatList
                data={groupData.activities}
                renderItem={(item) => <InvitationCard item={item} />}
                keyExtractor={(item) => item.id}
                numColumns={2}
              />
            </View>
            <Text style={styles.location}>{groupData.locationName}</Text>
          </Card>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 10,
  },
  cardStyle: {
    borderRadius: 20,
    width: isWeb ? '70%' : '100%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1.5
  },
  description: {
    marginBottom: 10,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  memeberInnerItem:{
    flexDirection: 'row'
  },
  subscribeButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  subscribeButtonText: {
    fontWeight: 'bold',
  },
  location: {
    textAlign: 'right',
    fontStyle: 'italic',
  },
  section:{
    marginTop: 30
  }
})

export default GroupDetailPage
