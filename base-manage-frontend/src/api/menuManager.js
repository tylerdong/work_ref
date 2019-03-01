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
 * 获取菜单树
 * @param {*} query
 */
export function ajaxGetMenuBySystemId (query) {
  return axios.request({
    url: '/authority/controller/menu/getMenuVosBySystemId',
    method: 'get',
    params: query
  })
}
/**
 * 创建菜单
 * @param {*} query
 */
export function createMenu (query) {
  return axios.request({
    url: '/authority/controller/menu/addMenu',
    method: 'post',
    data: query
  })
}
/**
 * 修改菜单
 * @param {*} query
 */
export function putMenu (query) {
  return axios.request({
    url: '/authority/controller/menu/updateMenuOrder',
    method: 'post',
    data: query
  })
}
/**
 * 删除菜单
 * @param {*} query
 */
export function delMenu (query) {
  return axios.request({
    url: '/authority/controller/menu/deleteMenu',
    method: 'get',
    params: query
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
 * 新增资源
 * @param {*} query
 */
export function createElement (query) {
  return axios.request({
    url: '/authority/controller/resource/addResource',
    method: 'post',
    data: query
  })
}
/**
 * 修改资源
 * @param {*} query
 */
export function putElement (query) {
  return axios.request({
    url: '/authority/controller/resource/updateResource',
    method: 'post',
    data: query
  })
}
/**
 * 删除资源
 * @param {*} query
 */
export function delElement (query) {
  return axios.request({
    url: '/authority/controller/resource/deleteResource',
    method: 'post',
    data: query
  })
}

export default{getAllSystem, ajaxGetMenuBySystemId, getPageElement, createMenu, putMenu, delMenu, createElement, putElement, delElement}
