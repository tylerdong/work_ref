import axios from '@/libs/api.request'

// 获取文章来源
export const getAllArticleSource = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllArticleSource', method: 'get'})
// 获取文章状态
export const getAllArticleStatus = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllArticleStatus', method: 'get'})
// 获取文章类型
export const getAllArticleType = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllArticleType', method: 'get'})
// 获取申明类型
export const getAllDeclareType = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllDeclareType', method: 'get'})
// 获取所有产品
export const getAllProductCagetory = () => axios.request({url: 'pretreatment/controller/pretreatmentdictionary/getAllProductCagetory', method: 'get'})
// 添加文章
export const addPreArticleInfo = data => axios.request({url: 'pretreatment/controller/prearticle/addPreArticleInfo', method: 'post', data})
// 文章审核
export const auditPreArticleInfo = data => axios.request({url: 'pretreatment/controller/prearticle/auditPreArticleInfo', method: 'post', data})
// 敏感词检测
export const checkPreArticleInfo = data => axios.request({url: 'pretreatment/controller/prearticle/checkPreArticleInfo', method: 'post', data})
// 文章删除
export const deletePrePreArticleById = data => axios.request({url: 'pretreatment/controller/prearticle/deletePrePreArticleById', method: 'post', data})
// 咨询废弃
export const discardPrePreArticleById = data => axios.request({url: 'pretreatment/controller/prearticle/discardPrePreArticleById', method: 'post', data})
// 咨询下架
export const articleSoldOut = data => axios.request({url: 'pretreatment/controller/prearticle/articleSoldOut', method: 'post', data})
// 获取文章分页
export const getAllPreArticleForPage = data => axios.request({url: 'pretreatment/controller/prearticle/getAllPreArticleForPage', method: 'post', data})
// 获取单条文章详情
export const getPrePreArticleById = data => axios.request({url: 'pretreatment/controller/prearticle/getPrePreArticleById', method: 'post', data})
// 文章编辑
export const updatePreArticleInfo = data => axios.request({url: 'pretreatment/controller/prearticle/updatePreArticleInfo', method: 'post', data})

// 新增快讯
export const addPreNewsFlash = data => axios.request({url: 'pretreatment/controller/preNewsFlash', method: 'post', data})
// 修改快讯
export const putPreNewsFlash = (id, data) => axios.request({ url: `pretreatment/controller/preNewsFlash/${id}`, method: 'put', data })
// 模糊查询文章
export const getNewsByLikeName = params => axios.request({ url: 'pretreatment/controller/prearticle/titleConcat', method: 'get', params })
// 获取快讯列表
export const getFlashNews = params => axios.request({url: 'pretreatment/controller/preNewsFlash', method: 'get', params})
// 获取快讯详情
export const getFlashNewDetail = id => axios.request({ url: `pretreatment/controller/preNewsFlash/${id}`, method: 'get' })
// 删除快讯
export const delFlashNew = id => axios.request({ url: `pretreatment/controller/preNewsFlash/${id}`, method: 'delete' })
// 下架快讯
export const downFlashNew = id => axios.request({ url: `pretreatment/controller/preNewsFlash/cancel/${id}`, method: 'get' })

// 获取所有咨询
export default {
  getAllDeclareType,
  getAllProductCagetory,
  getAllArticleSource,
  getAllArticleStatus,
  getAllArticleType,
  getAllPreArticleForPage,
  addPreNewsFlash,
  putPreNewsFlash,
  getNewsByLikeName,
  getFlashNews,
  delFlashNew,
  downFlashNew,
  getFlashNewDetail,
  deletePrePreArticleById,
  discardPrePreArticleById,
  articleSoldOut
}
