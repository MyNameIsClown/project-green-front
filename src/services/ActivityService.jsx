import axios from './Axios'

export const activity = {
  create: (data) => axios.post('/api/activity/create', data),
  getDetail: (id) => axios.get('/api/activity/' + id),
  getActivitiesJoined: (id) => axios.get('/api/activity/getInvitations'),
  getDetailJoin: (id) => axios.get('/api/activity/basic/' + id),
  join: (id) => axios.post('/api/activity/join/' + id),
  deleteJoin: (id) => axios.delete('/api/activity/join/' + id),

  deleteJoinOfUser: (id, username) => axios.delete('/api/activity/join/' + id + '/'+username),
  start: (id) => axios.post('/api/activity/start/' + id ),
  cancel: (id) => axios.post('/api/activity/cancel/' + id ),
  finish: (id) => axios.post('/api/activity/finish/' + id ),

  updatePresence: (id, username) => axios.post('/api/activity/updatePresence/'+id+'/'+username)
}
