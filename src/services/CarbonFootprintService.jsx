import axios from './Axios'

export const carbonFootprint = {
  calculate: (data) => axios.post('/api/carbonFootprint/calculation', data),
  getHomePageInfo: () => axios.get('/api/carbonFootprint/homePageInfo'),
}
