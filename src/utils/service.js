import axios from 'axios'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url, 在config中设置
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

service.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  return config
})

export default service
