import service from '@/utils/service'

export default {
  async getArticleList ({page, limit}) {
    const data = await service({
      url: '/article/getArticleList',
      method: 'get',
      params: {
        page,
        limit
      }
    })
    return data.data
  },
  async getOneArticle (articleID) {
    const data = await service({
      url: '/article/getOneArticle',
      method: 'get',
      params: {
        articleID
      }
    })
    return data.data
  },
  async createArticle (parmas) {
    const data = await service({
      url: '/article/createArticle',
      method: 'post',
      data: parmas
    })
    return data.data
  },
  async deleteArticle (articleID) {
    const data = await service({
      url: '/article/deleteArticle',
      method: 'post',
      data: {
        articleID
      }
    })
    return data.data
  },
  async editArticle (parmas) {
    const data = await service({
      url: '/article/editArticle',
      method: 'post',
      data: parmas
    })
    return data.data
  }
}
