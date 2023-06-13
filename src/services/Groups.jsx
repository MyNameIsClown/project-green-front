import axios from './Axios'

export const groups = {
  getAll: () => axios.get('/api/groups'),
  getDetail: (id) => axios.get('/api/groups/' + id),
  create: (data) => axios.post('/api/groups/createGroup', data),
  suscribe: (id) => axios.post('api/groups/suscribe/' + id),
  unsubscribe: (id) => axios.delete('api/groups/unsubscribe/' + id),
  getOwn: () => axios.get('/api/groups/getOwn'),
  deleteUserFromGroup: (groupId, username) => axios.delete('/api/groups/'+groupId+'/'+username) 
}
