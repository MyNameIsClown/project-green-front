import axios from 'axios'
import { interceptorErros, interceptorSuccess } from './interceptors'
import * as Constants from '../../constants'
import * as SecureStore from '../util/SecureStore'

const axiosInstance = axios.create({
  baseURL: Constants.REMOTE_URI,
  headers: {
    // 'Accept-Language': 'es',
    Accept: 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await SecureStore.getValueFor('token')
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
    } catch (error) {
      console.log(error)
    }

    return config
  },
  (error) => Promise.reject(error),
)

axiosInstance.interceptors.response.use(interceptorSuccess, interceptorErros)

export default axiosInstance
