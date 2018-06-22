import * as types from './types'
import { constantRouter, asyncRouter } from '@/router'

const permission = {
  state: {
    routers: constantRouter,
    addRouters: []
  },
  mutations: {
    [types.SET_ROUTES] (state, routers) {
      state.addRouters = routers
      state.routers = constantRouter.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, roles) {
      let accessedRouters
      accessedRouters = filterAsyncRouter(asyncRouter, roles)
      commit(types.SET_ROUTES, accessedRouters)
      return accessedRouters
    }
  }
}

// 递归过滤异步路由表, 返回符合用户角色的路由表
function filterAsyncRouter (asyncRouter, roles) {
  return asyncRouter.filter((route) => {
    if (hasPermission(route, roles)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    } else {
      return false
    }
  })
}

// 通过meta.roles判断是否与当前用户权限匹配
function hasPermission (route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      return route.meta.roles.indexOf(role) >= 0
    })
  } else {
    return true
  }
}

export default permission
