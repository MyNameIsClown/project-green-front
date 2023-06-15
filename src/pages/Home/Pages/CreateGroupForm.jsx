import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, StyleSheet, ActivityIndicator, Platform } from 'react-native'
import FormInput from '../../../components/FormInput'
import FormButton from '../../../components/FormButton'
import alert from '../../../components/AlertComponent'
import { theme } from '../../../theme'
import { groups } from '../../../services/Groups'
import { Button, Input } from '@rneui/base'

const isWeb = Platform.OS === 'web'

/* CREATE GROUP */
export default function CreateGroup({ navigation }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      description: '',
      locationName: '',
    },
  })
  const [loading, setLoading] = useState(false)

  const onSubmit = async (source) => {
    console.log(source)
    setLoading(true)
    try {
      const { status, data } = await groups.create(source)
      if (status === 200) {
        console.log(data)
        navigation.goBack()
      }
    } catch (error) {
      console.log(error)
      alert('Error', error.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.formContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input inputContainerStyle={styles.inputContainer} label='Name' value={value} onChangeText={onChange} onBlur={onBlur}/>
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 2000,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input inputContainerStyle={styles.inputContainer} label='Description' value={value} onChangeText={onChange} onBlur={onBlur}/>
            )}
            name="description"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input inputContainerStyle={styles.inputContainer} label='Location Name' value={value} onChangeText={onChange} onBlur={onBlur}/>
            )}
            name="locationName"
          />

          <Button title='Create' onPress={handleSubmit(onSubmit)} color={theme.colors.primary} containerStyle={styles.button}/>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: isWeb ? '60%' : '100%',
    paddingHorizontal: 10
  },
  logo: {
    width: 50,
    height: 50,
  },
  button:{
    borderRadius: 10,
  }
})
