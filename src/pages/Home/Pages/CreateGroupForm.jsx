import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import FormInput from '../../../components/FormInput'
import FormButton from '../../../components/FormButton'
import alert from '../../../components/AlertComponent'
import { theme } from '../../../theme'
import { groups } from '../../../services/Groups'

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
    // setLoading(true)
    // try {
    //   const { status, data } = await groups.create(source)
    //   if (status === 201) {
    //     console.log(data)
    //   }
    // } catch (error) {
    //   console.log(error)
    //   alert('Error', error.response.data.error)
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <View style={styles.formContainer}>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : (
        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput placeholder="name" onBlur={onBlur} onChange={onChange} value={value} width={300} />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput placeholder="description" onBlur={onBlur} onChange={onChange} value={value} width={300} />
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
              <FormInput placeholder="locationName" onBlur={onBlur} onChange={onChange} value={value} width={300} />
            )}
            name="locationName"
          />

          <FormButton title="Create" handleSubmit={handleSubmit(onSubmit)} primary />
        </View>
      )}
    </View>
  )
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
