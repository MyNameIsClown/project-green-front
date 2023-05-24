import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import InputComponent from '../../components/InputComponent'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'

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

const TransportationPage = ({ onSubmit }) => {
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
          {!showVehicleName ? null : (
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
          )}
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

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder="Rango de fechas (en dias)"
                value={data.timeIntervalInDays}
                onChangeText={(value) => handleTransportChange(index, 'timeIntervalInDays', value)}
                {...field}
              />
            )}
            name={`transportData[${index}].timeIntervalInDays`}
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder="Distancia recorrida (km)"
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
      <ButtonComponent title="Siguiente" onPress={handleFormSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
})

export default TransportationPage
