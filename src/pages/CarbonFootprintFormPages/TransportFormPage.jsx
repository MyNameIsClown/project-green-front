import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import InputComponent from '../../components/InputComponent'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'

const screenWidth = Dimensions.get('window').width

const vehicleTypes = [
  { label: 'Gasolina', value: 'gasoline' },
  { label: 'Diesel', value: 'diesel' },
  { label: 'Gas natural comprimido', value: 'gnc' },
  { label: 'Gas licuado de petróleo', value: 'glp' },
  { label: 'Avión', value: 'plane' },
  { label: 'Barco', value: 'ship' },
  { label: 'Tren de larga distancia', value: 'train' },
  { label: 'Autobús', value: 'bus' },
  { label: 'Metro', value: 'subway' },
  { label: 'Cercanías', value: 'commuter_train' },
  { label: 'Tranvía', value: 'tram' },
  { label: 'Taxi', value: 'taxi' },
]

const numericFields = ['distanceTravelInKm', 'timeIntervalInDays']

const TransportationPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()
  const [transportData, setTransportData] = useState([])
  const [showVehicleName, setShowVehicleName] = useState(true)
  const [selectedVehicleType, setSelectedVehicleType] = useState('') // Inicializar con un valor que no esté en las opciones válidas

  const handleAddTransport = () => {
    setTransportData([...transportData, { transportName: '', vehicleType: 'gasoline', timeIntervalInDays: 0, distanceTravelInKm: 0 }])
  }

  const handleRemoveTransport = (index) => {
    const updatedData = [...transportData]
    updatedData.splice(index, 1)
    setTransportData(updatedData)
  }

  const handleTransportChange = (index, field, value) => {
    if (numericFields.includes(field)) {
      const numericValue = value.replace(/[^0-9.]/g, '') // Eliminar caracteres no numéricos
      value = numericValue !== '' ? parseFloat(numericValue) : 0
    }
    const updatedData = [...transportData]
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    }
    if (field === 'vehicleType') {
      setSelectedVehicleType(value)
      setShowVehicleName(['gasoline', 'diesel', 'gnc', 'glp'].includes(value))

      if (!['gasoline', 'diesel', 'gnc', 'glp'].includes(value)) {
        updatedData[index] = {
          ...updatedData[index],
          transportName: value,
        }
      }
    }
    setTransportData(updatedData)
  }
  const handleFormSubmit = () => {
    if (transportData.every((data) => data.transportName && data.vehicleType && data.timeIntervalInDays && data.distanceTravelInKm)) {
      onSubmit(transportData)
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de que algún campo esté vacío
    }
  }
  return (
    <View style={styles.container}>
      <TitleComponent title="Emisiones por el uso de transportes" />
      {transportData.map((data, index) => (
        <View key={index} style={styles.transportCard}>
          <Text style={styles.inputTitle}>¿De que tipo de vehiculo se trata?</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <PickerComponent
                items={vehicleTypes}
                selectedValue={data.vehicleType}
                onValueChange={(value) => handleTransportChange(index, 'vehicleType', value)}
                {...field}
              />
            )}
            name={`transportData[${index}].vehicleType`}
            defaultValue=""
          />

          {!showVehicleName ? null : (
            <View>
              <Text style={styles.inputTitle}>¿Con que nombre quieres guardar este medio de transporte?</Text>
              <Controller
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <InputComponent
                    placeholder="Nombre del vehículo"
                    value={data.transportName}
                    onChangeText={(value) => handleTransportChange(index, 'transportName', value)}
                    {...field}
                  />
                )}
                name={`transportData[${index}].transportName`}
                defaultValue=""
              />
            </View>
          )}
          <Text style={styles.inputTitle}>Periodo de tiempo de consumo</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder="Rango de fechas (en dias)"
                numeric
                value={data.timeIntervalInDays}
                onChangeText={(value) => handleTransportChange(index, 'timeIntervalInDays', value)}
                {...field}
              />
            )}
            name={`transportData[${index}].timeIntervalInDays`}
            defaultValue=""
          />
          <Text style={styles.inputTitle}>Distancia total recorrida</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder="Distancia recorrida (km)"
                numeric
                value={data.distanceTravelInKm}
                onChangeText={(value) => handleTransportChange(index, 'distanceTravelInKm', value)}
                {...field}
              />
            )}
            name={`transportData[${index}].distanceTravelInKm`}
            defaultValue=""
          />
          {/* Agrega un botón de eliminar */}
          <TouchableOpacity onPress={() => handleRemoveTransport(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <ButtonComponent title="Añadir Transporte" onPress={handleAddTransport} />
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
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    elevation: 4,
    minWidth: 10,
  },

  removeButton: {
    alignSelf: 'flex-end',
    padding: 8,
  },

  removeButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },

  inputTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default TransportationPage
