import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/employee',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

/**
 * 人员信息管理
 */
// 人员信息模板下载
export const downloadEmployeeTemplet = params => { return instance.post('downloadEmployeeTemplet', params) }
// 人员信息模板导入
export const addEmployeeByExcel = params => { return instance.post('addEmployeeByExcel', params) }
// 人员信息获取接口
export const getEmployeeById = params => { return instance.post('getEmployeeById', params) }

// 所有人员信息获取接口
export const getAllEmployeeList = params => { return instance.post('getAllEmployeeList', params) }

// 分页查询人员信息
// 请求参数{"pageIndex":"1","workshopId":"车间id","pageCount":"3"}
export const getEmployeeList = params => { return instance.post('getEmployeeList', params) }

// 人员信息添加接口
export const addEmployee = params => { return instance.post('addEmployee', params) }

// 人员信息删除接口
export const deleteEmployee = params => { return instance.post('deleteEmployee', params) }

// 人员信息修改接口
export const updateEmployee = params => { return instance.post('updateEmployee', params) }

/**
 * 班次管理
 */

// 分页查询排班信息
export const getSchedulingList = params => { return instance.post('getSchedulingList', params) }

// 排班信息添加接口
export const addScheduling = params => { return instance.post('addScheduling', params) }

// 排班信息删除接口
export const deleteScheduling = params => { return instance.post('deleteScheduling', params) }

// 排班信息修改接口
export const updateScheduling = params => { return instance.post('updateScheduling', params) }

/**
 * 打卡记录管理
 */
// 打卡信息分页获取接口
export const getPunchRecordList = params => { return instance.post('getPunchRecordList', params) }

/**
 * 班组管理
 */
// 分页查询班组信息
export const getGroupList = params => { return instance.post('getGroupList', params) }

// 班组信息添加接口
export const addGroup = params => { return instance.post('addGroup', params) }

// 班组信息删除接口
export const deleteGroup = params => { return instance.post('deleteGroup', params) }

// 班组信息修改接口
export const updateGroup = params => { return instance.post('updateGroup', params) }

// 通过车间id获取分组人员信息
export const getEmployeeWithoutGroupListByworkshopIdAndGroupId = params => { return instance.post('getEmployeeWithoutGroupListByworkshopIdAndGroupId', params) }

// 通过班组id获取分组人员信息
export const getGroupListByWorkshopId = params => { return instance.post('getGroupListByWorkshopId', params) }

// 通过班次id获取分组人员信息
export const getEmployeeListByGroupId = params => { return instance.post('getEmployeeListByGroupId', params) }

/**
 * 校验
 */
// 校验人员编号
export const checkEmployeeNumber = params => { return instance.post('checkEmployeeNumber', params) }

// 校验班组名称
export const checkGroupName = params => { return instance.post('checkGroupName', params) }
