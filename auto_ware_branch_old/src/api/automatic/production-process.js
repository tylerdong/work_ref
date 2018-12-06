/**
 * Created by shoung on 2017/10/14.
 */
/* 产品工艺流程 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/productionProcess/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

// 获取工艺ID
export const getProcessIdByNumber = params => { return instance.post('getProcessIdByNumber', params) }
// 获取工艺品种
export const getAllProductProcessList = params => { return instance.post('getAllProductProcessList', params) }
// 获取选中工艺丝锭信息
export const getSilkCarStatusHistoryInfo = params => { return instance.post('getSilkCarStatusHistoryInfo', params) }
/**
 * 染判
 */
// 提交染判丝车结果
export const commitSentenceProcess = params => { return instance.post('commitSentenceProcess', params) }
// 批量提交染判丝车结果
export const commitSentenceProcessList = params => { return instance.post('commitSentenceProcessList', params) }
// 获取已染判丝车列表
export const getSentencedProcessSilkCarList = params => { return instance.post('getSentencedProcessSilkCarList', params) }
// 获取待染判丝车列表
export const getToSentenceProcessSilkCarList = params => { return instance.post('getToSentenceProcessSilkCarList', params) }
/**
 * 物检
 */
// 根据丝车号获取物检操作列表
export const silkcarWaitCheckList = params => { return instance.post('silkcarWaitCheckList', params) }
// 根据丝车号获取物检备注列表
export const silkcarWait = params => { return instance.post('silkcarWait', params) }
// 提交备注
export const silkCheckResult = params => { return instance.post('silkCheckResult', params) }
// 根据丝车号获取丝锭列表
export const getSpindleBySilkcarCode = params => { return instance.post('getSpindleBySilkcarCode', params) }
// 以丝车为单位提交降等
export const checkSilkcar = params => { return instance.post('checkSilkcar', params) }
// 创建暂存箱
export const createTemporaryBox = params => { return instance.post('createTemporaryBox', params) }
// 校验暂存箱号
export const checkTemporaryBoxNum = params => { return instance.post('checkTemporaryBoxNum', params) }
// 分页获取暂存箱列表
export const getTemporaryBoxList = params => { return instance.post('getTemporaryBoxList', params) }
// 模糊查询库位
export const getStorageIdCodeByLikeCode = params => { return instance.post('getStorageIdCodeByLikeCode', params) }
// 获取所有库存地点
export const getLgortList = params => { return instance.post('getLgortList', params) }
