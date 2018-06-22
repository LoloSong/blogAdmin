const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  avatar: state => state.user.avatar,
  roles: state => state.user.roles,
  addRoutes: state => state.permission.addRouters,
  routers: state => state.permission.routers
}

export default getters
