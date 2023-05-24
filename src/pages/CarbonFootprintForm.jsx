import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import ButtonComponent from '../components/ButtonComponent'
import TransportationPage from './CarbonFootprintFormPages/TransportFormPage'
import HomeEnergyPage from './CarbonFootprintFormPages/HomeEnergyFormPage'
import FoodPage from './CarbonFootprintFormPages/FoodFormPage'
import WastePage from './CarbonFootprintFormPages/WasteFormPage'
import PropTypes from 'prop-types'

const screenWidth = Dimensions.get('window').width

const CarbonFootprintForm = (props) => {
  const scrollViewRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = 4
  const formData = useRef({
    TransportationUseData: [],
    EnergyConsumptionData: [],
    FoodConsumptionData: [],
    WasteProductionData: [],
  })

  const handlePageSubmit = (data) => {
    switch (currentPage) {
      case 0:
        formData.current.TransportationUseData = data
        break
      case 1:
        formData.current.EnergyConsumptionData = data
        break
      case 2:
        formData.current.FoodConsumptionData = data
        break
      case 3:
        formData.current.WasteProductionData = data
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
      console.log(formData.current)
      props.navigation.navigate('InitialPage', {data: formData.current})
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
        return <TransportationPage onSubmit={handlePageSubmit} />
      case 1:
        return <HomeEnergyPage onSubmit={handlePageSubmit} />
      case 2:
        return <FoodPage onSubmit={handlePageSubmit} />
      case 3:
        return <WastePage onSubmit={handlePageSubmit} />
      default:
        return null
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Cálculo de Huella de Carbono</Text>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const { x } = event.nativeEvent.contentOffset
          const page = Math.round(x / screenWidth)
          setCurrentPage(page)
        }}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.pageContainer}>{renderPageContent()}</View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ButtonComponent title="Anterior" onPress={goToPreviousPage} disabled={currentPage === 0} />
      </View>
    </ScrollView>
  )
}

CarbonFootprintForm.propType = {
  navigation: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  pageContainer: {
    width: screenWidth,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
    marginBottom: 16,
  },
})

export default CarbonFootprintForm
