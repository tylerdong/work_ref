import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxWarehouseManagementBaseUrl + 'api/warehouseManagement/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})
/* ------------------------------------ 下拉选项 ------------------------------------ */
// 获取所有批次
export const getAllBatch = params => { return instance.post('stock/getAllBatch', params) }
// 获取所有规格
export const getAllSpec = params => { return instance.post('stock/getAllSpec', params) }
// 获取所有等级
export const getAllLevel = params => { return instance.post('stock/getAllLevel', params) }
// 获取所有车间
export const getAllWorkshop = params => { return instance.post('stock/getAllWorkshop', params) }
// 获取所有产品名称
export const getAllProduct = params => { return instance.post('stock/getAllProduct', params) }
// 根据车间id获取线别  请求参数:{"workShopId":"车间id"}
export const getLineByWorkshopId = params => { return instance.post('stock/getAllLine', params) }
/* ------------------------------------ 库位计划 ------------------------------------ */

// 根据条件分页获取库位计划
export const getStorageLocationList = params => { return instance.post('storagePlan/getStoragePlanList', params) }

// 批量新增库位计划
export const addStorageLocationList = params => { return instance.post('storagePlan/createStoragePlan', params) }

// 修改库位计划
export const updateStorageLocation = params => { return instance.post('storagePlan/updateStoragePlan', params) }

// 计划清批换批
export const planClearOrChangeBatch = params => { return instance.post('storagePlan/planClearOrChangeBatch', params) }

// 禁用/启用库位
export const switchStorageStatus = params => { return instance.post('storagePlan/switchStorageStatus', params) }

// 入库规则
export const inRule = params => { return instance.post('storagePlan/inRule', params) }

// 发货规则
export const deliveryRule = params => { return instance.post('storagePlan/deliveryRule', params) }

// 根据仓库id获取库位信息
export const getStorageInfoByWarehouseId = params => { return instance.post('storagePlan/getStorageInfoByWarehouseId', params) }

/* ------------------------------------ 库位视图 ------------------------------------ */

// 获取库位视图
export const getAreaView = params => { return instance.post('storage/getStorageView', params) }

// 修改库位状态
export const changeStorageStatus = params => { return instance.post('storage/changeStorageStatus', params) }

// 获取库位信息
export const getStorageInfo = params => { return instance.post('storage/getStorageInfo', params) }

// 报警设置
export const updateWarehouseWarnDay = params => { return instance.post('warehouse/updateWarehouseWarnDay', params) }

// 打印
export const getStoragePrintList = params => { return instance.post('storage/getStoragePrintList', params) }

/* ------------------------------------ 库存明细 ------------------------------------ */
// 获取班次
export const getAllClasses = params => { return instance.post('auto/getAllClasses') }

// 分页获取库存明细
export const getStockInfo = params => { return instance.post('stockDetail/getStockInfo', params) }

// 查看码单
export const viewWeightMemo = params => { return instance.post('stock/getCodeInfoList', params) }
// 查看出库信息接口
export const getRetrievalRecordInfo = params => { return instance.post('stockRecord/getRetrievalRecordInfo', params) }
// 查看调拨单明细
export const getRetrievalRecordInfoList = params => { return instance.post('stockRecord/getRetrievalRecordInfoList', params) }
// 查看码单
export const moveStockDetail = params => { return instance.post('stockDetail/moveStockDetail', params) }
// 码单明细
export const getCodeInfoList = params => { return instance.post('stockRecord/getCodeInfoList', params) }
// 共享托盘出库追溯表
export const getOutOfStoragePalletProducts = params => { return instance.post('palletController/getOutOfStoragePalletProducts', params) }

/* ------------------------------------ 调拨出库 ------------------------------------ */
// 根据调拨单id获取未处理销售调拨单
export const getUnDoSaleRequisitionById = params => { return instance.post('requisition/getUnDoSaleRequisitionById', params) }

// 根据调拨单id获取已处理销售调拨单
export const getDoneSaleRequisitionById = params => { return instance.post('requisition/getDoneSaleRequisitionById', params) }

