/**
 * Created by lingj on 2017/6/22.
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
 * 条码打印
 */
// 生成丝锭条码
export const createSilkCode = params => { return instance.post('createSilkCode', params) }
// 根据线别获取批号
export const getBatchListByLineId = params => { return instance.post('getBatchListByLineId', params) }

// 根据批号获取规格、锭重、锭数、落筒方式
export const getProductInfoBoByParameters = params => { return instance.post('getProductInfoBoByParameters', params) }

// 批量修改并生成条码
export const bulkChangeAndCreateSilkCode = params => { return instance.post('bulkChangeAndCreateSilkCode', params) }

// 获取丝锭条码打印列表
export const getSilkCodeGroupList = params => { return instance.post('getSilkCodeGroupList', params) }

// 获取丝锭条码打印记录列表
export const getSilkCodePrintRecordList = params => { return instance.post('getSilkCodePrintRecordList', params) }

// 丝锭条码打印
export const silkCodePrint = params => { return instance.post('silkCodePrint', params) }

// 丝锭条码打印(单个)
export const signalSilkCodePrint = params => { return instance.post('signalSilkCodePrint', params) }

// 丝车条码打印（接收数组）
export const printSilkcarCode = params => { return instance.post('printSilkcarCode', params) }

// 外贸码单打印列表查询
export const getForeignTradePackBoxCodeList = params => { return instance.post('getForeignTradePackBoxCodeList', params) }

// 查看箱单列表
export const getPackageCodeList = params => { return instance.post('getPackageCodeList', params) }

// 生成外贸条码
export const creatPackageCode = params => { return instance.post('creatPackageCode', params) }

// 外贸码单打印
export const foreignTradePackBoxCodePrint = params => { return instance.post('foreignTradePackBoxCodePrint', params) }

// 外贸箱单打印
export const packageCodePrint = params => { return instance.post('packageCodePrint', params) }

// 拆包--码单打印列表查询
export const getUnpackingCodePrintList = params => { return instance.post('getUnpackingCodePrintList', params) }

// 拆包--计量
export const unpackingMeterage = params => { return instance.post('unpackingMeterage', params) }

// 翻包查询
export const getflipPackInfo = params => { return instance.post('getflipPackInfo', params) }

// 查询丝锭流程详情
export const getProductInfoBySilkCode = params => { return instance.post('getProductInfoBySilkCode', params) }

// 箱包丝锭查询
export const getSilkListByBoxCode = params => { return instance.post('getSilkListByBoxCode', params) }

// 包装计量/码跺箱单条码/待打印/增加码单
export const addSilkBoxCode = params => { return instance.post('addSilkBoxCode', params) }

// 包装计量/码跺箱单条码/唛头条码列表（已打印/未打印）
export const getBoxCodeListForStorage = params => { return instance.post('getBoxCodeListForStorage', params) }

// 包装计量/码跺箱单条码/新增条码
export const addSilkBoxCodeForStorage = params => { return instance.post('addSilkBoxCodeForStorage', params) }

// 包装计量/码跺箱单条码/打印条码
export const printBoxCodeForStorage = params => { return instance.post('printBoxCodeForStorage', params) }

// 包装计量/唛头条码/唛头条码/待打印/打印
export const printBoxCodeListForStorage = params => { return instance.post('printBoxCodeListForStorage', params) }

// 包装计量/补打唛头/打印条码
export const getReprintBarcodeRecord = params => { return instance.post('getReprintBarcodeRecord', params) }

// 补打唛头-查询
export const getEndProductList = params => { return instance.post('getEndProductList', params) }

// 补打唛头-更新打印标志
export const updateProductPrintFlag = params => { return instance.post('updateProductPrintFlag', params) }
