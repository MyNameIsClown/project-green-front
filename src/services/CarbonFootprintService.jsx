import axios from './Axios'

export const carbonFootprint = {
  calculate: (data) => axios.post('/api/carbonFootprint/calculation', data),
  getHomePageInfo: () => axios.get('/api/carbonFootprint/homePageInfo'),
  getAll: () => axios.get('/api/carbonFootprint/getAll'),
  getOne: (id) => axios.get('/api/carbonFootprint/getById/' + id),
}
