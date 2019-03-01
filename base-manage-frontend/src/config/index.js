export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://192.168.36.110:9010/base',
    // dev: 'http://192.168.31.27:8030',
    // dev: 'http://192.168.31.37:9010/base', // 鲁鲁
    devtest:
    // 'http://192.168.36.109:8300/mock/5c208d8a3c08bc00219c9d08/sso_manager',
    'http://192.168.36.110:9010/base',
    pro:
      'http://192.168.36.110:9010/base/task'
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    // 'error-store': {
    //   showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
    //   developmentOff: false // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    // }
  }
}
