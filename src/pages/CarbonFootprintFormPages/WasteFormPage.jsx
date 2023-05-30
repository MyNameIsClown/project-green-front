import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'

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

const FoodFormPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [wasteProductionData, setwasteProductionData] = useState([
    { wasteType: 'general', production: 0 },
    { wasteType: 'recycled', production: 0 },
  ])

  const handleWasteProductionChange = (index, field, value) => {
    const updatedData = [...wasteProductionData]
    updatedData[index] = {
      ...updatedData[index],
      [field]: field === 'production' ? parseFloat(value) : value,
    }

    setwasteProductionData(updatedData)
  }

  const handleFormSubmit = () => {
    if (wasteProductionData.every((data) => data.wasteType && data.production)) {
      onSubmit(wasteProductionData)
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de que algún campo esté vacío
    }
  }
  return (
    <View style={styles.container}>
      <TitleComponent title="Emisiones por la produccion de residuos" />
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
})

export default FoodFormPage
