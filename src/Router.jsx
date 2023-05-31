import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View } from 'react-native'
import Login from './pages/Login'
import { StatusBar } from 'expo-status-bar'
import Register from './pages/Register'
import CarbonFootprintForm from './pages/CarbonFootprintForm'
import Constants from 'expo-constants'
import HomePage from './pages/Home/Pages/HomePage'
import { Paginator } from './pages/Home/PaginatorRedirect'

const Stack = createNativeStackNavigator()

export default function Router() {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <StatusBar backgroundColor="#000000" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="CarbonFootprintForm" component={CarbonFootprintForm} options={{ headerShown: false }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="HomePaginator" component={Paginator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}

// const styles = StyleSheet.create({
//   container: {},
// })

// const routes = [
//   {
//     path: '/',
//     component: Home,
//   },
//   {
//     path: '/login',
//     component: Login,
//   },
//   {
//     path: '/register',
//     component: Register,
//   },
// ]
