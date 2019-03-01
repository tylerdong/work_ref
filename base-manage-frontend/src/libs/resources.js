/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-12 10:29:31
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-12 12:34:20
 * @Description: 资源相关权限判断
 */

import store from '@/store'

export const checkElementPermission = (elementFlag) => {
  return store.state.user && store.state.user.resources && store.state.user.resources.includes(elementFlag)
}
