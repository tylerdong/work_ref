/**
 * Created by may on 2017/5/23.
 */
/**
 * 库房管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/collect/inventoryManagement',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 库房定义
 */
// 库房定义获取接口
// {"libId":"1730925827421372449"}
export const getStorageById = params => { return instance.post('getStorageById', params) }

// 所有库房计划获取接口
// {"recId":"1730925827421372449"}
export const getAllStorageList = params => { return instance.post('getAllStorageList', params) }

// 库房定义分页获取接口
// {"pageIndex":"1","pageCount":"5"}
export const getStorageList = params => { return instance.post('getStorageList', params) }

// 库房定义添加接口
// {"libName":"库位A","libScapacity":"100","libExistInventory":"10","libStorageId":"1730881972944764962","libRemark":"备注"}
export const addStorage = params => { return instance.post('addStorage', params) }

// 库房定义删除接口
// {"libId":"1730925827421372449"}
export const deleteStorage = params => { return instance.post('deleteStorage', params) }

// 库房定义修改接口
// { "libId":"1730925827421372449","libName":"库位B","libScapacity":"100","libExistInventory":"80","libStorageId":"1730881972944764962","libRemark":"备注测试"}
export const updateStorage = params => { return instance.post('updateStorage', params) }

/**
 * 库位定义
 */
// 库位定义获取接口
// {"libId":"1730925827421372449"}
export const getLibraryById = params => { return instance.post('getLibraryById', params) }

// 所有库位计划获取接口
// {"recId":"1730925827421372449"}
export const getAllLibraryList = params => { return instance.post('getAllLibraryList', params) }

// 库位定义分页获取接口
// {"pageIndex":"1","pageCount":"5"}
export const getLibraryList = params => { return instance.post('getLibraryList', params) }

// 库位定义添加接口
// {"libName":"库位A","libScapacity":"100","libExistInventory":"10","libStorageId":"1730881972944764962","libRemark":"备注"}
export const addLibrary = params => { return instance.post('addLibrary', params) }

// 库位定义删除接口
// {"libId":"1730925827421372449"}
export const deleteLibrary = params => { return instance.post('deleteLibrary', params) }

// 库位定义修改接口
// { "libId":"1730925827421372449","libName":"库位B","libScapacity":"100","libExistInventory":"80","libStorageId":"1730881972944764962","libRemark":"备注测试"}
export const updateLibrary = params => { return instance.post('updateLibrary', params) }

/**
 * 库位计划
 */
// 库位计划获取接口
// {"libId":"1730925827421372449"}
export const getLibraryPlanById = params => { return instance.post('getLibraryPlanById', params) }

// 所有库位计划获取接口
// {"recId":"1730925827421372449"}
export const getAllLibraryPlanList = params => { return instance.post('getAllLibraryPlanList', params) }

// 库位计划分页获取接口
// {"pageIndex":"1","pageCount":"5"}
export const getLibraryPlanList = params => { return instance.post('getLibraryPlanList', params) }

// 库位计划添加接口
// {"libName":"库位A","libScapacity":"100","libExistInventory":"10","libStorageId":"1730881972944764962","libRemark":"备注"}
export const addLibraryPlan = params => { return instance.post('addLibraryPlan', params) }

// 库位计划删除接口
// {"libId":"1730925827421372449"}
export const deleteLibraryPlan = params => { return instance.post('deleteLibraryPlan', params) }

// 库位计划修改接口
// { "libId":"1730925827421372449","libName":"库位B","libScapacity":"100","libExistInventory":"80","libStorageId":"1730881972944764962","libRemark":"备注测试"}
export const updateLibraryPlan = params => { return instance.post('updateLibraryPlan', params) }
