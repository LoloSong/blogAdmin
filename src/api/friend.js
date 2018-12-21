import service from '@/utils/service'

export default {
  async getfriend () {
    const data = await service({
      url: '/friend/getFriend',
      method: 'get'
    })
    return data.data
  },
  async addFriend (params) {
    const data = await service({
      url: '/friend/addFriend',
      method: 'post',
      data: params
    })
    return data.data
  },
  async editFriend (params) {
    const data = await service({
      url: '/friend/editFriend',
      method: 'post',
      data: params
    })
    return data.data
  },
  async deleteFriend (id) {
    const data = await service({
      url: '/friend/deleteFriend',
      method: 'post',
      data: {
        id
      }
    })
    return data.data
  }
}
