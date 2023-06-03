import React, { useState } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { theme } from '../../theme'
import { WasteCalcInfo } from '../CarbonFootprintIntroductionCalc'

const wasteTypes = [
  { label: 'Residuos generales', value: 'general' },
  { label: 'Residuos reciclados', value: 'recycled' },
]

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
    showInfo ? setShowInfo(false) : setShowInfo(true)
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
      <View key={0} style={styles.transportCard}>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              enabled={false}
              items={wasteTypes}
              selectedValue={wasteProductionData.wasteType}
              onValueChange={(value) => handleWasteProductionChange(0, 'wasteType', value)}
              {...field}
            />
          )}
          name={`wasteProductionData[${0}].wasteType`}
          defaultValue=""
        />
        <Text style={styles.inputTitle}>¿Cuantas bolsas de basura sueles producir a la semana?</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              items={wasteStacks}
              numeric
              selectedValue={wasteProductionData.production}
              onValueChange={(value) => handleWasteProductionChange(0, 'production', value)}
              {...field}
            />
          )}
          name={`wasteProductionData[${0}].production`}
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
              items={wasteTypes}
              selectedValue={wasteTypes[1].value}
              onValueChange={(value) => handleWasteProductionChange(1, 'wasteType', value)}
              {...field}
            />
          )}
          name={`wasteProductionData[${1}].wasteType`}
          defaultValue=""
        />
        <Text style={styles.inputTitle}>¿Cuantos residuos reciclados sueles producir a la semana?</Text>
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <PickerComponent
              items={wasteStacks}
              selectedValue={wasteProductionData.production}
              onValueChange={(value) => handleWasteProductionChange(1, 'production', value)}
              {...field}
            />
          )}
          name={`wasteProductionData[${1}].production`}
          defaultValue=""
        />
      </View>
      <View style={styles.buttonContainer}>
        <ButtonComponent title="Anterior" onPress={handleBack} disabled={currentPage === 0} />
        <ButtonComponent title="Enviar" onPress={handleFormSubmit} />
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
