/**
 * Created by shoung on 2017/6/30.
 */
/* 无baseUrl */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 物检
 */
// 根据工艺ID工种ID获取异常原因
export const getDownGradeReasonList = params => { return instance.post('productionExcption/getDownGradeReasonList', params) }
// 以丝锭为单位提交降等信息
export const checkSilkAbnormal = params => { return instance.post('productionExcption/checkSilkAbnormal', params) }
