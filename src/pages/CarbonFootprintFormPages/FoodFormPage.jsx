import React, { useState } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import { FoodCalcInfo } from '../CarbonFootprintIntroductionCalc'
import { theme } from '../../theme'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const consumeStacks = [
  { label: 'No consumo (0 veces a la semana)', value: 0 },
  { label: 'De vez en cuando (1 vez a la semana)', value: 1 },
  { label: 'A veces (2-3 veces a la semana)', value: 3 },
  { label: 'Con regularidad (4-5 veces a la semana)', value: 4 },
  { label: 'Bastante (5-6 veces a la semana)', value: 5 },
  { label: 'Diariamente (7 veces a la semana)', value: 7 },
]
const textOptions = ['¿Cuanta carne sueles consumir a la semana?', '¿Cuanta leche sueles consumir a la semana?']
const weeksInAYear = 48

const FoodFormPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [foodConsumeData, setfoodConsumeData] = useState([
    { foodType: 'meat', consume: 0 },
    { foodType: 'milk', consume: 0 },
  ])
  const [showInfo, setShowInfo] = useState(false)

  const handleFoodConsumeChange = (index, field, value) => {
    const updatedData = [...foodConsumeData]

    if (field === 'consume') {
      value = value * weeksInAYear
    }

    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    }

    setfoodConsumeData(updatedData)
  }

  const handleFormSubmit = () => {
    onSubmit(foodConsumeData)
  }
  const handleInfoContainer = () => {
    setShowInfo(!showInfo)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleStyle}>Emisiones por el consumo de productos de la alimentacion</Text>
        <Pressable onPress={() => handleInfoContainer()} style={{ marginLeft: 15, flex: 1}}>
          <FontAwesome name="info-circle" color={theme.colors.primary} size={30} />
        </Pressable>
      </View>
      {showInfo && <FoodCalcInfo />}
      {foodConsumeData.map((data, index) => (
        <View key={index} style={styles.transportCard}>
          <Text style={styles.inputTitle}>{textOptions[index]}</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PickerComponent
                items={consumeStacks}
                selectedValue={data.consume / weeksInAYear}
                onValueChange={(value) => handleFoodConsumeChange(index, 'consume', value)}
                {...field}
              />
            )}
            name={`foodConsumeData[${index}].consume`}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
      <ButtonComponent isArrow="back" onPress={handleBack} disabled={currentPage === 0} />
        <ButtonComponent isArrow="continue" onPress={handleFormSubmit} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transportCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  titleStyle:{
    flex: 10,
    fontSize: 20,
    fontFamily: 'BrunoAce-Regular',
  },
  inputTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
})

export default FoodFormPage
