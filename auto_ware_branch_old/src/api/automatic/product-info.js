/**
 * Created by gelingyan on 2017/6/8.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/productInfo/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 产品基础信息
 */
// 降等原因根据所属工种查询-列表
export const getDownGrade = params => { return instance.post('getDownGradeReasonCanByWorkTypeId', params) }
// 降等原因管理-新增
export const addDownReason = params => { return instance.post('addDownGradeReason', params) }
// 降等原因管理-修改
export const updateDownReason = params => { return instance.post('updateDownGradeReason', params) }
// 降等原因--校验降等原因
export const checkDownGradeReasonName = params => { return instance.post('checkDownGradeReasonName', params) }
// 降等原因--校验降等编号
export const checkDownGradeReasonNumber = params => { return instance.post('checkDownGradeReasonNumber', params) }

// 异常等级设置 -- 列表
export const getUnusualGrageSetList = params => { return instance.post('getExceptionInfoList', params) }
// 异常等级设置 -- 新增
export const addExceptionInfo = params => { return instance.post('addExceptionInfo', params) }
// 异常等级设置 -- 更新
export const updateExceptionInfo = params => { return instance.post('updateExceptionInfo', params) }
// 异常等级设置 -- 获取所有数据
export const getAllExceptionInfoList = params => { return instance.post('getAllExceptionInfoList', params) }

