import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Button, TextInput, View, Text } from 'react-native'

export default function LogInPage() {
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

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Repeat password" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="verifyPassword"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput placeholder="Full name" onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="fullName"
      />

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => <TextInput placeholder="Email" onBlur={onBlur} onChangeText={onChange} value={value} />}
        name="email"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}
