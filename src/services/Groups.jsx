import axios from './Axios'

export const groups = {
  getAll: () => axios.get('/api/groups'),
  getDetail: (id) => axios.get('/api/groups/' + id),
  create: (data) => axios.post('/api/admin/createGroup', data),
  suscribe: (id) => axios.post('api/groups/suscribe/' + id),
  getOwn: () => axios.get('/api/groups/getOwn'),
}
