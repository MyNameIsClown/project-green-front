import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import InputComponent from '../../components/InputComponent'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import { EnergyCalcInfo } from '../CarbonFootprintIntroductionCalc'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { theme } from '../../theme'

const energyTypes = [
  { label: 'Corriente electrica', value: 'electricity' },
  { label: 'Gas natural', value: 'natural_gas' },
  { label: 'Butano', value: 'butane' },
  { label: 'Propano', value: 'propane' },
]

const numericFields = ['timeIntervalInDays', 'consume']

const HomeEnergyPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [energyConsumptionData, setEnergyConsumptionData] = useState([])
  const [showInfo, setShowInfo] = useState(false)

  const handleAddEnergyConsumption = () => {
    setEnergyConsumptionData([...energyConsumptionData, { energyType: 'electricity', consume: 0 }])
  }

  const handleRemoveEnergyConsumption = (index) => {
    const updatedData = [...energyConsumptionData]
    updatedData.splice(index, 1)
    setEnergyConsumptionData(updatedData)
  }

  const handleEnergyConsumptionChange = (index, field, value) => {
    if (numericFields.includes(field)) {
      const numericValue = value.replace(/[^0-9.]/g, '') // Eliminar caracteres no numéricos
      value = numericValue !== '' ? parseFloat(numericValue) : 0
    }
    const updatedData = [...energyConsumptionData]

    if (field === 'consume') {
      value = value * 12
    }

    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    }

    setEnergyConsumptionData(updatedData)
  }

  const handleFormSubmit = () => {
    if (energyConsumptionData.every((data) => data.energyType && data.consume)) {
      onSubmit(energyConsumptionData)
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de que algún campo esté vacío
    }
  }
  const handleInfoContainer = () => {
    showInfo ? setShowInfo(false) : setShowInfo(true)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TitleComponent title="Emisiones por el consumo energetico" />
        <Pressable onPress={() => handleInfoContainer()} style={{ marginLeft: 15 }}>
          <FontAwesome name="info-circle" color={theme.colors.primary} size={30} />
        </Pressable>
      </View>
      {showInfo && <EnergyCalcInfo />}
      {energyConsumptionData.map((data, index) => (
        <View key={index} style={styles.transportCard}>
          <Text style={styles.inputTitle}>¿De que tipo de energia se trata?</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PickerComponent
                items={energyTypes}
                selectedValue={data.energyType}
                onValueChange={(value) => handleEnergyConsumptionChange(index, 'energyType', value)}
                {...field}
              />
            )}
            name={`energyConsumptionData[${index}].energyType`}
            defaultValue=""
          />
          <Text style={styles.inputTitle}>¿Que consumo medio tienes al mes?</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder="Consumo (m3 o kwh)"
                value={data.consume}
                onChangeText={(value) => handleEnergyConsumptionChange(index, 'consume', value)}
                {...field}
              />
            )}
            name={`energyConsumptionData[${index}].consume`}
            defaultValue=""
          />
          {/* Agrega un botón de eliminar */}
          <TouchableOpacity onPress={() => handleRemoveEnergyConsumption(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <ButtonComponent title="Añadir Energias" onPress={handleAddEnergyConsumption} />
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

  removeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },

  removeButtonText: {
    color: 'red',
    fontWeight: 'bold',
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

export default HomeEnergyPage
