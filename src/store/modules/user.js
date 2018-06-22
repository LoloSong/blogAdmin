import * as types from './types'
import api from '@/api/api'
import { setToken, getToken, removeToken } from '@/utils/auth'
const OK = 0

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    [types.SET_TOKEN] (state, token) {
      state.token = token
    },
    [types.SET_NAME] (state, name) {
      state.name = name
    },
    [types.SET_AVATAR] (state, avatar) {
      state.avatar = avatar
    },
    [types.SET_ROLES] (state, roles) {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    async Login ({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const json = await api.login(username, password)
      if (json.code === OK) {
        setToken(json.data.token)
        commit(types.SET_TOKEN, json.data.token)
      }
      return json
    },

    // 登出
    async LogOut ({commit, state}) {
      commit('SET_TOKEN', '')
      removeToken()
    },

    // 获取用户信息
    async GetInfo ({ commit, state }) {
      const data = await api.getInfo(state.token)
      if (data.code === OK) {
        commit(types.SET_NAME, data.data.name)
        commit(types.SET_AVATAR, data.data.avatar)
        commit(types.SET_ROLES, data.data.roles)
      }
      return data
    }
  }
}

export default user
