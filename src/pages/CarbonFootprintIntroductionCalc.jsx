import React from 'react'
import { ScrollView, Text, StyleSheet, Platform } from 'react-native'
import ButtonComponent from '../components/ButtonComponent'
import { Card } from '@rneui/base'

const isWeb = Platform.OS === 'web'

export const TransportCalcInfo = () => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.sectionTitle}>Transportes (valor de referencia en 1 año):</Card.Title>
      <Card.Divider />
      <Text style={styles.sectionDescription}>
        Calcularemos las emisiones relacionadas con tu transporte durante un año. Ten en cuenta los medios de transporte que utilizas con mayor
        frecuencia.
      </Text>
    </Card>
  )
}
export const EnergyCalcInfo = () => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.sectionTitle}>Consumo eléctrico (valores de referencia 1 mes):</Card.Title>
      <Card.Divider />
      <Text style={styles.sectionDescription}>
        Calcularemos las emisiones derivadas de tu consumo eléctrico en un mes. Consideraremos la energía utilizada en tu hogar.
      </Text>
    </Card>
  )
}
export const FoodCalcInfo = () => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.sectionTitle}>Consumo de alimentos (valores de referencia 1 semana):</Card.Title>
      <Card.Divider />
      <Text style={styles.sectionDescription}>
        Calcularemos las emisiones generadas por tu consumo de alimentos durante una semana. Incluiremos factores como el tipo de alimentos y su
        procedencia.
      </Text>
    </Card>
  )
}
export const WasteCalcInfo = () => {
  return (
    <Card containerStyle={styles.card}>
      <Card.Title style={styles.sectionTitle}>Producción de residuos (valores de referencia 1 semana):</Card.Title>
      <Card.Divider />
      <Text style={styles.sectionDescription}>
        Calcularemos las emisiones generadas por la producción de residuos en una semana. Consideraremos el manejo de los residuos que generas.
      </Text>
    </Card>
  )
}

const CalculationIntro = ({ navigation }) => {
  const handleContinue = () => {
    navigation.navigate('CarbonFootprintForm') // Reemplaza 'FormularioHuellaCarbono' con la ruta correcta a tu formulario
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Introducción al cálculo de la huella de carbono</Text>
      <Text style={styles.description}>
        En esta sección, calcularás las emisiones procedentes de diferentes fuentes. {`\n`}A continuación, te proporcionamos los valores de referencia
        que utilizaremos:
      </Text>
      <TransportCalcInfo />
      <EnergyCalcInfo />
      <FoodCalcInfo />
      <WasteCalcInfo />
      <ButtonComponent title="Continuar" onPress={handleContinue} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    width: isWeb ? '50%' : '100%',
    marginBottom: 16,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    marginBottom: 20,
    textAlign: 'justify',
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  sectionDescription: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default CalculationIntro
