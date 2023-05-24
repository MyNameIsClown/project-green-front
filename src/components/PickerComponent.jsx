import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useTheme } from '@react-navigation/native'

const PickerComponent = React.memo(({ items, selectedValue, onValueChange, enabled }) => {
  const { colors } = useTheme()

  return (
    <View style={[styles.container, { borderColor: colors.secondary }]}>
      <Picker
        enabled={enabled}
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={[styles.picker, { color: colors.text }]}
        itemStyle={{ color: colors.text }}
      >
        {items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  picker: {
    height: 40,
  },
})

export default PickerComponent
