import React, { useRef, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import ButtonComponent from '../components/ButtonComponent'
import { TransportationPage, HomeEnergyPage, FoodPage, WastePage } from './CarbonFootprintFormPages'

const screenWidth = Dimensions.get('window').width

const CarbonFootprintForm = () => {
  const scrollViewRef = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const { control, handleSubmit } = useForm()
  const totalPages = 4

  const handlePageSubmit = (data) => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1)
      scrollViewRef.current?.scrollTo({ x: (currentPage + 1) * screenWidth, animated: true })
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1)
      scrollViewRef.current?.scrollTo({ x: (currentPage - 1) * screenWidth, animated: true })
    }
  }

  const renderPageContent = () => {
    switch (currentPage) {
      case 0:
        return <TransportationPage control={control} />
      case 1:
        return <HomeEnergyPage control={control} />
      case 2:
        return <FoodPage control={control} />
      case 3:
        return <WastePage control={control} />
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
        <ButtonComponent title="Siguiente" onPress={handleSubmit(handlePageSubmit)} disabled={currentPage === totalPages - 1} />
      </View>
    </ScrollView>
  )
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
