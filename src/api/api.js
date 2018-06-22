import articleAPI from './article'
import categoryAPI from './category'
import loginAPI from './login'

export default {
  ...loginAPI,
  ...articleAPI,
  ...categoryAPI
}
