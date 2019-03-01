import axios from '@/libs/api.request'
// import axios from 'axios'
import qs from 'qs'
// 获取其他产品的数据
export const getOtherData = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice',
    method: 'get',
    params: params
  })
}

// 提交审核
export const batchVerifyDate = data => {
  data = qs.stringify(data, { arrayFormat: 'repeat' })
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/batchVerifyData',
    method: 'post',
    data: data
  })
}

// 提交废除
export const batchDiscardData = data => {
  data = qs.stringify(data, { arrayFormat: 'repeat' })
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/batchDiscardData',
    method: 'post',
    data: data
  })
}

// 手动维护
export const manualFixDate = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice',
    method: 'post',
    data: params
  })
}

// 获取区域树
export const getAreaTree = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/findSelectedNode',
    method: 'get',
    params: params
  })
}

// 获取所有的产品名
export const getProductlist = params => {
  return axios.request({
    url:
      'pretreatment/controller/preProductMarketPrice/findAllProductClassName',
    method: 'get',
    params: params
  })
}

// 修改产品
export const updateProduct = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/' + params.id,
    method: 'put',
    data: params
  })
}

// 审核通过并提交
export const applyAndSuccess = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/submit',
    method: 'get',
    params: params
  })
}

// 验证单条
export const verifyOneData = params => {
  return axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/verifyOneData',
    method: 'get',
    params: params
  })
}
// 获取源数据管理 每个类目的字段
export const getProductCategoryConfig = params => {
  return axios.request({
    url: 'pretreatment/controller/pretreatmentdictionary/getProductCategoryConfig',
    method: 'get',
    params: params
  })
}

// 市场权重配置，权重配置列表
export const getWeightConfigOptions = () => {
  return axios.request({
    url: 'quotation/controller/priceweightconfig/getWeightConfig',
    method: 'get'
  })
}

// 市场权重配置，销售区域
export const getAllSalesAreaClass = () => {
  return axios.request({
    url: 'quotation/controller/priceweightconfig/getAllSalesAreaClass',
    method: 'get'
  })
}

// 市场权重配置-品名
export const getCateWeight = () => {
  return axios.request({
    url: 'quotation/controller/categary/getAllCategarys',
    method: 'get'
  })
}

// 回填市场权重配置
export const getWeightConfigInfo = params => {
  return axios.request({
    url: 'quotation/controller/priceweightconfig/getWeightConfigInfo',
    method: 'get',
    params
  })
}
// 新增市场权重配置
export const addWeightConfig = data => {
  return axios.request({
    url: 'quotation/controller/priceweightconfig/addWeightConfig',
    method: 'post',
    data
  })
}

// 修改市场权重配置
export const updateWeightConfig = data => {
  return axios.request({
    url: 'quotation/controller/priceweightconfig/updateWeightConfig',
    method: 'post',
    data
  })
}

export default {
  getOtherData,
  batchVerifyDate,
  batchDiscardData,
  manualFixDate,
  getAreaTree,
  getProductlist,
  updateProduct,
  applyAndSuccess,
  verifyOneData,
  getWeightConfigOptions,
  getCateWeight,
  getAllSalesAreaClass,
  getWeightConfigInfo,
  addWeightConfig,
  updateWeightConfig
}
