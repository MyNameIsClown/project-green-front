import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { user } from '../services/UserService'
import { carbonFootprint } from '../services/CarbonFootprintService'
import * as SecureStore from '../util/SecureStore'
import FormInput from '../components/FormInput'
import FormButton from '../components/FormButton'
import PropTypes from 'prop-types'
import { useFonts } from 'expo-font'
import alert from '../components/AlertComponent'
import { theme } from '../theme'

/* LOGIN */
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
  const [loaded] = useFonts({
    BrunoAce: require('../../assets/fonts/BrunoAce-Regular.ttf'),
  })
  const [loading, setLoading] = useState(false)

  if (!loaded) {
    return null
  }
  const onSubmit = async (source) => {
    setLoading(true)
    try {
      const { status, data } = await user.logIn(source)
      if (status === 201) {
        SecureStore.save('token', data.token)
        console.log(data)
        if (data.carbonFootprintIsCalculated) {
          const { status, data } = await carbonFootprint.getHomePageInfo()
          if (status === 200) {
            console.log(data)
            props.navigation.navigate('HomePage', { calculationData: data })
          }
        } else {
          props.navigation.navigate('CarbonFootprintForm')
        }
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
              <FormInput placeholder="Password" onBlur={onBlur} onChange={onChange} value={value} width={300} password />
            )}
            name="password"
          />

          <FormButton title="Login" handleSubmit={handleSubmit(onSubmit)} primary />
          <Text>
            Already have an account?{' '}
            <Text
              style={{ fontWeight: 'bold', paddingTop: 20, textDecorationLine: 'underline', textAlign: 'left' }}
              onPress={() => {
                props.navigation.navigate('Register')
              }}
            >
              Register
            </Text>
          </Text>
          <Text>
            By singing up, I agree to Coper's{' '}
            <Text
              style={{ fontWeight: 'bold', marginTop: 20, textDecorationLine: 'underline' }}
              onPress={() => {
                props.navigation.navigate('Register')
              }}
            >
              terms & conditions
            </Text>
          </Text>
        </View>
      )}
    </View>
  )
}
LogInPage.propType = {
  navigation: PropTypes.any,
}

const styles = StyleSheet.create({
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
