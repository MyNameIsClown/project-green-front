import AsyncStorage from '@react-native-async-storage/async-storage'

export function save(key, value) {
  AsyncStorage.setItem(key, value)
}

export async function getValueFor(key) {
  const result = await AsyncStorage.getItem(key).then((value) => {
    return value
  })
  return result ?? { Err: 'Token not found' }
}
