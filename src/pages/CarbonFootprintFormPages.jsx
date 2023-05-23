import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import TitleComponent from '../components/TitleComponent'
import InputComponent from '../components/InputComponent'

const TransportationPage = ({ control }) => {
  return (
    <View style={styles.container}>
      <TitleComponent title="Consumo de medios de transporte" />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputComponent placeholder="Tipo de vehículo" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
        )}
        name="vehicleType"
        defaultValue=""
      />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputComponent placeholder="Consumo de combustible" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
        )}
        name="fuelConsumption"
        defaultValue=""
      />
      {/* Otros campos relacionados con el transporte */}
    </View>
  )
}

const WastePage = ({ control }) => {
  return (
    <View style={styles.container}>
      <TitleComponent title="Residuos" />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputComponent placeholder="Cantidad de residuos" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
        )}
        name="wasteAmount"
        defaultValue=""
      />
      {/* Otros campos relacionados con residuos */}
    </View>
  )
}

const FoodPage = ({ control }) => {
  return (
    <View style={styles.container}>
      <TitleComponent title="Consumo de productos carnicos y lacteos" />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputComponent placeholder="Cantidad de alimentos" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
        )}
        name="foodAmount"
        defaultValue=""
      />
      {/* Otros campos relacionados con alimentos */}
    </View>
  )
}

const HomeEnergyPage = ({ control }) => {
  return (
    <View style={styles.container}>
      <TitleComponent title="Consumo de energia en el h" />
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <InputComponent placeholder="Consumo de energía en el hogar" value={field.value} onChangeText={field.onChange} onBlur={field.onBlur} />
        )}
        name="homeEnergyConsumption"
        defaultValue=""
      />
      {/* Otros campos relacionados con energía en el hogar */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: '50%',
    alignSelf: 'center',
  },
})

export { TransportationPage, HomeEnergyPage, FoodPage, WastePage }
