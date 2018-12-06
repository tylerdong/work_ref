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
// 查询打印顺序
export const getDoffRuleGroupInfo = params => { return instance.post('doffRuleGroup/getDoffRuleGroupInfo', params) }
// 新增打印顺序
export const addDoffRuleGroupInfo = params => { return instance.post('doffRuleGroup/addDoffRuleGroupInfo', params) }
// 获取卷绕头数
export const getProductionMachineInfo = params => { return instance.post('doffRuleGroup/getProductionMachineInfo', params) }
// 更新打印顺序
export const updateDoffRuleInfo = params => { return instance.post('doffRuleGroup/updateDoffRuleInfo', params) }
// 获取打印顺序
export const getDoffRuleInfo = params => { return instance.post('doffRuleGroup/getDoffRuleInfo', params) }
// 删除打印顺序
export const delectDoffRuleGroupInfo = params => { return instance.post('doffRuleGroup/delectDoffRuleGroupInfo', params) }
// 判断是否合法crontab字符串
export const isValidCrontabExpression = params => { return instance.post('util/isValidCrontabExpression', params) }
/* -------------------------------------工厂配置-------------------------------------- */
// 获取工厂配置
export const selectFactory = pararms => { return instance.post('factory/selectFactory', pararms) }
// 编辑工厂配置
export const updateFactory = pararms => { return instance.post('factory/updateFactory', pararms) }
