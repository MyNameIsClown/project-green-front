import React, { useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import InputComponent from '../../components/InputComponent'
import PickerComponent from '../../components/PickerComponent'
import ButtonComponent from '../../components/ButtonComponent'
import TitleComponent from '../../components/TitleComponent'
import { TransportCalcInfo } from '../CarbonFootprintIntroductionCalc'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { theme } from '../../theme'

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
const inputPromps = ['Distancia total recorrida en un año', 'Numero de trayectos de 3000km en un año', 'Numero de horas de uso medias semanales']
const placeholderPromps = ['Distancia recorrida(km)', 'Numero de trayectos (ida y vuelta)', 'Numero de horas semanales']
const estimatedKmPerHourInPublicTransport = 40
const weeksInAYear = 48
const averageLongTravelInKm = 3000

const TransportationPage = ({ onSubmit, handleBack, currentPage }) => {
  const { control } = useForm()

  const [transportData, setTransportData] = useState([])
  const [showVehicleName, setShowVehicleName] = useState([true])
  const [selectedVehicleType, setSelectedVehicleType] = useState('') // Inicializar con un valor que no esté en las opciones válidas
  const [showInfo, setShowInfo] = useState(false)
  const [textInputKmPromp, setTextInputKmPromp] = useState([inputPromps[0]])
  const [textPlaceholderKmPromp, setTextPlaceholderKmPromp] = useState([placeholderPromps[0]])

  const handleAddTransport = () => {
    setTransportData([...transportData, { transportName: '', vehicleType: 'gasoline', distanceTravelInKm: 0 }])
  }

  const handleRemoveTransport = (index) => {
    const updatedData = [...transportData]
    updatedData.splice(index, 1)
    setTransportData(updatedData)
  }

  const handleTransportChange = (index, field, value) => {
    const type = transportData[index].vehicleType
    const isLongTravelTransport = ['plane', 'ship', 'train'].includes(type)
    const isPersonalTransport = ['gasoline', 'diesel', 'gnc', 'glp'].includes(type)

    if (numericFields.includes(field)) {
      const numericValue = value.replace(/[^0-9.]/g, '') // Eliminar caracteres no numéricos
      value = numericValue !== '' ? parseFloat(numericValue) : 0
    }
    const updatedData = [...transportData]
    const updatedShowVehicleName = [...showVehicleName]
    const updatedTextPromp = [...textInputKmPromp]
    const updatedPlaceholderPromp = [...textPlaceholderKmPromp]

    if (isPersonalTransport) {
      updatedTextPromp[index] = inputPromps[0]
      updatedPlaceholderPromp[index] = placeholderPromps[0]
    } else if (!isPersonalTransport && isLongTravelTransport) {
      updatedTextPromp[index] = inputPromps[1]
      updatedPlaceholderPromp[index] = placeholderPromps[1]
    } else {
      updatedTextPromp[index] = inputPromps[2]
      updatedPlaceholderPromp[index] = placeholderPromps[2]
    }

    if (field === 'vehicleType') {
      const isLongTravelTransport = ['plane', 'ship', 'train'].includes(value)
      const isPersonalTransport = ['gasoline', 'diesel', 'gnc', 'glp'].includes(value)

      updatedShowVehicleName[index] = isPersonalTransport

      setSelectedVehicleType(value)
      if (!isPersonalTransport) {
        updatedData[index] = {
          ...updatedData[index],
          transportName: value,
        }
        updatedTextPromp[index] = isLongTravelTransport ? inputPromps[1] : inputPromps[2]
        updatedPlaceholderPromp[index] = isLongTravelTransport ? placeholderPromps[1] : placeholderPromps[2]
      }
    } else if (field === 'distanceTravelInKm') {
      const type = transportData[index].vehicleType
      const isLongTravelTransport = ['plane', 'ship', 'train'].includes(type)
      const isPersonalTransport = ['gasoline', 'diesel', 'gnc', 'glp'].includes(type)
      if (!isPersonalTransport && !isLongTravelTransport) {
        value = value * estimatedKmPerHourInPublicTransport * weeksInAYear
      } else if (!isPersonalTransport && isLongTravelTransport) {
        value = value * averageLongTravelInKm
      }
    }
    updatedData[index] = {
      ...updatedData[index],
      [field]: value,
    }
    setTransportData(updatedData)
    setShowVehicleName(updatedShowVehicleName)
    setTextInputKmPromp(updatedTextPromp)
    setTextPlaceholderKmPromp(updatedPlaceholderPromp)
  }
  const handleFormSubmit = () => {
    if (transportData.every((data) => data.transportName && data.vehicleType && data.distanceTravelInKm)) {
      onSubmit(transportData)
    } else {
      // Mostrar mensaje de error o realizar otra acción en caso de que algún campo esté vacío
    }
  }
  const handleInfoContainer = () => {
    setShowInfo(!showInfo)
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TitleComponent title="Emisiones por el uso de transportes" />
        <Pressable onPress={() => handleInfoContainer()} style={{ marginLeft: 15 }}>
          <FontAwesome name="info-circle" color={theme.colors.primary} size={30} />
        </Pressable>
      </View>
      {showInfo && <TransportCalcInfo />}
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
          />

          {(showVehicleName[index] || showVehicleName[index] === undefined) && (
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
              />
            </View>
          )}
          <Text style={styles.inputTitle}>{(textInputKmPromp[index] ??= inputPromps[0])}</Text>
          <Controller
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <InputComponent
                placeholder={(textPlaceholderKmPromp[index] ??= placeholderPromps[0])}
                numeric
                value={data.distanceTravelInKm}
                onChangeText={(value) => handleTransportChange(index, 'distanceTravelInKm', value)}
                {...field}
              />
            )}
            name={`transportData[${index}].distanceTravelInKm`}
          />
          {/* Agrega un botón de eliminar */}
          <TouchableOpacity onPress={() => handleRemoveTransport(index)} style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <ButtonComponent title="Añadir Transporte" onPress={handleAddTransport} />
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default TransportationPage
