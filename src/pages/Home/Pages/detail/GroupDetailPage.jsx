import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, FlatList } from 'react-native'
import { Button, Card } from '@rneui/base'
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

            <Card.Divider />
            <Text style={styles.description}>{groupData.description}</Text>
            <View style={styles.membersContainer}>
              <Text style={styles.membersTitle}>Members:</Text>
              {groupData.members.map((member, index) => (
                <View key={index} style={styles.memberItem}>
                  <Text style={styles.memberName}>{member.username}</Text>
                  <Text style={styles.memberRole}>{member.groupRole}</Text>
                </View>
              ))}
            </View>
            <FlatList
              data={groupData.activities}
              renderItem={(item) => <InvitationCard item={item} />}
              keyExtractor={(item) => item.id}
              numColumns={2}
              contentContainerStyle={{ paddingVertical: 20, alignItems: 'center' }}
            />
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
    backgroundColor: '#fff',
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
  },
  description: {
    marginBottom: 10,
  },
  membersContainer: {
    marginBottom: 10,
  },
  membersTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  memberName: {
    marginRight: 5,
  },
  memberRole: {
    fontStyle: 'italic',
  },
  subscribeButton: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  subscribeButtonText: {
    fontWeight: 'bold',
  },
  location: {
    textAlign: 'right',
    fontStyle: 'italic',
  },
})

export default GroupDetailPage
