/* 报警管理 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxDataAnalysisBaseUrl + 'da/controller',
  timeout: window.global.timeout
})

// 获取组织机构
export const getOrganizationList = params => { return instance.post('dataDictionary/getOrganizationList', params) }
// 获取车间
export const getWorkShopListByOrgId = params => { return instance.post('dataDictionary/getWorkShopListByOrgId', params) }
// 线别
export const getLineListByWorId = params => { return instance.post('dataDictionary/getLineListByWorId', params) }
export const getKpiDimensionInfo = pararms => { return instance.post('kpitypedimension/getKpiDimensionInfo', pararms) }
// 修改kpi
export const updateKpiRule = pararms => { return instance.post('kpiconfigrule/updateKpiRule', pararms) }
// 获取kpi
export const addKpiRule = pararms => { return instance.post('kpiconfigrule/addKpiRule', pararms) }
// 查找所有员工
export const getEmployeeList = params => { return instance.post('dataDictionary/getEmployeeList', params) }
// 新增绑定
export const addEmployeeRule = pararms => { return instance.post('kpiconfigrule/addEmployeeRule', pararms) }
// 根据类型选择信息模板
export const getMsgTemplateById = pararms => { return instance.post('dataDictionary/getMsgTemplateById', pararms) }
// 修改模板
export const updateMsgTemplate = pararms => { return instance.post('dataDictionary/updateMsgTemplate', pararms) }
// 获取绑定
export const getKpiConfigAndTemplate = params => { return instance.post('kpiconfigrule/getKpiConfigAndTemplate', params) }

export const addMsgTemplate = params => { return instance.post('dataDictionary/addMsgTemplate', params) }

export const getMsgTemplateList = params => { return instance.post('dataDictionary/getMsgTemplateList', params) }
export const getKpiRuleInfoList = params => { return instance.post('kpiconfigrule/getKpiRuleInfoList', params) }
export const addEmployeeRuleConfig = params => { return instance.post('kpiconfigrule/addEmployeeRuleConfig', params) }
// 规则类型
export const addKpiRuleType = params => { return instance.post('kpitypedimension/addKpiRuleType', params) }
export const updateKpiRuleType = params => { return instance.post('kpitypedimension/updateKpiRuleType', params) }
export const getKpiRuleType = params => { return instance.post('kpitypedimension/getKpiRuleType', params) }
export const getKpiType = params => { return instance.post('kpitypedimension/getKpiType', params) }

// 维度
export const addKpiDimension = params => { return instance.post('kpitypedimension/addKpiDimension', params) }
export const updateKpiDimension = params => { return instance.post('kpitypedimension/updateKpiDimension', params) }
export const getKpiDimension = params => { return instance.post('kpitypedimension/getKpiDimension', params) }

// 预警信息
export const getMessageRecordList = params => { return instance.post('messagerecord/getMessageRecordList', params) }
export const dataDictionarygetAccepterMessage = params => { return instance.post('dataDictionary/getAccepterMessage', params) }

// ETL预览
export const getFactInfoList = params => { return instance.post('kpifact/getFactInfoList', params) }
