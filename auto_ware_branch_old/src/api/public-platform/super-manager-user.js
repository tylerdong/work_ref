/**
 * Created by gly on 2017/4/26.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/system/subSystem',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

// =================================   子系统管理   ===============================
// 查询子系统列表
export const getSubSystemList = params => { return instance.post('getSubSystemList', params) }

// 添加子系统
//   {"name":"", "code":"", "describe":""}
export const addSubSystem = params => { return instance.post('addSubSystem', params) }

// 修改子系统
//   {"id":"", "name":"", "code":"", "describe":""}
export const modifySubSystem = params => { return instance.post('updateSubSystemById', params) }

// 删除子系统
//   [{"id":""},{"id":""}]
export const delSubSystemList = params => { return instance.post('deleteSubSystemByIds', params) }

