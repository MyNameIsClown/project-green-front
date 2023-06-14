import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, ActivityIndicator, Text, ScrollView, StyleSheet, Platform, Switch, TouchableOpacity } from 'react-native'
import { theme } from '../../../theme'
import { activity } from '../../../services/ActivityService'
import { groups } from '../../../services/Groups'
import { Card, Button, Input, Dialog} from '@rneui/base'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Ionicons } from '@expo/vector-icons'
import { Table, Row, Cell, TableWrapper } from 'react-native-reanimated-table'
import alert from '../../../components/AlertComponent'

const isWeb = Platform.OS === 'web'

const ManageGroup = ({ route, navigation }) => {
  const dataOrigin = route.params
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [groupData, setGroupData] = useState(dataOrigin)
  const [dialogDeleteUserVisible, setDialogDeleteUserVisible] = useState(false)
  const [userIndexToDelete, setUserIndexToDelete] = useState()


  const tableHead = ['Name', 'Date', 'State', '']
  const tableData = groupData.activities.map((item) => [item.name, new Date(item.celebrationDate).toLocaleDateString(), item.state, ''])
  const tableIndexes = groupData.activities.map((item) => [item.id])

  const tableUserHead = ['Username', 'Group Role', '']
  const tableUserData = groupData.members.map((item) => [item.username, item.groupRole, ''])

  const [showCelebrationDatePicker, setShowCelebrationDatePicker] = useState(false)
  const [celebration, setCelebration] = useState(new Date())
  const [hasPickAnCelebrationDate, setHasPickAnCelebrationDate] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      type: '',
      locationName: '',
      celebrationDate: celebration,
      lastTimeToSignUp: '',
      groupId: dataOrigin.id,
      isPrivate: false,
    },
  })

  const handleAddActivity = () => {
    setShowForm(true)
  }
  const handleCancelActivity = () => {
    reset()
    setShowForm(false)
  }
  const handleActivityDetail = async (index) => {
    setLoading(true)
    try {
      const { status, data } = await activity.getDetail(index)
      if (status === 200) {
        navigation.navigate('ActivityDetail', data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const seeMoreElement = (index) => (
    <TouchableOpacity onPress={() => handleActivityDetail(index[0])}>
      <Ionicons
        name="eye"
        color="white"
        style={{ backgroundColor: theme.colors.secondary, padding: 5, borderRadius: 5, alignSelf: 'center' }}
        size={30}
      />
    </TouchableOpacity>
  )

  const deleteUserElement = (userData) => (
    <View>
      {userData[1] !== 'owner' && (
        <TouchableOpacity onPress={() => {
          setUserIndexToDelete(userData[0])
          switchVisibilityDeleteDialog()
          }}>
          <Ionicons name="trash" color="white" style={{ backgroundColor: theme.colors.secondary, padding: 5, borderRadius: 5, alignSelf: 'center' }} size={25} />
        </TouchableOpacity>
      )}
    </View>
  )
  const switchVisibilityDeleteDialog = () => {
    setDialogDeleteUserVisible(!dialogDeleteUserVisible)
  }
  const handleDeleteUser = async (index) => {
    setLoading(true)
    switchVisibilityDeleteDialog()
    try {
      const { status} = await groups.deleteUserFromGroup(groupData.id,index)
      if (status === 200) {
        alert("Success", "Delete Success")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      navigation.goBack()
    }
  }

  const handleCreateActivity = async (source) => {
    
    let finalDate
    if(isWeb){
      if(isValidDate(source.celebrationDate)){
        finalDate = new Date(source.celebrationDate)
        setHasPickAnCelebrationDate(true)
      }else{
        alert("Error","Date not valid use format MM/DD/yyyy")
        setHasPickAnCelebrationDate(false)
      }
    }
    
    if (hasPickAnCelebrationDate === true) {
      setLoading(true)

      finalDate = isWeb ? finalDate : celebration

      const newLastTimeToSignUp = new Date(finalDate.getTime())
      newLastTimeToSignUp.setDate(newLastTimeToSignUp.getDate() - 1)
      source.celebrationDate = finalDate
      source.lastTimeToSignUp = newLastTimeToSignUp
      console.log(source)

      try {
        const activityResponse = await activity.create(source)
        if (activityResponse.status === 200) {
          handleCancelActivity()
        }
        const { status, data } = await groups.getDetail(dataOrigin.id)
        if (status === 200) {
          console.log(data)
          setGroupData(data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
      setHasPickAnCelebrationDate(false)
    }
  }
  const showDateCelebrationPicker = () => {
    if (Platform.OS === 'android') {
      setShowCelebrationDatePicker(true)
    }
  }
  const changeSelectedDate = (selectedDate) => {
    setShowCelebrationDatePicker(false)
    const newDate = new Date(selectedDate.nativeEvent.timestamp)
    setCelebration(newDate)
    setHasPickAnCelebrationDate(true)
  }

  const isValidDate = (dateString) =>{
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    const parts = dateString.split("/");
    const day = parseInt(parts[1], 10);
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[2], 10);

    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    return day > 0 && day <= monthLength[month - 1];
};

const handleColorChange = (cellData)=>{
  let color = theme.colors.secondary
  switch (cellData) {
    case 'Finished':
      color = 'red'
      break;
    case 'Started':
      color = theme.colors.primary
      break;
    case 'Canceled':
      color = 'grey'
      break;
  
    default:
      break;
  }
  return color
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
            <Dialog.Title title="Do you want to kick the user out?" />
            <Text>You are about to kick the user out of the group, they can join again whenever they want.</Text>
            <Dialog.Actions>
              <Dialog.Button title="ACCEPT" onPress={() => handleDeleteUser(userIndexToDelete)} />
              <Dialog.Button title="CANCEL" onPress={() => switchVisibilityDeleteDialog()} />
            </Dialog.Actions>
          </Dialog>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title style={styles.title}>{groupData.name}</Card.Title>
              <Card.Divider />
              <Text style={styles.description}>{groupData.description}</Text>
              <Table style={{marginBottom: 10}}>
                <Row data={tableUserHead} style={styles.head} textStyle={styles.headText} />
                {tableUserData.map((rowData, index) => (
                  <TableWrapper key={index} style={{ flexDirection: 'row', marginTop: 20 }}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell key={cellIndex} data={cellIndex === 2 ? deleteUserElement(tableUserData[index]) : cellData} textStyle={styles.text} />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
              <Text style={styles.location}>{groupData.locationName}</Text>
            </Card>
            <Card containerStyle={styles.cardStyle}>
              <Card.Title>Activities</Card.Title>
              <Card.Divider />
              <Table borderStyle={{ borderColor: 'transparent' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.headText} />
                {tableData.map((rowData, index) => (
                  <TableWrapper key={index} style={{ flexDirection: 'row', paddingTop: 10 }}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell 
                        key={cellIndex} 
                        data={cellIndex === 3 ? seeMoreElement(tableIndexes[index]) : cellData} 
                        textStyle={
                          [styles.text, {
                            color: cellIndex === 2 ? handleColorChange(cellData) : 'black', 
                            fontWeight: cellIndex === 2 ? 'bold' : 'normal'
                          }]} 
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
              {showForm && (
                <Card>
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input label="Name" placeholder="name" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                    name="name"
                  />
                  {errors.name && <Text>This is required.</Text>}
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input label="Description" placeholder="description" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                    name="description"
                  />
                  {errors.description && <Text>This is required.</Text>}
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input label="Type" placeholder="type" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                    name="type"
                  />
                  {errors.type && <Text>This is required.</Text>}
                  <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input label="Location" placeholder="Location Name" value={value} onChangeText={onChange} onBlur={onBlur} />
                    )}
                    name="locationName"
                  />
                  {errors.locationName && <Text>This is required.</Text>}
                  <Controller
                    control={control}
                    render={({field: { onChange, onBlur, value }}) => (
                      <View>
                        {isWeb === true
                        ? 
                        <View>
                          <Input
                            label="Select celebration Date"
                            containerStyle={{ flex: 1 }}
                            placeholder="Location name"
                            value={value}
                            onChangeText={onChange}
                          />
                        </View>
                        : 
                        <View>
                          <TouchableOpacity
                            style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => showDateCelebrationPicker()}
                          >
                            <Input
                              label="Select celebration Date"
                              containerStyle={{ flex: 1 }}
                              placeholder={celebration.toLocaleDateString()}
                              editable={false}
                            /> 
                            <Ionicons
                              name="calendar"
                              color="white"
                              style={{ backgroundColor: theme.colors.primary, padding: 5, borderRadius: 5 }}
                              size={30}
                            />
                          </TouchableOpacity>
                          {showCelebrationDatePicker && (
                            <DateTimePicker color={theme.colors.primary} testID="dateTimePicker" value={celebration} mode="date" is24Hour onChange={changeSelectedDate} />
                          )}
                        </View>
                        }
                      </View>
                    )}
                    name="celebrationDate"
                  />
                  {!hasPickAnCelebrationDate && <Text>This is required</Text>}
                  <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[styles.text, {fontWeight:'bold', fontSize: 16, color: 'grey', marginRight: 20}]}>Is it private?</Text>
                    <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Switch
                        trackColor={{ false: '#767577', true: theme.colors.primary }}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onChange}
                        value={value}
                      />
                    )}
                    name="isPrivate"
                  />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Button
                      title="Create"
                      color={theme.colors.primary}
                      onPress={handleSubmit(handleCreateActivity)}
                      containerStyle={styles.buttonStyles}
                    />
                    <Button title="Cancel" color={theme.colors.secondary} onPress={handleCancelActivity} containerStyle={styles.buttonStyles} />
                  </View>
                </Card>
              )}
              <Button
                title="Add activity"
                buttonStyle={styles.subscribeButton}
                titleStyle={styles.subscribeButtonText}
                onPress={() => handleAddActivity(groupData.id)}
              />
            </Card>
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dialogStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  scrollContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#EEEEEE',
  },
  cardStyle: {
    borderRadius: 20,
    width: isWeb ? '70%' : '100%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  description: {
    marginBottom: 10,
  },
  membersContainer: {
    marginBottom: 10,
  },
  membersTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  memberName: {
    marginRight: 5,
  },
  memberRole: {
    fontStyle: 'italic',
  },
  subscribeButton: {
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    width: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
  subscribeButtonText: {
    fontWeight: 'bold',
  },
  location: {
    textAlign: 'right',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  buttonStyles: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  datePickersStylesText: {
    fontWeight: 20,
  },
  head: { backgroundColor: theme.colors.primary },
  text: { margin: 6, textAlign: 'center'},
  headText: { margin: 6, color: 'white', fontWeight: 'bold', alignSelf: 'center' },
  row: { flexDirection: 'row', backgroundColor: '#FFFF' },
  btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
  btnText: { textAlign: 'center', color: '#fff' },
  deleteButton: { alignItems: 'center', justifyContent: 'center' },
})

export default ManageGroup
