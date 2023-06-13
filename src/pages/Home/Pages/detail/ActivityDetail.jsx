import { Button, Card, Dialog} from '@rneui/base'
import React, {useState}from 'react'
import { Table, Row, Cell, TableWrapper } from 'react-native-reanimated-table'
import { View, Text, StyleSheet, Switch, TouchableOpacity, ActivityIndicator} from 'react-native'
import { theme } from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { activity } from '../../../../services/ActivityService'
import alert from '../../../../components/AlertComponent'

const ActivityDetail = ({ route, navigation }) => {
  const [loading, setLoading] = useState(false)
  const [dialogDeleteUserVisible, setDialogDeleteUserVisible] = useState(false)
  const [userInscriptionDeleteSelected, setUserInscriptionDeleteSelected] = useState()
  const data = route.params
  const headerTable = ['Username', 'Is Present?']
  const invitationTable = data.invitations.map((item) => [item.username, ''])
  const invitationIdexes = data.invitations.map((item) => [item.username, item.isUserPresent])

  const modificatorElement = (index)=>{
    return(
      <View>
      {data.finished === false&&
    <View>
      {data.started === true ? 
      <Switch
        trackColor={{ false: '#767577', true: theme.colors.primary }}
        ios_backgroundColor="#3e3e3e"
        onValueChange={()=>handleChange(index[0])}
        value={index[1]}
      /> :
        <TouchableOpacity onPress={() => {
          setUserInscriptionDeleteSelected(index[0])
          switchVisibilityDeleteDialog()}}>
          <Ionicons name="trash" color="white" style={{ backgroundColor: 'red', padding: 5, borderRadius: 5, alignSelf: 'center' }} size={30} />
        </TouchableOpacity>
      }
      </View>
    }
    </View>
    )
  }
  const handleChange = async (index)=>{
    setLoading(true)
    try {
      const { status } = await activity.updatePresence(data.id,index)
      if (status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleCancel = async (index) => {
    setLoading(true)
    try {
      const { status } = await activity.cancel(index)
      if (status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleStart = async (index) => {
    setLoading(true)
    try {
      const { status } = await activity.start(index)
      if (status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleFinish = async (index) => {
    setLoading(true)
    try {
      const { status } = await activity.finish(index)
      if (status === 200) {
        navigation.goBack()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleDeleteInvitation = async (index) =>{
    switchVisibilityDeleteDialog()
    setLoading(true)
    try {
      const { status } = await activity.deleteJoinOfUser(index, userInscriptionDeleteSelected)
      if (status === 200) {
        alert("Success", "You has just delete the invitation of " + userInscriptionDeleteSelected)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const switchVisibilityDeleteDialog = ()=>{
    setDialogDeleteUserVisible(!dialogDeleteUserVisible)
  }

  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
      <View>
          <Dialog
            isVisible={dialogDeleteUserVisible}
            overlayStyle={styles.dialogStyle}
            onBackdropPress={switchVisibilityDeleteDialog}
            style={styles.dialogStyle}
          >
            <Dialog.Title title="Dialog Title" />
            <Text>Dialog body text. Add relevant information here.</Text>
            <Dialog.Actions>
              <Dialog.Button title="ACCEPT" onPress={() => handleDeleteInvitation(data.id)} />
              <Dialog.Button title="CANCEL" onPress={() => switchVisibilityDeleteDialog()} />
            </Dialog.Actions>
          </Dialog>
        <Card>
          <Card.Title>Title: {data.title}</Card.Title>
          <Card.Divider />
          <Text>Description: {data.description}</Text>
          <Text>Type: {data.type}</Text>
          <Text>Location Name: {data.locationName}</Text>
          <Text>Celebration Date: {data.celebrationDate}</Text>
          <Text>Last Time to Sign up: {data.lastTimeToSignUp}</Text>
          <Card.Title>Invitations</Card.Title>
          <Card.Divider/>
          {data.invitations.length > 0 && (
            <Table borderStyle={{ borderColor: 'transparent' }}>
              <Row data={headerTable} style={styles.head} textStyle={styles.headText} />
              {invitationTable.map((rowData, index) => (
                <TableWrapper key={index} style={{ flexDirection: 'row', paddingVertical: 5}}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell key={cellIndex} data={cellIndex === 1 ? modificatorElement(invitationIdexes[index]) : cellData} textStyle={styles.text} />
                  ))}
                </TableWrapper>
              ))}
            </Table>
          )}
          {data.finished === false ?
          <View>
            {data.started===false ? 
            <Button title="Start" color={theme.colors.primary} onPress={() => handleStart(data.id)} /> 
            : <Button title="Finish" color={theme.colors.secondary} onPress={() => handleFinish(data.id)} /> }
            
            <Button title="Cancel" color="red" onPress={() => handleCancel(data.id)} />
          </View>
          :
          <Text>Finished</Text>}
          </Card>
      </View>)}
    </View>
  )
}
const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  headText: { margin: 6, color: 'white', fontWeight: 'bold' },
  head: { height: 40, backgroundColor: theme.colors.primary },
  text: {alignSelf: 'center'}
})
export default ActivityDetail
