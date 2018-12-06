/**
 * 材料管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/material',
  timeout: window.global.timeout
})
/* 公用 */
  // 获取材料类型列表
export const getMaterialTypeList = params => { return instance.post('getMaterialTypeList', params) }
// 通过类型 获取名称
export const getMaterialName = params => { return instance.post('getMaterialName', params) }
// 通过名称 获取规格和纯度
export const getStandardOrPurity = params => { return instance.post('getStandardOrPurity', params) }
// 通过名称和纯度 获取规格
export const getStandard = params => { return instance.post('getStandard', params) }
// 获取领用人
export const getRecipientName = params => { return instance.post('getRecipientName', params) }
// 通过材料ID获取库存数量
export const getMaterialStorageNum = params => { return instance.post('getMaterialStorageNum', params) }

/* 材料分类 */
  // 获取材料分类列表
export const getMaterialInfoList = params => { return instance.post('getMaterialInfoList', params) }
  // 材料分类登记
export const addMaterialInfo = params => { return instance.post('addMaterialInfo', params) }

// 材料分类删除
export const deleteMaterialInfo = params => { return instance.post('deleteMaterialInfo', params) }

// 材料分类修改
export const updateMaterialInfo = params => { return instance.post('updateMaterialInfo', params) }

/* 材料出库接口 */

// 新增材料出库记录
// {"materialInfoNo":"","count":"3","recipientId":"yzx","describe":"good","operator":"yzx","operationTime":"1495509640000"}
export const addMaterialOutStorage = params => { return instance.post('addMaterialOutStorage', params) }

// 材料出库列表获取接口
// {"typeNo":"1733854581558870049","pageIndex":"1","pageCount":"10"}
export const getOutStorageList = params => { return instance.post('getMaterialOutStorageList', params) }

/* 材料入库 */
// 获取材料入库列表
export const getMaterialInStorageList = params => { return instance.post('getMaterialInStorageList', params) }
// 材料入库新增
export const addMaterialInStorage = params => { return instance.post('addMaterialInStorage', params) }

/* 材料申购 */
// 材料申购 -- 获取申请列表
export const getApplyList = params => { return instance.post('getApplyList', params) }
// 材料申购 -- 增加材料申请
export const addMaterialApply = params => { return instance.post('addMaterialApply', params) }
// 材料申购 -- 入库按钮
export const addMaterialApplyInStorage = params => { return instance.post('addMaterialApplyInStorage', params) }
// 材料申购 -- 入库记录
export const getApplyInStorageList = params => { return instance.post('getApplyInStorageList', params) }

