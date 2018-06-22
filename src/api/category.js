import service from '@/utils/service'

export default {
  async getcategory () {
    const data = await service({
      url: '/category/getCategory',
      method: 'get'
    })
    return data.data
  },
  async addCategory (category) {
    const data = await service({
      url: '/category/addCategory',
      method: 'post',
      data: {
        category
      }
    })
    return data.data
  },
  async deleteCategory (categoryID) {
    const data = await service({
      url: '/category/deleteCategory',
      method: 'post',
      data: {
        categoryID
      }
    })
    return data.data
  },
  async editCategory (categoryID, category) {
    const data = await service({
      url: '/category/editCategory',
      method: 'post',
      data: {
        categoryID,
        category: category
      }
    })
    return data.data
  }
}
