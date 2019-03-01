import axios from '@/libs/api.request'
/**
 * 获取所有系统
 * @param {*} query
 */
export function getAllSystem (query) {
  return axios.request({
    url: '/authority/controller/system/getAllSystem',
    method: 'post',
    data: query
  })
}
/**
 * 获取系统下角色
 * @param {*} query
 */
export function getRolesTreeBySystemId (query) {
  return axios.request({
    url: '/authority/controller/role/getRoles',
    method: 'get',
    params: query
  })
}
/**
 * 增加角色
 * @param {*} query
 */
export function addRole (query) {
  return axios.request({
    url: '/authority/controller/role/addRole',
    method: 'post',
    data: query
  })
}
/**
 * 关联角色
 * @param {*} query
 */
export function ajaxGetMenuBySystemId (query) {
  return axios.request({
    url: '/authority/controller/role/getRoleMenuReByRoleId',
    method: 'get',
    params: query
  })
}
/**
 * 角色关联元素
 * @param {*} query
 */
export function ajaxGetElementBySystemId (query) {
  return axios.request({
    url: '/authority/controller/role/getRoleResourceReByRoleId',
    method: 'get',
    params: query
  })
}
/**
 * 删除角色
 * @param {*} query
 */
export function delRoleGroup (query) {
  return axios.request({
    url: '/authority/controller/role/deleteRole',
    method: 'get',
    params: query
  })
}
/**
 * 修改角色
 * @param {*} query
 */
export function putRoleGroup (query) {
  return axios.request({
    url: '/authority/controller/role/updateRole',
    method: 'post',
    data: query
  })
}

/**
 * 获取节点的相关信息
 * @param {*} query
 */
export function getPageElement (query) {
  return axios.request({
    url: '/authority/controller/resource/getResourceByMenuId',
    method: 'get',
    params: query
  })
}
/**
 * 更新菜单角色关联
 * @param {*} query
 */
export function updateRoleMenuRe (query) {
  return axios.request({
    url: '/authority/controller/role/updateRoleMenuRe',
    method: 'post',
    data: query
  })
}
export function updateRoleResourceReByRoleId(data) {
  return axios.request({
    url: '/authority/controller/role/updateRoleResourceReByRoleId',
    method: 'post',
    data: data
  })
}
export function getResourceByRoleIdAndMenuId(query) {
  return axios.request({
    url: '/authority/controller/resource/getResourceByRoleIdAndMenuId',
    method: 'get',
    params: query
  })
}
export function getSystemRoleByUserId(query) {
  return axios.request({
    url: '/authority/controller/system/getSystemRoleByUserId',
    method: 'get',
    params: query
  })
}
export function updateUserRoleReByUserId(data) {
  return axios.request({
    url: '/authority/controller/user/updateUserRoleReByUserId',
    method: 'post',
    data: data
  })
}
export default {
  getAllSystem,
  getRolesTreeBySystemId,
  addRole,
  ajaxGetMenuBySystemId,
  ajaxGetElementBySystemId,
  delRoleGroup,
  putRoleGroup,
  getPageElement,
  updateRoleMenuRe,
  updateRoleResourceReByRoleId,
  getResourceByRoleIdAndMenuId
}
