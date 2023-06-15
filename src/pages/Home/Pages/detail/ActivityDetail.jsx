import { Button, Card, Dialog} from '@rneui/base'
import React, {useState}from 'react'
import { Table, Row, Cell, TableWrapper } from 'react-native-reanimated-table'
import { View, Text, StyleSheet, Switch, TouchableOpacity, ActivityIndicator, ScrollView, Platform} from 'react-native'
import { theme } from '../../../../theme'
import { Ionicons } from '@expo/vector-icons'
import { activity } from '../../../../services/ActivityService'
import alert from '../../../../components/AlertComponent'

const isWeb = Platform.OS === 'web'

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
      if (status === 202) {
        alert("Success", "You has just delete the invitation of " + userInscriptionDeleteSelected)
        navigation.goBack()
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <View>
            {/* Dialogo */}
            <Dialog
              isVisible={dialogDeleteUserVisible}
              overlayStyle={styles.dialogStyle}
              onBackdropPress={switchVisibilityDeleteDialog}
              style={styles.dialogStyle}
            >
              <Dialog.Title title="Do you want to Kick the user?" />
              <Text>You are about to kick the user from the activity</Text>
              <Dialog.Actions>
                <Dialog.Button title="ACCEPT" onPress={() => handleDeleteInvitation(data.id)} />
                <Dialog.Button title="DECLINE" onPress={() => switchVisibilityDeleteDialog()} />
              </Dialog.Actions>
            </Dialog>
            
            <Card containerStyle={styles.cardStyle}>
              <Card.Title>{data.title}</Card.Title>
              <Card.Divider />
              <View>
                <Text style={styles.label}>Description: </Text>
                <Text>{data.description}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Type: </Text>
                <Text>{data.type}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Location: </Text>
                <Text>{data.locationName}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Celebration date: </Text>
                <Text>{new Date(data.celebrationDate.toString()).toLocaleDateString()}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.label}>Last date to sign up: </Text>
                <Text>{new Date(data.lastTimeToSignUp.toString()).toLocaleDateString()}</Text>
              </View>
            </Card>
            <Card containerStyle={styles.cardStyle}>
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
              {data.finished === false && data.canceled === false 
                ? <View style={styles.buttonsContainer}>
                    {data.started===false ? 
                      <Button 
                        title="Start" 
                        color={theme.colors.primary} 
                        onPress={() => handleStart(data.id)}
                        containerStyle={styles.button}
                      /> 
                      : 
                      <Button 
                        title="Finish" 
                        color={theme.colors.secondary} 
                        onPress={() => handleFinish(data.id)}
                        containerStyle={styles.button}
                      /> 
                    }
                    <Button 
                      title="Cancel" 
                      color="red" 
                      onPress={() => handleCancel(data.id)}
                      containerStyle={styles.button}
                    />
                  </View>
                : <Text>Finished</Text>
              }
            </Card>
          </View>)}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  scrollContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardStyle: {
    borderRadius: 20,
    width: isWeb ? '70%' : '100%',
    alignSelf: 'center',
  },
  dialogStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  headText: {
    margin: 6, 
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  head: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: theme.colors.primary 
  },
  text: {
    alignSelf: 'center'
  },
  button:{
    borderRadius: 20,
    marginTop: 20,
    marginHorizontal: 5,
    alignSelf: 'center',
    flex: 1
  },
  buttonsContainer:{
    flexDirection: 'row'
  },
  label:{
    fontWeight: 'bold'
  },
  section:{
    flexDirection: 'row'
  }
})
export default ActivityDetail
