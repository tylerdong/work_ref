/* 二期实验室-数据采集
 *  */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/report/labDeviceManagementController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 二期数据采集/设备管理/新增设备
export const createLabDeviceManagementDo = params => {
  return instance.post('createLabDeviceManagementDo', params)
}

// 二期数据采集/设备管理/编辑设备
export const updateLabDeviceManagementDo = params => {
  return instance.post('updateLabDeviceManagementDo', params)
}

// 二期数据采集/设备管理/获取设备数据列表
export const getLabDeviceManagementDoList = params => {
  return instance.post('getLabDeviceManagementDoList', params)
}

// 二期数据采集/设备管理/删除设备
export const deleteLabDeviceManagementDo = params => {
  return instance.post('deleteLabDeviceManagementDo', params)
}

