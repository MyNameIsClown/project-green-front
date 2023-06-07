import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Platform, ActivityIndicator, Alert } from 'react-native'
import { Button, Card } from '@rneui/base'
import { theme } from '../../../../theme'
import { groups } from '../../../../services/Groups'
import alert from '../../../../components/AlertComponent'

const isWeb = Platform.OS === 'web'

const GroupDetailPage = ({ route }) => {
  const [loading, setLoading] = useState(false)
  const groupData = route.params

  const handleSubscribe = async (id) => {
    console.log('Subscribe button pressed')
    setLoading(true)
    try {
      const { status } = await groups.suscribe(id)
      if (status === 200) {
        alert('Welcome to the group')
      }
    } catch (error) {
      alert('Error: ', error.response.data)
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
            <Card.Title style={styles.title}>{groupData.name}</Card.Title>
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
            <Button
              title="Subscribe"
              buttonStyle={styles.subscribeButton}
              titleStyle={styles.subscribeButtonText}
              onPress={() => handleSubscribe(groupData.id)}
            />
            <Text style={styles.location}>{groupData.locationName}</Text>
          </Card>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.primary,
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
