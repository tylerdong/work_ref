/**
 * Created by gelingyan on 2017/6/19.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/barCode/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 计量打印
 */
// 计量打印-待打印:1、未打印:2
export const getPrintList = params => { return instance.post('getBoxCodeListByBatchNoAndPrintFlag', params) }
// 计量打印-打印
export const printBoxCode = params => { return instance.post('printBoxCode', params) }
