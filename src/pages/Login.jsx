import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, TextInput, View, Text } from 'react-native'
import { user } from '../services/UserService'
import * as SecureStore from '../util/SecureStore'

export default function LogInPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  })
  const onSubmit = async (source) => {
    try {
      const { status, data } = await user.logIn(source).catch((error) => console.log(error))
      if (status === 201) {
        SecureStore.save('token', data.token)
      }
      console.log(await SecureStore.getValueFor('token'))
    } catch (error) {
      console.log('err: ', error)
    }
  }

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Username" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Password" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="password"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}
