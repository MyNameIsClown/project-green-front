import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform, ScrollView } from 'react-native'
import { groups } from '../../../services/Groups'
import { theme } from '../../../theme'
import { Button, Card } from '@rneui/base'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'

const isWeb = Platform.OS === 'web'

export const CommunityPage = ({ navigation }) => {
  const [listGroups, setListGroups] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCarbonFootprintHistory = async () => {
      setLoading(true)
      try {
        const { status, data } = await groups.getAll()
        if (status === 200) {
          setListGroups(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarbonFootprintHistory()
  }, [])

  const handleJoin = async (index) => {
    setLoading(true)
    try {
      const { status, data } = await groups.getDetail(index)
      if (status === 200) {
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View>
            {listGroups.map((data, index) => (
              <Card key={index} containerStyle={styles.cardStyle}>
                <Card.Title style={{ fontWeight: 'bold' }}>{data.name}</Card.Title>
                <CardDivider />
                <Text>{data.description}</Text>
                <Button
                  title="Join"
                  buttonStyle={{
                    backgroundColor: theme.colors.primary,
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 10,
                  }}
                  containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                    alignSelf: 'center',
                  }}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={() => handleJoin(data.id)}
                />
                <Text style={{ textAlign: 'right' }}>{data.locationName}</Text>
              </Card>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  cardStyle: {
    flex: 1,
    width: isWeb ? '60%' : '100%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  scrollContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
})
