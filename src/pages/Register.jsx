/* eslint-disable react/prop-types */
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet } from 'react-native'
import { user } from '../services/UserService'
import * as SecureStore from '../util/SecureStore'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'

export default function LogInPage({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      verifyPassword: '',
      avatar: '',
      fullName: '',
      email: '',
    },
  })
  const onSubmit = async (source) => {
    console.log(source)
    try {
      const { status } = await user.register(source).catch((error) => console.log(error))
      if (status === 201) {
        console.log('navegando')
        navigation.navigate('Login')
      } else {
        console.log('error')
      }
    } catch (error) {
      console.log('err: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <FormInput placeholder="Username" onBlur={onBlur} onChange={onChange} value={value} />}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => <FormInput placeholder="Password" onBlur={onBlur} onChange={onChange} value={value} />}
        name="password"
      />
      {errors.username && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput placeholder="Verify password" onBlur={onBlur} onChange={onChange} value={value} />
        )}
        name="verifyPassword"
      />
      {errors.username && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <FormInput placeholder="Full name" onBlur={onBlur} onChange={onChange} value={value} />}
        name="fullName"
      />
      {errors.username && <Text>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => <FormInput placeholder="Email" onBlur={onBlur} onChange={onChange} value={value} />}
        name="email"
      />
      {errors.username && <Text>This is required.</Text>}

      <FormButton title="Register" handleSubmit={handleSubmit(onSubmit)} secondary />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
})
