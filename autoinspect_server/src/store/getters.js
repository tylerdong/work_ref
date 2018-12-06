const getters = {
  sidebar: state => state.layout.sidebar,
  appName: state => state.sysConfig.appName,
  appEnrance: state => state.sysConfig.appEnrance,
  token: state => state.user.token
}
export default getters
