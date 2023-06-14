import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Platform, ScrollView, TouchableOpacity, Switch } from 'react-native'
import { groups } from '../../../services/Groups'
import { theme } from '../../../theme'
import { Button, Card, Input } from '@rneui/base'
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider'
import FormInput from '../../../components/FormInput'
import { Ionicons } from '@expo/vector-icons'

const isWeb = Platform.OS === 'web'

export const CommunityPage = ({ navigation }) => {
  const [listGroups, setListGroups] = useState([])
  const [inmutableListGroups, setInmutableListGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [isRegisterFilterOn, setIsRegisterFilterOn] = useState(false)

  useEffect(() => {
    const fetchCarbonFootprintHistory = async () => {
      setLoading(true)
      try {
        const { status, data } = await groups.getAll()
        if (status === 200) {
          setListGroups(data)
          setInmutableListGroups(data)
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

  const updateSearch = (search) => {
    setSearch(search)
  }

  const handleSearch = () => {
    if (search) {
      setListGroups(
        inmutableListGroups.filter((e) => {
          return e.name.includes(search)
        }),
      )
    } else {
      setListGroups(inmutableListGroups)
    }
    setSearch('')
  }

  const handleRegisterFilter = () => {
    setIsRegisterFilterOn((previousState) => !previousState)
    if (isRegisterFilterOn) {
      setListGroups(
        inmutableListGroups.filter((e) => {
          return e.currentUserIsRegistrated === isRegisterFilterOn
        }),
      )
    } else {
      setListGroups(inmutableListGroups)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View>
            <Card containerStyle={{
              width: isWeb ? '60%' : '100%',
              alignSelf: 'center',
              borderRadius: 20,}}>
              <View style={styles.filterStyles}>
                {/* <FormInput placeholder="search" value={search} onChange={updateSearch} /> */}
                <Input value={search} onChangeText={updateSearch} inputContainerStyle={styles.searchBar}/>
                <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch()}>
                  <Ionicons name="search" size={30} />
                </TouchableOpacity>
              </View>
              <View style={[styles.filterStyles, styles.filterSuscribe]}>
                <Text style={{fontWeight: 'bold'}}>Filter suscribe:</Text>
                <Switch
                  trackColor={{ false: '#767577', true: theme.colors.primary }}
                  thumbColor={isRegisterFilterOn ? '#f5dd4b' : '#f4f3f4'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={handleRegisterFilter}
                  value={isRegisterFilterOn}
                />
              </View>
            </Card>
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
    justifyContent: 'center',
    flexGrow: 1,
  },
  scrollContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardStyle: {
    flex: 1,
    width: isWeb ? '60%' : '100%',
    alignSelf: 'center',
    borderRadius: 20,
  },
  filterStyles: {
    width: isWeb ? '60%' : '80%', 
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: 10
  },
  filterSuscribe: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
