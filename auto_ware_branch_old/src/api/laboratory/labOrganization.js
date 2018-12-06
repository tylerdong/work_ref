/* 信息权限管理 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/labOrganization',
  timeout: window.global.timeout
})

// 获取权限信息列表
export const getLabOrganizationList = params => {
  return instance.post('getLabOrganizationList', params)
}

// 通过上级部门获取子部门
export const getChildOrganizationList = params => {
  return instance.post('getChildOrganizationList', params)
}

// 通过账号Id获取所属组织信息
export const getOrganizationByUserId = params => {
  return instance.post('getOrganizationByUserId', params)
}

// 通过组织Id获取所属组织信息
export const getOrganizationByOrganizationId = params => {
  return instance.post('getOrganizationByOrganizationId', params)
}

// 通过账户Id获取工段下拉列表
export const getOrganizationPrivilegeByUserId = params => {
  return instance.post('getOrganizationPrivilegeByUserId', params)
}

// 修改配置权限
export const updateLabOrganizationById = params => {
  return instance.post('updateLabOrganizationById', params)
}
