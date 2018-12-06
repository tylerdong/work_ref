/**
 * Created by gelingyan on 2017/6/28.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'

promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/productionInfo/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/**
 * 统计报表
 */
// 获取生产产量报表信息{"startDate":"2011-10-10T","endDate":"2017-10-10T", "workshopId":"1756495681595375648","productTypeName":"","item":"","batchNo":""}
export const getOutputReportDataByParameters = params => { return instance.post('getOutputReportDataByParameters', params) }

// 获取个人扫描量报表信息{"employeeName":"用户名","workshopId":"车间id","schedulingId":"班次id","scanDate":"扫描日期","dateFlag":"日期标识,0:日报;1:月报"}
export const getEmployeeWorkReportListByParams = params => { return instance.post('getEmployeeWorkReportListByParams', params) }

// 获取异常报表
export const getSilkExceptionReport = params => { return instance.post('getSilkExceptionReport', params) }

// 获取异常报表
export const getSilkExceptionDetailReport = params => { return instance.post('getSilkExceptionDetailReport', params) }

// 异常爆表 -- 导出报表
export const exportSilkExceptionExcel = params => { return instance.post('exportSilkExceptionExcel', params) }

// 降等报表 -- 导出报表
export const exportSentenceRateReport = params => { return instance.post('exportSentenceRateReport', params) }

// 批号列表 -- 模糊查询
export const fuzzyQueryBatchNo = params => { return instance.post('fuzzyQueryBatchNo', params) }

// 导出获取到的生产产量报表信息
export const exportOutputReportDataByParameters = params => { return instance.post('exportOutputReportDataByParameters', params) }

// 下载导出个人扫描记录报表内容{"employeeName":"用户名","workshopId":"车间id","schedulingId":"班次id","scanDate":"扫描日期","dateFlag":"日期标识,0:日报;1:月报"}
export const exportPersonScanByParameters = params => { return instance.post('exportPersonScanByParameters', params) }

// 获取丝车状态信息列表
export const getSilkCarStatusInfoList = params => { return instance.post('getSilkCarStatusInfoList', params) }

// 获取丝锭信息详情
export const getSilkInfoBySilkCode = params => { return instance.post('getSilkInfoBySilkCode', params) }

// 获取车间生产状况
export const getWorkShopProductResult = params => { return instance.post('getWorkShopProductResult', params) }

// 获取批次检索集合
export const getBatchNoSearchList = params => { return instance.post('getBatchNoSearchList', params) }

// 获取落次检索集合
export const getFallNoSearchList = params => { return instance.post('getFallNoSearchList', params) }

// 获取位号检索集合
export const getItemSearchList = params => { return instance.post('getItemSearchList', params) }

// 获取丝锭code检索集合
export const getSilkCodeSearchList = params => { return instance.post('getSilkCodeSearchList', params) }

// 根据批次 落次 位号分页获取丝锭状态信息
export const getSilkStatusListByParameters = params => { return instance.post('getSilkStatusListByParameters', params) }

// 根据丝锭code获取丝锭状态
export const getSilkStatusListBySilkCode = params => { return instance.post('getSilkStatusListBySilkCode', params) }

/* 标样丝管理 */
// 分页获取标样丝列表
export const getStandardSilkInfoList = params => { return instance.post('getStandardSilkInfoList', params) }
// 根据丝车编号查询信息
export const getSilkCodeListBoBySilkCarCode = params => { return instance.post('getSilkCodeListBoBySilkCarCode', params) }
//  标样丝登记
export const registerStandardSilk = params => { return instance.post('registerStandardSilk', params) }
//  标样丝查看详情
export const getStandardSilkInfoBoById = params => { return instance.post('getStandardSilkInfoBoById', params) }
//  清除标样丝
export const clearStandardSilkByIdList = params => { return instance.post('clearStandardSilkByIdList', params) }
// 染色降等比率月报
export const getSentenceRateReport = params => { return instance.post('getSentenceRateReport', params) }
// 线别线别产量报表
export const getOutputReportForLine = params => { return instance.post('getOutputReportForLine', params) }
// 导出线别产量报表
export const exportOutputReportForLine = params => { return instance.post('exportOutputReportForLine', params) }
// 查询作业统计柱状图
export const getEmployeeWorkReportList = params => { return instance.post('getEmployeeWorkReportList', params) }
// 生产检控官/状态查询/历史
export const getSilkCarStatusHistoryInfoList = params => { return instance.post('getSilkCarStatusHistoryInfoList', params) }
// 生产检控官/状态查询/历史， 根据工艺查询
export const getSilkCarStatusHistoryInfo = params => { return instance.post('getSilkCarStatusHistoryInfo', params) }
// 丝锭历史详情
export const getSilkInfoHistoryBySilkCode = params => { return instance.post('getSilkInfoHistoryBySilkCode', params) }
// 获取产量分析
export const getOutputReportByWorkshopAndLine = params => { return instance.post('getOutputReportByWorkshopAndLine', params) }
// 获取丝锭异常情况
export const getExceptSilkReportList = params => { return instance.post('getExceptSilkReportList', params) }
// 获取丝锭异常情况
export const getSilkQualityReport = params => { return instance.post('getSilkQualityReport', params) }
// 获取调度列表
export const getScheduleConfigList = params => { return instance.post('getScheduleConfigList', params) }
// 获取某个调度的日志
export const getScheduleLogList = params => { return instance.post('getScheduleLogList', params) }
// 更新调度
export const updateScheduleConfig = params => { return instance.post('updateScheduleConfig', params) }
// 获取配置列表
export const getBoardConfig = params => { return instance.post('getBoardConfig', params) }
// 更新配置
export const updateBoardConfig = params => { return instance.post('updateBoardConfig', params) }

// 丝锭判等明细查询
export const getSilkGradeRecordList = params => { return instance.post('getSilkGradeRecordList', params) }
// 丝锭异常明细查询
export const getSilkExceptionRecordList = params => { return instance.post('getSilkExceptionRecordList', params) }

