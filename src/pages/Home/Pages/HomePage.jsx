import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../../theme'
import RoundButton from '../../../components/RoundButtonComponent'
import CicleMetter from '../../../components/CircleMetterComponent'
const radius = 100 // Radio de las barras semicirculares
// const strokeWidth = 10 // Ancho del borde de las barras
// const circumference = 2 * Math.PI * radius // Circunferencia de las barras

const HomePage = ({ data, navigation }) => {
  const { totalCo2Emitted, totalGreenScore } = data

  // const maxco2Emitted = 20000 // Valor máximo posible para el Green Score
  // const greenScorePercentage = totalGreenScore // Porcentaje del Green Score
  // const co2EmittedPercentage = (totalCo2Emitted / maxco2Emitted) * 100 // Porcentaje del CO2 Emitted

  const handleCalculation = () => {
    console.log('Calculando')
    navigation.navigate('CalculationIntro')
  }

  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <CicleMetter />
        {/* <RoundButton handlePress={handleCalculation} colors={theme.colors.primary} text="GO" /> */}
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.scoreText, { color: theme.colors.primary }]}>Green Score: {totalGreenScore}</Text>
        <Text style={[styles.scoreText, { color: theme.colors.secondary }]}>CO2 Emitted: {totalCo2Emitted}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    width: 2 * radius,
    height: 2 * radius,
  },
  buttonContainer: {
    height: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 150,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  circle: { borderRadius: radius, marginVertical: 10, position: 'absolute' },
})

export default HomePage
