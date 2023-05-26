import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'

const foodTypes = [
  { label: 'Carne', value: 'meat' },
  { label: 'Lacteos', value: 'milk' },
]

const consumeStacks = [
  { label: 'No consumo (0 veces a la semana)', value: 0 },
  { label: 'De vez en cuando (1 vez a la semana)', value: 1 },
  { label: 'A veces (2-3 veces a la semana)', value: 3 },
  { label: 'Con regularidad (4-5 veces a la semana)', value: 4 },
  { label: 'Bastante (5-6 veces a la semana)', value: 5 },
  { label: 'Diariamente (7 veces a la semana)', value: 7 },
]

const FoodFormPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [foodConsumeData, setfoodConsumeData] = useState([
    { foodType: 'meat', consume: 0 },
    { foodType: 'milk', consume: 0 },
  ])

  const handleFoodConsumeChange = (index, field, value) => {
    const updatedData = [...foodConsumeData]
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    }

    setfoodConsumeData(updatedData)
  }

  const handleFormSubmit = () => {
    if (foodConsumeData.every((data) => data.foodType && data.consume)) {
      onSubmit(foodConsumeData)
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de que algún campo esté vacío
    }
  }
  return (
    <View style={styles.container}>
      <TitleComponent title="Emisiones por el consumo de productos de la alimentacion" />
      <View key={0} style={styles.transportCard}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              enabled={false}
              items={foodTypes}
              selectedValue={foodConsumeData.foodType}
              onValueChange={(value) => handleFoodConsumeChange(0, 'foodType', value)}
              {...field}
            />
          )}
          name={`foodConsumeData[${0}].foodType`}
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              items={consumeStacks}
              numeric
              selectedValue={foodConsumeData.consume}
              onValueChange={(value) => handleFoodConsumeChange(0, 'consume', value)}
              {...field}
            />
          )}
          name={`foodConsumeData[${0}].consume`}
          defaultValue=""
        />
      </View>
      <View key={1} style={styles.transportCard}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              enabled={false}
              items={foodTypes}
              selectedValue={foodTypes[1].value}
              onValueChange={(value) => handleFoodConsumeChange(1, 'foodType', value)}
              {...field}
            />
          )}
          name={`foodConsumeData[${1}].foodType`}
          defaultValue=""
        />

        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              items={consumeStacks}
              numeric
              selectedValue={foodConsumeData.consume}
              onValueChange={(value) => handleFoodConsumeChange(1, 'consume', value)}
              {...field}
            />
          )}
          name={`foodConsumeData[${1}].consume`}
          defaultValue=""
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent title="Anterior" onPress={handleBack} disabled={currentPage === 0} />
        <ButtonComponent title="Siguiente" onPress={handleFormSubmit} />
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
})

export default FoodFormPage