// 获取记录
export const getRequisitionByType = params => { return instance.post('requisition/getRequisitionByType', params) }

// 装运点
export const getLoadingPointLists = params => { return instance.post('loadingPoint/getLoadingPointLists', params) }

// 获取锭重列表
export const getSilkWeightList = params => { return instance.post('requisition/getSilkWeightList', params) }

// 销售调拨提交
export const submitSaleRequisition = params => { return instance.post('requisition/submitSaleRequisition', params) }

// 样品调拨提交
export const submitSampleRequisition = params => { return instance.post('requisition/submitSampleRequisition', params) }

// 根据调拨单id获取未处理样品调拨单
export const getUnDoSampleRequisitionById = params => { return instance.post('requisition/getUnDoSampleRequisitionById', params) }

// 根据调拨单id获取已处理样品调拨单
export const getDoneSampleRequisitionById = params => { return instance.post('requisition/getDoneSampleRequisitionById', params) }

// 根据调拨单id获取已处理样品调拨单
export const getRefundRequisitionById = params => { return instance.post('requisition/getRefundRequisitionById', params) }

// 退货调拨提交
export const submitSaleReturnRequisition = params => { return instance.post('requisition/submitSaleReturnRequisition', params) }

// 货物回退
export const stockReverse = params => { return instance.post('requisition/stockReverse', params) }

// 根据车牌号或者交货编号模糊查询调拨单信息
export const getRequisitionInfoByParams = params => { return instance.post('requisition/getRequisitionInfoByParams', params) }

// 货物转移出货安排
export const getStockTransferInfo = params => { return instance.post('requisition/getStockTransferInfo', params) }
/* ------------------------------------ 出入库记录 ------------------------------------ */

// 获取待入库记录
export const getUnInRecord = params => { return instance.post('stockRecord/getUnStockingRecord', params) }

// 修改待入库记录
export const updateProductInfos = params => { return instance.post('stockRecord/updateProductInfos', params) }

// 获取入库记录
export const getInRecordList = params => { return instance.post('stockRecord/getStockingRecord', params) }

// 获取出库记录
export const getOutRecordList = params => { return instance.post('stockRecord/getRetrievalRecord', params) }

/* ------------------------------------ 盘点记录 ------------------------------------ */

/* --------- origin ---------- */
// 分页获取盘点记录
export const getCheckRecordList = params => { return instance.post('stock/getStockList', params) }
// 分页获取盘点记录的详情
export const getCheckRecordDetailList = params => { return instance.post('stockDetail/getStockDetailList', params) }
/* --------- end ---------- */

// 添加盘点记录
export const addInventoryRecord = params => { return instance.post('inventoryRecord/addInventoryRecord', params) }

// 查询盘点记录
export const getInventoryRecords = params => { return instance.post('inventoryRecord/getInventoryRecords', params) }

export const getStockInfoForInventory = params => { return instance.post('stockDetail/getStockInfoForInventory', params) }

// 查询盘点明细
export const getInventoryDetail = params => { return instance.post('inventoryRecord/getInventoryDetail', params) }

// 确认补录
export const repairMissingCodeList = params => { return instance.post('stockDetail/repairMissingCodeList', params) }

// 确认修改入库日期
export const changeInboundDate = params => { return instance.post('stockDetail/changeInboundDate', params) }
/* ------------------------------------ 退货处理 ------------------------------------ */

/* ------------------------------------ 散件发运 ------------------------------------ */

// 分页获取散件发运信息
export const getPartDeliveryList = params => { return instance.post('getPartDeliveryList', params) }

// 获取散件发运详情
export const getPartDeliveryDetail = params => { return instance.post('getPartDeliveryDetail', params) }

/* ------------------------------------ 异常处理 ------------------------------------ */

// 入库异常 - 分页获取入库失败列表
export const getFailInSapList = params => { return instance.post('inboundList/getFailInSapList', params) }

