import { Button, Card } from '@rneui/base'
import React from 'react'
import { Table, Row, Cell, TableWrapper } from 'react-native-reanimated-table'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '../../../../theme'
import { TouchableOpacity } from 'react-native-web'

const ActivityDetail = ({ route, navigation }) => {
  const data = route.params
  const headerTable = ['Username', 'Group Role', 'Is Present?']
  const invitationTable = data.invitations.map((item) => [item.username, item.userRoleOnGroup, item.isUserPresent.toString()])

  const handleCancel = (index) => {
    console.log('Canceling.. ' + index)
  }

  return (
    <View>
      <Card>
        <Card.Title>Title: {data.title}</Card.Title>
        <Card.Divider />
        <Text>Description: {data.description}</Text>
        <Text>Type: {data.type}</Text>
        <Text>Location Name: {data.locationName}</Text>
        {data.invitations.length > 0 && (
          <Table borderStyle={{ borderColor: 'transparent' }}>
            <Row data={headerTable} style={styles.head} textStyle={styles.headText} />
            {invitationTable.map((rowData, index) => (
              <TableWrapper key={index} style={{ flexDirection: 'row' }}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell key={cellIndex} data={cellIndex === 3 ? seeMoreElement(tableIndexes[index]) : cellData} textStyle={styles.text} />
                ))}
              </TableWrapper>
            ))}
          </Table>
        )}
        <Button title="Cancel" color="red" onPress={() => handleCancel(data.id)} />
      </Card>
    </View>
  )
}
const styles = StyleSheet.create({
  headText: { margin: 6, color: 'white', fontWeight: 'bold' },
  head: { height: 40, backgroundColor: theme.colors.primary },
})
export default ActivityDetail
