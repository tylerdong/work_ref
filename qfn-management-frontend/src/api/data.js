import axios from '@/libs/api.request'

// 获取字典数据
export const getDicData = (params) => {
  return axios.request({
    url: 'quotation/controller/quotation/controller/get_dic_data',
    method: 'get',
    params: params
  })
}

// 获取审核统计列表
export const getAuditDictData = params => {
  return axios.request({url: 'quotation/controller/auditDicts', method: 'get', params: params})
}

// 获取类目管理树
export const getCategoryTree = params => {
  return axios.request({
    url: 'quotation/controller/categary/tree',
    method: 'get',
    params: params
  })
}

// 新增类目节点
export const postCategoryTree = data => {
  return axios.request({
    url: 'quotation/controller/categary/tree',
    method: 'post',
    data: data
  })
}

// 删除类目节点
export const delCategoryTree = (id, params) => {
  return axios.request({
    url: `quotation/controller/categary/tree/${id}`,
    method: 'delete',
    params
  })
}

// 更新类目节点
export const updateCategoryTree = (id, data) => {
  return axios.request({url: `quotation/controller/categary/tree/${id}`, method: 'put', data})
}

// 获取区域管理数据
export const getAreaData = params => {
  return axios.request({
    url: 'quotation/controller/salesArea/getSalesArea',
    method: 'post',
    data: params
  })
}

// 修改区域管理数据
export const updateAreaData = params => {
  return axios.request({
    url: 'quotation/controller/salesArea/updateSalesArea',
    method: 'post',
    data: params
  })
}

// 删除区域管理数据
export const deleteAreaData = params => {
  return axios.request({
    url: 'quotation/controller/salesArea/deleteSalesArea',
    method: 'post',
    data: params
  })
}

// 新增一级区域管理数据
export const addTopAreaData = params => {
  return axios.request({
    url: 'quotation/controller/salesArea/insertTopSalesArea',
    method: 'post',
    data: params
  })
}

// 新增子区域管理数据
export const addSonAreaData = params => {
  return axios.request({
    url: 'quotation/controller/salesArea/insertSubSalesArea',
    method: 'post',
    data: params
  })
}

// 获取产品管理的数据
export const getProductData = params => {
  return axios.request({
    url: 'quotation/controller/product',
    method: 'get',
    params: params
  })
}
// 删除产品管理的数据
export const deleteProductData = params => {
  return axios.request({
    url: 'quotation/controller/product/' + params,
    method: 'delete'
  })
}
// 新增产品管理的数据
export const addProductData = params => {
  return axios.request({
    url: 'quotation/controller/product',
    method: 'post',
    data: params
  })
}
// 修改产品管理的数据
export const editProductData = params => {
  return axios.request({
    url: 'quotation/controller/product/' + params.id,
    method: 'put',
    data: params
  })
}
// 修改产品管理的数据的树
export const editGetTreeData = id => {
  return axios.request({
    url: 'quotation/controller/categary/tree/' + id,
    method: 'get'
  })
}

// 新增集团
export const addManufactureGroup = data =>
  axios.request({url: `quotation/controller/manufacturergroup/addManufactureGroup`, method: 'post', data})
// 更新集团
export const updateManufactureGroup = data =>
  axios.request({url: `quotation/controller/manufacturergroup/updateManufactureGroup`, method: 'post', data})
// 获取分页集团
export const getManufactureGroupForPage = data =>
  axios.request({url: 'quotation/controller/manufacturergroup/getManufactureGroupForPage', method: 'post', data})
// 新增厂家
export const addManufacture = data =>
  axios.request({url: 'quotation/controller/manufacture/addManufacture', method: 'post', data})
// 修改厂家
export const updateManufacture = data =>
  axios.request({url: 'quotation/controller/manufacture/updateManufacture', method: 'post', data})
// 返回分页厂家
export const getManufactureForPage = data =>
  axios.request({url: 'quotation/controller/manufacture/getManufactureForPage', method: 'post', data})
// 获取所有省
export const getAllProvince = () =>
  axios.request({url: 'quotation/controller/areadata/getAllProvince', method: 'get'})
// 获取省下面所有市
export const getCity = data =>
  axios.request({url: 'quotation/controller/areadata/getCity', method: 'post', data})
// 获取市下面所有县
export const getCounty = data =>
  axios.request({url: 'quotation/controller/areadata/getCounty', method: 'post', data})

// 获取数据所有状态
const getAllDataStatus = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllDataStatus', method: 'get'})
// 获取产品
const getAllProduct = (params) => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllProduct', method: 'get', params})
// 获取抓取数据的品名
const getAllCondByStatus = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/getAllCondByStatus', method: 'post', data})
// 获取集团和工厂
const getAllManufactureAndGroup = () =>
  axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllManufactureAndGroup', method: 'get'})
// 获取所有集团
const getAllGroup = () =>
  axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllGroup', method: 'get'})
// 添加涤纶长丝报价数据
const addPreManufacturePriceInfo = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/addPreManufacturePriceInfo', method: 'post', data})
// 工厂报价数据提交审核
const checkPreManufacturePrice = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/checkPreManufacturePrice', method: 'post', data})
// 删除工厂报价数据
const deletePreManufacturePrice = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/deletePreManufacturePrice', method: 'post', data})
// 工厂报价数据批量废弃
const discardPreManufacturePrice = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/discardPreManufacturePrice', method: 'post', data})
// 分页返回挖取的工厂报价数据
const getAllPreManufactureInfoForPage = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/getAllPreManufactureInfoForPage', method: 'post', data})
// 推送生产厂家报价数据
const getAllPreProductManufacturer = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/getAllPreProductManufacturer', method: 'get', data})
// 单条工厂报价数据展示
const getPreManufacturePriceById = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/getPreManufacturePriceById', method: 'get', data})
// 修改挖取的工厂报价数据
const updatePreManufacturePrice = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/updatePreManufacturePrice', method: 'post', data})
// 审核通过并提交
const submitPreManufacturePrice = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/submitPreManufacturePrice', method: 'post', data})
// 宏观指数价格
const getAccountData = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/getAccountData', method: 'post', data})
// 上传excel
const importiExcelData = data =>
  axios.request({url: 'pretreatment/controller/preproductmanufacturerprice/importiExcelData', method: 'post', data})
// 获取其他产品现势数据
const getCurrentProductMarketPrice = params =>
  axios.request({
    url: 'pretreatment/controller/preProductMarketPrice',
    method: 'get',
    params
  })

// 获取其他产品列表
const getOtherProducts = params =>
  axios.request({
    url: 'pretreatment/controller/preProductMarketPrice/findAllProductClassName',
    method: 'get',
    params
  })

export default {
  getDicData,
  getAuditDictData,
  getCategoryTree,
  getAreaData,
  updateAreaData,
  deleteAreaData,
  addTopAreaData,
  addSonAreaData,
  getProductData,
  deleteProductData,
  editProductData,
  editGetTreeData,
  addProductData,
  postCategoryTree,
  delCategoryTree,
  updateCategoryTree,
  getAllDataStatus,
  getAllProduct,
  getAllCondByStatus,
  getAllManufactureAndGroup,
  getAllGroup,
  addPreManufacturePriceInfo,
  checkPreManufacturePrice,
  deletePreManufacturePrice,
  discardPreManufacturePrice,
  getAllPreManufactureInfoForPage,
  getAllPreProductManufacturer,
  getPreManufacturePriceById,
  updatePreManufacturePrice,
  submitPreManufacturePrice,
  getCurrentProductMarketPrice,
  getOtherProducts,
  getAccountData,
  importiExcelData
}