// 入库异常 - 重新入库
export const sapWarehousing = params => { return instance.post('inboundList/sapWarehousing', params) }

// 包装计量-补打码单
export const getEndProductList = params => { return instance.post('inboundList/getEndProductList', params) }

// 拣配异常 - 获取调拨单拣配失败列表
export const getFailPickList = params => { return instance.post('requisition/getRequisitionFailPickList', params) }

// 拣配异常 - 重新拣配
export const repick = params => { return instance.post('requisition/requisitionRepick', params) }

// 过账异常 - 获取调拨单过账失败列表
export const getFailPostList = params => { return instance.post('requisition/getRequisitionFailPostList', params) }

// 过账异常 - 重新过账
export const repost = params => { return instance.post('requisition/requisitionRepost', params) }

/* ------------------------------------ end ------------------------------------ */

/* ------------------------------------ 报表 ------------------------------------ */

// 获取报表
export const getInputReport = params => { return instance.post('report/getInputReport', params) }

// 导出报表 api/warehouseManagement/report/outPutInputReport

export const outPutInputReport = params => { return instance.post('report/outPutInputReport', params) }

// 获取追溯表
// export const getRetrospectReport = params => { return instance.post('report/retroactiveReportView', params) }

// 获取追溯Excel表 字节流
export const getRetrospectReport = params => { return instance.post('report/retroactiveReportExcel', params, {responseType: 'arraybuffer'}) }

// 获取库存预警Excel表 字节流
export const getInventoryWarningReport = params => { return instance.post('report/stockWarningReportExcel', params, {responseType: 'arraybuffer'}) }

// 获取翻包记录Excel表 字节流
export const getRepackReport = params => { return instance.post('report/turnoverPackageStatisticalExcel', params, {responseType: 'arraybuffer'}) }

// 获取出入库销售统计Excel表 字节流
export const getSaleStatisticsReport = params => { return instance.post('report/getSaleCountReport', params, {responseType: 'arraybuffer'}) }

// 获取外销装车跟踪单信息
export const requisitionReportPrint = params => { return instance.post('report/requisitionReportPrint', params) }

// 下载外贸撞车跟踪单
export const requisitionReportExcel = params => { return instance.post('report/requisitionReportExcel', params, {responseType: 'arraybuffer'}) }

// 产量月报表
export const getMonthlyReport = params => { return instance.post('report/getMonthlyReport', params) }

// 产量日报表
export const getDailyReport = params => { return instance.post('report/getDailyReport', params) }

// 下机产量日报表
export const getWorkShopReport = params => { return instance.post('report/getWorkShopReport', params) }
// test
export const test = params => { return instance.post('report/test', params, {responseType: 'arraybuffer'}) }
/* ------------------------------------ end ------------------------------------ */

// 获取库存类型
export const getAllStockTypes = () => { return instance.post('report/getAllStockTypes') }

// 获取备货类型
export const getAllStockUpTypes = () => { return instance.post('report/getAllStockUpTypes') }
// 待翻包
// export const getTurnOverPageInfoByVoucherNumber = params => { return instance.post('turnoverPackage/getTurnOverPageInfoByVoucherNumber', params) }
export const getRefundPostingInfo = params => { return instance.post('turnoverPackage/getRefundPostingInfo', params) }

// 翻包记录
export const getTurnOverPageResultByVoucherNumber = params => { return instance.post('turnoverPackage/getTurnOverPageResultByVoucherNumber', params) }

// 生成唛头
export const confirmSubmitTurnOverPage = params => { return instance.post('turnoverPackage/confirmSubmitTurnOverPage', params) }

// 获取唛头信息
export const getTurnOverPageEndProductByBarCode = params => { return instance.post('turnoverPackage/getTurnOverPageEndProductByBarCode', params) }

// 退货翻包过账
export const getTurnoverPackageList = params => { return instance.post('turnoverPackage/getTurnoverPackageList', params) }

// 获取翻包记录
export const refundPosting = params => { return instance.post('turnoverPackage/refundPosting', params) }

