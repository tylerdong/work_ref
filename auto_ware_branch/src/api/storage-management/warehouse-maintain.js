import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxWarehouseManagementBaseUrl + 'api/warehouseManagement/',
  timeout: window.global.timeout
  // headers: {'X-Custom-Header': 'foobar'}
})

/* ------------------------------------ 仓库 ------------------------------------ */
// 分页获取仓库
export const getWarehouseList = params => { return instance.post('warehouse/getWarehouseList', params) }
// 获取标识
export const getLgortList = params => { return instance.post('lgort/getLgortList', params) }
// 新增标识
export const createLgort = params => { return instance.post('lgort/createLgort', params) }
// 删除标识
export const deleteLgort = params => { return instance.post('lgort/deleteLgort', params) }
// 修改标识
export const updateLgort = params => { return instance.post('lgort/updateLgort', params) }

// 新增仓库
export const addWarehouse = params => { return instance.post('warehouse/insertWarehouse', params) }
// 删除仓库
export const deleteWarehouse = params => { return instance.post('warehouse/deleteWarehouse', params) }
// 获取所有仓库
export const getAllWarehouseList = params => { return instance.post('warehouse/getAllWarehouseList', params) }

/* ------------------------------------ 仓库 ------------------------------------ */
// 查询车牌号
export const selectPlateNumber = params => { return instance.post('plateNumber/selectPlateNumber', params) }
// 创建车牌号
export const createPlateNumber = params => { return instance.post('plateNumber/createPlateNumber', params) }
// 更新车牌号
export const updatePlateNumber = params => { return instance.post('plateNumber/updatePlateNumber', params) }
// 删除车牌号
export const deletePlateNumber = params => { return instance.post('plateNumber/deletePlateNumber', params) }
// 获取所有车牌号
export const getListByType = params => { return instance.post('plateNumber/getListByType', params) }

/* ------------------------------------ 叉车 ------------------------------------ */

// 根据车间分页获取叉车
export const getForkliftList = params => { return instance.post('forklift/getForkliftListByWorkshopId', params) }
// 新增叉车
export const addForklift = params => { return instance.post('forklift/createForklift', params) }
// 根据车间分页获取叉车状态信息
export const getForkliftStatusList = params => { return instance.post('forklift/getForkliftBindListByCond', params) }
// 修改入库叉车规则
export const updateInRule = params => { return instance.post('forklift/updateInRule', params) }
// 修改出库叉车规则
export const updateOutRule = params => { return instance.post('forklift/updateOutRule', params) }

/* ------------------------------------ 退货原因 ------------------------------------ */

// 分页获取退货原因
export const getReturnReasonList = params => { return instance.post('returnReason/getReturnReasonList', params) }
// 新增退货原因
export const addReturnReason = params => { return instance.post('returnReason/insertReturnReason', params) }
// 修改退货原因
export const updateReturnReason = params => { return instance.post('returnReason/updateReturnReason', params) }
// 删除退货原因
export const deleteReturnReason = params => { return instance.post('returnReason/deleteReturnReason', params) }

/* ------------------------------------ 装载点 ------------------------------------ */

// 分页获取装载点
export const getLoadingPointList = params => { return instance.post('gatehead/getGateheadList', params) }

// 新增装载点
export const addLoadingPoint = params => { return instance.post('gatehead/insertGatehead', params) }

// 修改装载点
export const updateLoadingPoint = params => { return instance.post('gatehead/updateGatehead', params) }

// 删除装载点
export const deleteLoadingPoint = params => { return instance.post('gatehead/deleteGatehead', params) }

/* ------------------------------------ 装运点 ------------------------------------ */

// 分页获取装运点
export const getTransportPointList = params => { return instance.post('loadingPoint/getLoadingPointList', params) }

// 新增装运点
export const addTransportPoint = params => { return instance.post('loadingPoint/insertLoadingPoint', params) }

// 修改装运点
export const updateTransportPoint = params => { return instance.post('loadingPoint/updateLoadingPoint', params) }

// 删除装运点
export const deleteTransportPoint = params => { return instance.post('loadingPoint/deleteLoadingPoint', params) }

/* -------------------------------------入库规则--------------------------------------- */
export const getDefaultInboundDate = pararms => { return instance.post('inboundrule/getDefaultInboundDate', pararms) }

/* -------------------------------------物料查询--------------------------------------- */
export const getSapMaterialList = pararms => { return instance.post('sapMessage/getSapMaterialList', pararms) }

/* --------------------------------------SAP状态----------------------------------- */
export const getDeliveryStatus = pararms => { return instance.post('sapMessage/getDeliveryStatus', pararms) }

/* --------------------------------------修改SAP状态----------------------------------- */
export const updateRequestStatus = pararms => { return instance.post('sapMessage/updateRequestStatus', pararms) }

/* --------------------------------------SAP状态-过账----------------------------------- */
export const requisitionRepost = pararms => { return instance.post('sapMessage/requisitionRepost', pararms) }

/* --------------------------------------SAP状态-拣配----------------------------------- */
export const requisitionRepick = pararms => { return instance.post('sapMessage/requisitionRepick', pararms) }

/* --------------------------------------SAP状态-调拨----------------------------------- */
export const synRequisition = pararms => { return instance.post('sapMessage/synRequisition', pararms) }

/* --------------------------------------SAP状态-重新调拨----------------------------------- */
export const deliveryAllot = pararms => { return instance.post('test/deliveryAllot', pararms) }

/* --------------------------------------SAP状态-同步----------------------------------- */
export const updateRequisitionStatus = pararms => { return instance.post('sapMessage/updateRequisitionStatus', pararms) }

/* -------------------------------------工厂配置-------------------------------------- */
export const selectFactory = pararms => { return instance.post('factory/selectFactory', pararms) }
