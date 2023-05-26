/* eslint-disable react/prop-types */
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet, Image } from 'react-native'
import { user } from '../services/UserService'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function LogInPage({ navigation }) {
  const insets = useSafeAreaInsets()
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
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flexGrow: 1,
          flex: 1,
        },
      ]}
    >
      <View style={styles.formContainer}>
        <View style={(styles.formContainer, [{ flexDirection: 'row' }])}>
          <Image source={require('../../assets/favicon.png')} style={styles.logo} />
          <Text style={{ fontFamily: 'BrunoAce', fontSize: 40, textTransform: 'uppercase' }}>Coper</Text>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput placeholder="Username" onBlur={onBlur} onChange={onChange} value={value} width={300} />
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
            <FormInput placeholder="Password" onBlur={onBlur} onChange={onChange} value={value} password width={300} />
          )}
          name="password"
        />
        {errors.username && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput placeholder="Verify password" onBlur={onBlur} onChange={onChange} value={value} password width={300} />
          )}
          name="verifyPassword"
        />
        {errors.username && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput placeholder="Full name" onBlur={onBlur} onChange={onChange} value={value} width={300} />
          )}
          name="fullName"
        />
        {errors.username && <Text>This is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput placeholder="Email" onBlur={onBlur} onChange={onChange} value={value} width={300} />
          )}
          name="email"
        />
        {errors.username && <Text>This is required.</Text>}

        <FormButton title="Register" handleSubmit={handleSubmit(onSubmit)} primary />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
})
