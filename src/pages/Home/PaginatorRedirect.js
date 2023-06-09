import React from 'react'
import { Platform } from 'react-native'
import { MobileHomePaginator } from './MobileHomePaginator'
import { WebHomePaginator } from './WebHomePaginator'

const isWeb = Platform.OS === 'web'

export const Paginator = ({ route, navigation }) => {
  const { data } = route.params
  return isWeb ? <WebHomePaginator data={data} navigation={navigation} /> : <MobileHomePaginator data={data} navigation={navigation} />
}
