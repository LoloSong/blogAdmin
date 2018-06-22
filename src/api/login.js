import service from '@/utils/service'

export default {
  async login (username, password) {
    const data = await service({
      url: '/user/login',
      method: 'post',
      data: {
        username,
        password
      }
    })
    return data.data
  },
  async getInfo (token) {
    const data = await service({
      url: '/user/getInfo',
      method: 'get',
      params: {
        token
      }
    })
    return data.data
  }
}
