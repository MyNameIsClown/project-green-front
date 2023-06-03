import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native'
import TransportationPage from './CarbonFootprintFormPages/TransportFormPage'
import HomeEnergyPage from './CarbonFootprintFormPages/HomeEnergyFormPage'
import FoodPage from './CarbonFootprintFormPages/FoodFormPage'
import WastePage from './CarbonFootprintFormPages/WasteFormPage'
import PropTypes from 'prop-types'
import { carbonFootprint } from '../services/CarbonFootprintService'

const screenWidth = Dimensions.get('window').width

const CarbonFootprintForm = (props) => {
  const scrollViewRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 4
  const formData = useRef({
    transportationUseData: [],
    energyConsumptionData: [],
    foodConsumptionData: [],
    wasteProductionData: [],
  })

  const handlePageSubmit = async (data) => {
    switch (currentPage) {
      case 0:
        formData.current.transportationUseData = data
        break
      case 1:
        formData.current.energyConsumptionData = data
        break
      case 2:
        formData.current.foodConsumptionData = data
        break
      case 3:
        formData.current.wasteProductionData = data
        break
      default:
        break
    }

    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
      scrollViewRef.current?.scrollTo({
        x: (currentPage + 1) * screenWidth,
        animated: true,
      })
    } else {
      // console.log(formData.current)
      const { status, data } = await carbonFootprint.calculate(formData.current).catch((error) => console.log(error))
      console.log(status, data)
      if (status === 200) {
        props.navigation.navigate('HomePaginator', { data: data })
      }
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
      scrollViewRef.current?.scrollTo({
        x: (currentPage - 1) * screenWidth,
        animated: true,
      })
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return <TransportationPage onSubmit={handlePageSubmit} handleBack={goToPreviousPage} currentPage={currentPage} />
      case 1:
        return <HomeEnergyPage onSubmit={handlePageSubmit} handleBack={goToPreviousPage} currentPage={currentPage} />
      case 2:
        return <FoodPage onSubmit={handlePageSubmit} handleBack={goToPreviousPage} currentPage={currentPage} />
      case 3:
        return <WastePage onSubmit={handlePageSubmit} handleBack={goToPreviousPage} currentPage={currentPage} />
      default:
        return null
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cálculo de Huella de Carbono</Text>
      <ScrollView
        // ref={scrollViewRef}
        // vertical
        // pagingEnabled
        showsVerticalScrollIndicator={false}
        // onMomentumScrollEnd={(event) => {
        //   const { x } = event.nativeEvent.contentOffset
        //   const page = Math.round(x / screenWidth)
        //   setCurrentPage(page)
        // }}
        style={styles.scrollViewContent}
      >
        <View style={styles.pageContainer}>{renderPageContent()}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

CarbonFootprintForm.propType = {
  navigation: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    textTransform: 'uppercase',
  },
  scrollViewContent: {
    marginHorizontal: 10,
  },
  pageContainer: {
    width: screenWidth,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
})

export default CarbonFootprintForm
