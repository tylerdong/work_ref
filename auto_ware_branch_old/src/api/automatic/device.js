/**
 * 设备管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/device',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

/**
 * 机台档案
 */

// 获取机台列表
export const getProductionMachineList = params => { return instance.post('getProductionMachineList', params) }

// 添加
export const addProductionMachine = params => { return instance.post('addProductionMachine', params) }

// 修改
export const updateProductionMachine = params => { return instance.post('updateProductionMachine', params) }

//  机台位号唯一性检查
export const checkProductionMachineItem = params => { return instance.post('checkProductionMachineItem', params) }
//  机台名称唯一性检查
export const checkProductionMachineName = params => { return instance.post('checkProductionMachineName', params) }
//  机台编号唯一性检查
export const checkProductionMachineNumber = params => { return instance.post('checkProductionMachineNumber', params) }

/**
 * 丝车管理
 */

// 获取丝车列表
export const getSilkCarList = params => { return instance.post('getSilkCarList', params) }

// 添加
export const addSilkCar = params => { return instance.post('addSilkCar', params) }

// 修改
export const updateSilkCar = params => { return instance.post('updateSilkCar', params) }
//  丝车编号唯一性检查
export const checkSilkCarNumber = params => { return instance.post('checkSilkCarNumber', params) }
// 丝车条码唯一性检查
export const checkSilkCarCode = params => { return instance.post('checkSilkCarCode', params) }
// 模糊查询丝车编号
export const fuzzySearchSilkCarNumber = params => { return instance.post('fuzzySearchSilkCarNumber', params) }
/**
 * 叉车管理
 */

// 获取叉车列表
export const getForkliftList = params => { return instance.post('getForkliftList', params) }

// 添加
export const addForklift = params => { return instance.post('addForklift', params) }

// 修改
export const updateForklift = params => { return instance.post('updateForklift', params) }
//  叉车编号唯一性检查
export const checkForkliftNumber = params => { return instance.post('checkForkliftNumber', params) }
