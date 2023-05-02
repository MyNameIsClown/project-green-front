import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

const Stack = createNativeStackNavigator()

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

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
