import articleAPI from './article'
import categoryAPI from './category'
import loginAPI from './login'
import friendAPI from './friend'

export default {
  ...loginAPI,
  ...articleAPI,
  ...categoryAPI,
  ...friendAPI
}