// 修改翻包状态
export const updateTurnoverPackageStatus = params => { return instance.post('turnoverPackage/updateTurnoverPackageStatus', params) }

// 获取翻包记录
export const getTurnoverPackageResultList = params => { return instance.post('turnoverPackage/getTurnoverPackageResultList', params) }

// 获取创建人列表
export const getOperatorList = params => { return instance.post('stock/getOperatorList', params) }

// 同步调拨单
export const synRequisition = params => { return instance.post('requisition/synRequisition', params) }

// 同步物料
export const synMaterial = params => { return instance.post('requisition/synMaterial', params) }

// 取消调拨单 {primaryId,deliveryNos}
export const cancelRequisition = params => { return instance.post('requisition/cancelRequisition', params) }

// 取消Sap的调拨单 {deliveryNo}
export const cancelAllot = params => { return instance.post('requisition/cancelAllot', params) }

// 合并调拨单
export const manualMergeRequisition = params => { return instance.post('requisition/manualMergeRequisition', params) }

// 提前出库 {requisitionId, operator}
export const advancePosting = params => { return instance.post('requisition/advancePosting', params) }

// 过账转移 {primaryId, isInternalTrade}
export const getPostTransferList = params => { return instance.post('requisition/getPostTransferList', params) }

// 转移 {originalPrimaryId, newPrimaryId, operator}
export const submitPostTransfer = params => { return instance.post('requisition/submitPostTransfer', params) }

// 取消拣配 {primaryId}
export const cancelPickup = params => { return instance.post('outBoundList/pickingReverse', params) }

// 取消过账 {primaryId, operator}
export const cancelPost = params => { return instance.post('outBoundList/reverseDeliveryPost', params) }

// 校验提前出库 {requisitionId}
export const checkEnough = params => { return instance.post('requisition/checkAdvancePostingEnough', params) }

// 获取过账异常列表
export const getRequisitionFailPostList = params => { return instance.post('requisition/getRequisitionFailPostList', params) }

// 模糊查询库位信息 {code}
export const getStorageIdCodeByLikeCode = params => { return instance.post('storage/getStorageIdCodeByLikeCode', params) }

// 模糊查询库位信息 {qrCode, storageId} qrCode 多个二维码逗号隔开
export const scanStorageQr = params => { return instance.post('inboundList/scanStorageQr', params) }

// 清除库存 {detailIdList: []} qrCode 多个二维码逗号隔开
export const clearStockDetail = params => { return instance.post('stock/deleteStockDetailStatus', params) }
// 增加批次
export const createInboundRule = params => { return instance.post('inboundrule/createInboundRule', params) }
// 删除批次
export const deleteInboundRule = params => { return instance.post('inboundrule/deleteInboundRule', params) }
// 修改批次
export const updateInboundRule = params => { return instance.post('inboundrule/updateInboundRule', params) }
// 查询批次
export const selectInboundRule = params => { return instance.post('inboundrule/selectInboundRule', params) }
/* ------------------------------------ 销售组织 ------------------------------------ */
// 新增销售组织
export const addSaleOrganization = params => { return instance.post('saleOrganization/addSaleOrganization', params) }
// 新增销售组织
export const updateSaleOrganization = params => { return instance.post('saleOrganization/updateSaleOrganization', params) }
// 新增销售组织
export const delSaleOrganization = params => { return instance.post('saleOrganization/delSaleOrganization', params) }
// 获取销售组织
export const getSaleOrganization = params => { return instance.post('saleOrganization/getSaleOrganization', params) }
/* ------------------------------------ 共享托盘 ------------------------------------ */
// 查询托盘编码
export const getPalletCodes = params => { return instance.post('palletController/getPalletCodes', params) }
// 查询托盘操作历史
export const getPalletTypes = params => { return instance.post('palletController/getPalletTypes', params) }
// 实时查询
export const getPalletProducts = params => { return instance.post('palletController/getPalletProducts', params) }
// 历史查询
export const getPalletProductsHis = params => { return instance.post('palletController/getPalletProductsHis', params) }
