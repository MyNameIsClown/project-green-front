import axios from './Axios'

export const user = {
  logIn: (data) => axios.post('/api/users/login', data),
  register: (data) => axios.post('/api/users/register', data)
}
