/**
 * Created by ndong on 2017-06-16.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/system/organization',
  timeout: window.global.timeout
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
// =================================   组织管理   ===============================
// 获取组织列表
export const getOrganizationList = params => { return instance.post('getOrganizationList', params) }
// 获取组织机构
export const getOrganizationByEmployeeId = params => { return instance.post('getOrganizationList', params) }
// 添加组织
export const addOrganization = params => { return instance.post('addOrganization', params) }

// 删除组织接口
export const delOrganization = params => { return instance.post('deleteOrganizationByIds', params) }

// 更新组织接口
export const updateOrganization = params => { return instance.post('updateOrganizationById', params) }

