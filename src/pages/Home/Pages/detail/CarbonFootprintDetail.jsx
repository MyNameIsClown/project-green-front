import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { ListItem } from '@rneui/themed'
import { theme } from '../../../../theme'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Ionicons from '@expo/vector-icons/Ionicons'

const CarbonFootprintDetail = ({ route }) => {
  const [expandedSections, setExpandedSections] = useState([])
  const data = route.params

  const toggleAccordion = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((sec) => sec !== section))
    } else {
      setExpandedSections([...expandedSections, section])
    }
  }

  return (
    <ScrollView style={styles.container}>
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>CO2 Emitted: {data.co2Emitted}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Date: {new Date(data.date).toLocaleString()}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem>
        <ListItem.Content>
          <ListItem.Title>Green Score: {data.greenScore}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Transportation Data</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedSections.includes('transportation')}
        onPress={() => toggleAccordion('transportation')}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>CO2 Emitted: {data.transportationData.co2Emitted}</ListItem.Title>
            <ListItem.Title>Green Score: {data.transportationData.greenScore}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {data.transportationData.transportationUseData.map((transport, index) => (
          <ListItem key={index} bottomDivider>
            <FontAwesome name="car" size={20} />
            <ListItem.Content>
              <ListItem.Title>Transport Name: {transport.transportName}</ListItem.Title>
              <ListItem.Title>Vehicle Type: {transport.vehicleType}</ListItem.Title>
              <ListItem.Title>Distance: {transport.distanceTravelInKm} km</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>

      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Energy Data</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedSections.includes('energy')}
        onPress={() => toggleAccordion('energy')}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>CO2 Emitted: {data.energyData.co2Emitted}</ListItem.Title>
            <ListItem.Title>Green Score: {data.energyData.greenScore}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {data.energyData.energyConsumptionData.map((energy, index) => (
          <ListItem key={index} bottomDivider>
            <FontAwesome name="bolt" size={20} />
            <ListItem.Content>
              <ListItem.Title>Energy Type: {energy.energyType}</ListItem.Title>
              <ListItem.Title>Consumption: {energy.consume}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Food Data</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedSections.includes('food')}
        onPress={() => toggleAccordion('food')}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>CO2 Emitted: {data.foodData.co2Emitted}</ListItem.Title>
            <ListItem.Title>Green Score: {data.foodData.greenScore}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {data.foodData.foodConsumptionData.map((food, index) => (
          <ListItem key={index} bottomDivider>
            <Ionicons name="fast-food" size={20} />
            <ListItem.Content>
              <ListItem.Title>Food Type: {food.foodType}</ListItem.Title>
              <ListItem.Title>Consumption: {food.consume}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Waste Data</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expandedSections.includes('waste')}
        onPress={() => toggleAccordion('waste')}
      >
        <ListItem>
          <ListItem.Content>
            <ListItem.Title>CO2 Emitted: {data.wasteData.co2Emitted}</ListItem.Title>
            <ListItem.Title>Green Score: {data.wasteData.greenScore}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        {data.wasteData.wasteProductionData.map((waste, index) => (
          <ListItem key={index} bottomDivider>
            <FontAwesome name="recycle" size={20} />
            <ListItem.Content>
              <ListItem.Title>Waste Type: {waste.wasteType}</ListItem.Title>
              <ListItem.Title>Production: {waste.production}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ListItem.Accordion>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    padding: 10,
  },
})

export default CarbonFootprintDetail
