/**
 * 普通用户
 * Created by Administrator on 2017/3/24.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxPublicPlatformBaseUrl + 'api/system/user',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

// 登录用户
// 请求参数: account: ,password: , verCode:
export const login = params => {
  return instance.post('login', params)
}

// 获取验证码
export const getVerCode = params => {
  return instance.post('getVerCode', params)
}

// 注册用户
// 请求参数：
export const normalRegister = params => {
  return instance.post('register', params)
}

// 更新用户
// 请求参数：accessToken: '', userId:用户id, name:用户名, address：地址, email：'', workPosition:职位
export const normalUpdate = params => {
  return instance.post('updateUser', params)
}

// 检验旧密码
// 请求参数：ccessToken: ,userId: 用户id, password:用户新密码
export const normalOldPassword = params => {
  return instance.post('checkPassword', params)
}

// 更新密码
// 请求参数：accessToken: , userId: 用户id, password:用户新密码
// export const normalUpdatePassword = params => {
//   return instance.post('updateUserPassword', params)
// }
// 6月28日：普通用户修改密码接口地址修改
export const normalUpdatePassword = params => {
  return instance.post('updatePasswordByUserId', params)
}

// 用户详情
// 请求参数：accessToken: , userId: 用户id, password:用户新密码
export const UserDetail = params => {
  return instance.post('getUserDetailById', params)
}

// 获取角色列表（无分页）
export const getRoleListByNoPage = params => {
  return instance.post('getRoleListByNoPage', params)
}

// 当前用户  所拥有的角色
export const getListUserRoleMap = params => { return instance.post('getUserRoleMapList', params) }

// 所有的角色
export const getListAllRole = params => { return instance.post('getRoleListByNoPage', params) }

// 当前用户  添加角色
export const addUserRoleMap = params => { return instance.post('addUserRoleMap', params) }

// 当前用户  删除角色
export const deleteUserRoleMapByUserId = params => { return instance.post('deleteUserRoleMapByUserId', params) }

// 获取 用户列表接口（无分页）
export const getUserListByNoPage = params => { return instance.post('getUserListByUnBinding', params) }

// 获取自动化工种信息
export const getWorkTypeById = params => { return instance.post('getWorkTypeById', params) }

