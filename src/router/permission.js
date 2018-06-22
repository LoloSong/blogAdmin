import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/utils/auth'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    // 有token时
    if (to.path === '/login') {
      next({path: '/'})
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then((res) => {
          const roles = res.data.roles
          // 根据roles权限生成可访问的路由表
          store.dispatch('GenerateRoutes', roles).then((res) => {
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
            NProgress.done()
          })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有token时候
    if (whiteList.indexOf(to.path) !== -1) {
      next()
      NProgress.done()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
