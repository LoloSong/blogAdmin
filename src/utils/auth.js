import store from '@/store'

export let getToken = () => {
  return localStorage.getItem('token')
}

export let setToken = (token) => {
  localStorage.setItem('token', token)
}

export let removeToken = () => {
  localStorage.removeItem('token')
}

export let auth = (auth) => {
  const roles = store.getters && store.getters.roles
  if (auth && auth instanceof Array && auth.length > 0) {
    const permissionRoles = auth
    const hasPermission = roles.some(role => {
      return permissionRoles.includes(role)
    })
    if (!hasPermission) {
      return false
    } else {
      return true
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}
