import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { View, Platform } from 'react-native'
import Login from './pages/Login'
import { StatusBar } from 'expo-status-bar'
import Register from './pages/Register'
import CarbonFootprintForm from './pages/CarbonFootprintForm'
import Constants from 'expo-constants'
import HomePage from './pages/Home/Pages/HomePage'
import { Paginator } from './pages/Home/PaginatorRedirect'
import CalculationIntro from './pages/CarbonFootprintIntroductionCalc'
import CarbonFootprintDetail from './pages/Home/Pages/detail/CarbonFootprintDetail'
import GroupDetailPage from './pages/Home/Pages/detail/GroupDetailPage'
import CreateGroup from './pages/Home/Pages/CreateGroupForm'
import ManageGroup from './pages/Home/Pages/ManageGroup'
import ActivityDetail from './pages/Home/Pages/detail/ActivityDetail'
import ActivityDetailJoin from './pages/Home/Pages/detail/ActivityDetailJoin'
import ChangePassword from './pages/Home/Pages/ChangePasswordPage'
import TermsAndConditionsScreen from './pages/TermsAndConditionsPage'
import LandingPage from './pages/LandingPage'

const Stack = createNativeStackNavigator()
const isWeb = Platform.OS === 'web'

export default function Router() {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
      <StatusBar backgroundColor="#000000" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isWeb ? "Landing" :"Login"}>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Landing" component={LandingPage} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="CarbonFootprintForm" component={CarbonFootprintForm} options={{ headerShown: isWeb, title: 'Calculadora' }} />
          <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
          <Stack.Screen name="HomePaginator" component={Paginator} options={{ headerShown: false }} />
          <Stack.Screen name="CalculationIntro" component={CalculationIntro} options={{ headerShown: true, title: 'Introduction' }} />
          <Stack.Screen name="CarbonFootprintDetail" component={CarbonFootprintDetail} options={{ headerShown: true, title: 'Detail' }} />
          <Stack.Screen name="GroupDetails" component={GroupDetailPage} options={{ headerShown: true, title: 'Detail' }} />
          <Stack.Screen name="CreateGroup" component={CreateGroup} options={{ headerShown: true, title: 'Create group' }} />
          <Stack.Screen name="ManageGroup" component={ManageGroup} options={{ headerShown: true, title: 'Manage group' }} />
          <Stack.Screen name="ActivityDetail" component={ActivityDetail} options={{ headerShown: true, title: 'Activity info' }} />
          <Stack.Screen name="ActivityDetailJoin" component={ActivityDetailJoin} options={{ headerShown: true, title: 'Join activity' }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ headerShown: true, title: 'ChangePassword' }} />
          <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ headerShown: true, title: 'Terms & Conditions' }} />
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
