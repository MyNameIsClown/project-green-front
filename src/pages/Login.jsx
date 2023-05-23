import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet, Image } from 'react-native'
import { user } from '../services/UserService'
import * as SecureStore from '../util/SecureStore'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import PropTypes from 'prop-types'

export default function LogInPage(props) {
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
      console.log(status)
      if (status === 201) {
        SecureStore.save('token', data.token)
        props.navigation.navigate('CarbonFootprintForm')
      }
      console.log(await SecureStore.getValueFor('token'))
    } catch (error) {
      console.log('err: ', error)
    }
  }

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/PrimaryIcon_noBG.png')} style={styles.logo} />
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

      <FormButton title="Login" handleSubmit={handleSubmit(onSubmit)} primary />
      <FormButton
        title="Register"
        handleSubmit={() => {
          // eslint-disable-next-line react/prop-types
          props.navigation.navigate('Register')
        }}
        secondary
      />
    </View>
  )
}
LogInPage.propType = {
  navigation: PropTypes.any,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
})
