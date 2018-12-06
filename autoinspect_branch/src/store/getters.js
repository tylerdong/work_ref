const getters = {
  sidebar: state => state.layout.sidebar,
  appName: state => state.sysConfig.appName,
  appEnrance: state => state.sysConfig.appEnrance,
  factory: state => state.sysConfig.factory,
  workshop: state => state.sysConfig.workshop,
  linename: state => state.sysConfig.linename,
  producttype: state => state.sysConfig.producttype,
  classesnum: state => state.sysConfig.classesnum,
  classPeroid: state => state.sysConfig.classPeroid,
  plConfigs: state => state.sysConfig.plConfigs
}
export default getters
