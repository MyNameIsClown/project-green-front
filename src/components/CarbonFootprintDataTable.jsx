import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Table, Row } from 'react-native-reanimated-table'
import { theme } from '../theme'

const CarbonDataTable = ({ data, handleRowPress }) => {
  const tableHead = ['Date', 'Co2 Emitted', 'Green Score']

  const tableData = data.map((item) => [
    new Date(item.date).toLocaleString(),
    item.co2Emitted.toFixed(2).toString(),
    item.greenScore.toString() + '/100',
  ])
  const tableIndexes = data.map((item) => [item.id.toString()])

  return (
    <View style={styles.container}>
      <Table borderStyle={{ borderColor: 'transparent' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
        {tableData.map((rowData, index) => (
          <TouchableOpacity key={index} onPress={() => handleRowPress(tableIndexes[index])}>
            <Row data={rowData} textStyle={styles.text} style={styles.row} />
          </TouchableOpacity>
        ))}
      </Table>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingTop: 30, backgroundColor: theme.colors.background, width: '100%', flex: 1 },
  head: { height: 40, backgroundColor: theme.colors.primary },
  text: { margin: 6, textAlign: 'center' },
  headText: { margin: 6, color: 'white', fontWeight: 'bold' },
  row: { flexDirection: 'row', backgroundColor: '#FFFF' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
})

export default CarbonDataTable
