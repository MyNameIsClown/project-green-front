import React, { useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Platform} from "react-native";
import { useForm, Controller } from 'react-hook-form'
import { Card, Button, Input } from "@rneui/base";
import { theme } from "../../../theme";
import alert from "../../../components/AlertComponent";
import { user } from "../../../services/UserService";

const isWeb = Platform.OS === 'web'

const ChangePassword = ({navigation}) => {
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
          oldPassword: '',
          newPassword: '',
          verifyNewPassword: '',
        },
      })

      const handleChangePassword = async (source) => {
        if(source.newPassword === source.verifyNewPassword){
            setLoading(true)
            try {
                const {status} = await user.changePassword(source)
                if(status===200){
                    navigation.navigate("Login")
                }
            } catch (error) {
                alert("Error", "The password does not match")
            } finally{
                setLoading(false)
            }
        }else{
            alert("Error", "The new password does not match")
        }
        console.log(source)
      }
    return(
        <View style={styles.container}>
            {loading
            ? <ActivityIndicator size="large" color={theme.colors.primary} />
            : 
            <Card containerStyle={styles.cardStyle}>
                <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Old Password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} />
                )}
                name="oldPassword"
                />
                {errors.oldPassword && <Text>This is required.</Text>}

                <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="New password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} />
                )}
                name="newPassword"
                />
                {errors.newPassword && <Text>This is required.</Text>}

                <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input label="Verify new Password" secureTextEntry value={value} onChangeText={onChange} onBlur={onBlur} />
                )}
                name="verifyNewPassword"
                />
                {errors.verifyNewPassword && <Text>This is required.</Text>}
                
                <Button
                title="Change password"
                color={theme.colors.primary}
                containerStyle={{borderRadius: 20}}
                onPress={handleSubmit(handleChangePassword)}
                />
            </Card>
            }
        </View>
    )
}

const styles = StyleSheet.create(({
    container:{
        marginHorizontal: 10
    },
    cardStyle:{
        borderRadius: 20,
        width: isWeb ? '70%' : '100%',
        alignSelf: 'center',
    }
}))

export default ChangePassword