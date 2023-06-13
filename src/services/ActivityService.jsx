import axios from './Axios'

export const activity = {
  create: (data) => axios.post('/api/activity/create', data),
  getDetail: (id) => axios.get('/api/activity/' + id),
  getActivitiesJoined: (id) => axios.get('/api/activity/getInvitations'),
  getDetailJoin: (id) => axios.get('/api/activity/basic/' + id),
  join: (id) => axios.post('/api/activity/join/' + id),
  deleteJoin: (id) => axios.delete('/api/activity/join/' + id),
}
