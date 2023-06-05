import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import CarbonDataTable from '../../../components/CarbonFootprintDataTable'
import { carbonFootprint } from '../../../services/CarbonFootprintService'
import { theme } from '../../../theme'

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCarbonFootprintHistory = async () => {
      setLoading(true)
      try {
        const { status, data } = await carbonFootprint.getAll()
        if (status === 200) {
          setHistoryData(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCarbonFootprintHistory()
  }, [])

  const handleRowPress = async (id) => {
    setLoading(true)
    try {
      const { status, data } = await carbonFootprint.getOne(id)
      if (status === 200) {
        console.log(data)
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
        <CarbonDataTable data={historyData} handleRowPress={handleRowPress} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#0000',
  },
})

export default HistoryPage
