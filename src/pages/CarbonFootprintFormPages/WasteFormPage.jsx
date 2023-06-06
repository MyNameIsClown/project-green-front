import React, { useState } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { theme } from '../../theme'
import { WasteCalcInfo } from '../CarbonFootprintIntroductionCalc'

const textOptions = ['¿Cuantas bolsas de basura sueles producir a la semana?', '¿Cuantos residuos reciclas a la semana?']

const wasteStacks = [
  { label: 'Ningun residuo (0 bolsas de basura)', value: 0 },
  { label: 'Pocos residuos (2 bolsas de basura)', value: 6 },
  { label: 'Regulares residuos (4 bolsas de basura)', value: 12 },
  { label: 'Muchos residuos (7 bolsas de basura)', value: 21 },
  { label: 'Muchísimos residuos (14 bolsas de basura)', value: 42 },
]

const weeksInAYear = 48

const FoodFormPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [wasteProductionData, setwasteProductionData] = useState([
    { wasteType: 'general', production: 0 },
    { wasteType: 'recycled', production: 0 },
  ])
  const [showInfo, setShowInfo] = useState(false)

  const handleWasteProductionChange = (index, field, value) => {
    const updatedData = [...wasteProductionData]

    if (field === 'production') {
      value = value * weeksInAYear
    }

    updatedData[index] = {
      ...updatedData[index],
      [field]: field === 'production' ? parseFloat(value) : value,
    }

    setwasteProductionData(updatedData)
  }

  const handleFormSubmit = () => {
    onSubmit(wasteProductionData)
  }
  const handleInfoContainer = () => {
    setShowInfo(!showInfo)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TitleComponent title="Emisiones por la produccion de residuos" />
        <Pressable onPress={() => handleInfoContainer()} style={{ marginLeft: 15 }}>
          <FontAwesome name="info-circle" color={theme.colors.primary} size={30} />
        </Pressable>
      </View>
      {showInfo && <WasteCalcInfo />}
      {wasteProductionData.map((data, index) => (
        <View key={index} style={styles.transportCard}>
          <Text style={styles.inputTitle}>{textOptions[index]}</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PickerComponent
                items={wasteStacks}
                numeric
                selectedValue={data.production / weeksInAYear}
                onValueChange={(value) => handleWasteProductionChange(index, 'production', value)}
                {...field}
              />
            )}
            name={`wasteProductionData[${0}].production`}
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <ButtonComponent isArrow="back" onPress={handleBack} disabled={currentPage === 0} />
        <ButtonComponent isArrow="sent" onPress={handleFormSubmit} />
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
    justifyContent: 'center',
  },

  inputTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
})

export default FoodFormPage
