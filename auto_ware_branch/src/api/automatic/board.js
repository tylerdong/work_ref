/**
 * Created by gelingyan on 2017/6/22.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/board/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 看板
 */
// 看板--报警信息列表
export const getSilkAlarmList = params => { return instance.post('getSilkAlarmList', params) }
export const exceptionBoard = params => { return instance.post('exceptionBoard', params) }
// 看板--报警信息处理
export const updateSilkAlarm = params => { return instance.post('updateSilkAlarm', params) }
// 看板--车间异常看板
export const getExceptionBoard = params => { return instance.post('getExceptionBoard', params) }
// 看板--车间异常看板--获取通知
export const getNotice = params => { return instance.post('getNotice', params) }
// 看板--车间异常看板--设置通知
export const setNotice = params => { return instance.post('setNotice ', params) }
// 看板--车间异常看板--生产计划
export const getProductPlanBoard = params => { return instance.post('getProductPlanBoard', params) }
// 看板--自动生产线
export const getAutomaticPackeBoard = params => { return instance.post('getAutomaticPackeBoard', params) }
