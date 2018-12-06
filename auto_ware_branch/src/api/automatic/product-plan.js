/**
 * Created by gelingyan on 2017/6/8.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/productionPlan/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 产品基础信息
 */
// 线别信息-列表
export const getLine = params => { return instance.post('getLineList', params) }
// 线别信息-新增
export const addLine = params => { return instance.post('addLine', params) }
// 线别信息-修改
export const updateLine = params => { return instance.post('updateLine', params) }
// 线别信息-校验线别
export const checkLineName = params => { return instance.post('checkLineName', params) }
// 线别信息--集合{ workShopId: '' }
export const getAllLine = params => { return instance.post('getAllLineList', params) }

// 生产计划管理-列表
export const getPlan = params => { return instance.post('getProductionPlanList', params) }
// 生产计划管理-新增
export const addPlan = params => { return instance.post('addProductionPlan', params) }
// 生产计划管理-修改
export const updatePlan = params => { return instance.post('updateProductionPlan', params) }
// 生产计划管理-删除
// export const delPlan = params => { return instance.post('delProductionPlan', params) }
// 生产计划管理--集合--扩展
// export const getAllPlan = params => { return instance.post('getAllProductionPlanList', params) }
// 生产计划管理--查看--扩展
// export const getPlanById = params => { return instance.post('getProductionPlanById', params) }
// 生产计划管理--查看--扩展
export const executePlan = params => { return instance.post('executeProductionPlan', params) }
// 生产计划管理--查看
export const showPlan = params => { return instance.post('getProductionPlanDetailListByProductionPlanId', params) }
// 生产计划管理--查看
export const itemDetail = params => { return instance.post('executeProductionPlanDetail', params) }
