/**
 * 仪器管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/instrument',
  timeout: window.global.timeout
})

// 查询仪器名称
export const getInstrumentNameListByInstrumentName = params => {
  return instance.post('getInstrumentNameListByInstrumentName', params)
}

// 查询仪器型号
export const getInstrumentVersionListByInstrumentVersion = params => {
  return instance.post('getInstrumentVersionListByInstrumentVersion', params)
}

// 获取仪器编号列表
export const getInstrumentVersionListByCondition = params => {
  return instance.post('getInstrumentVersionListByCondition', params)
}

// 获取仪器台帐列表
export const getInstrumentList = params => {
  return instance.post('getInstrumentList', params)
}

// 仪器台帐 -- 新增仪器
export const addInstrument = params => {
  return instance.post('addInstrument', params)
}

// 仪器台帐 -- 修改仪器
export const updateInstrumentById = params => {
  return instance.post('updateInstrumentById', params)
}

// 仪器台帐 -- 检测出厂编号是否重复
export const checkFactoryIdByFactoryId = params => {
  return instance.post('checkFactoryIdByFactoryId', params)
}

// 仪器台帐 -- 维修
export const addMaintainRecord = params => {
  return instance.post('addMaintainRecord', params)
}

// 仪器台帐 -- 校准
export const addAdjustingRecord = params => {
  return instance.post('addAdjustingRecord', params)
}

// 仪器台帐 -- 报废
export const addScrapRecord = params => {
  return instance.post('addScrapRecord', params)
}

// 仪器台帐 -- 报废 -- 获取使用年限
export const getAgeByScrapDate = params => {
  return instance.post('getAgeByScrapDate', params)
}

/* 仪器维修 */

// 获取仪器维修列表
export const getMaintainRecordList = params => {
  return instance.post('getMaintainRecordList', params)
}

// 删除维修记录
export const deleteMaintainRecordByOperationId = params => {
  return instance.post('deleteMaintainRecordByOperationId', params)
}

// 修改待维修记录
export const updateMaintainStatusByOperationId = params => {
  return instance.post('updateMaintainStatusByOperationId', params)
}

/* 报废管理 */

// 获取报废列表
export const getScrapRecordList = params => {
  return instance.post('getScrapRecordList', params)
}

/* 查看仪器 */

// 获取查看维修记录
export const getMaintainRecordListByInstrumentId = params => {
  return instance.post('getMaintainRecordListByInstrumentId', params)
}

// 获取查看仪器备件
export const getInstrumentListByInstrumentVersion = params => {
  return instance.post('getInstrumentListByInstrumentVersion', params)
}

// 获取查看校准记录
export const getAdjustingRecordListByInstrumentId = params => {
  return instance.post('getAdjustingRecordListByInstrumentId', params)
}

// 校准记录 -- 列表
export const getAdjustingRecordList = params => {
  return instance.post('getAdjustingRecordList', params)
}

// 校准记录 -- 删除
export const deleteAdjustingRecordByOperationId = params => {
  return instance.post('deleteAdjustingRecordByOperationId', params)
}

// 获取仪器基本信息
export const getInstrumentInfoById = params => {
  return instance.post('getInstrumentInfoById', params)
}
