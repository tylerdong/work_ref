import axios from '@/libs/api.request'

/**
 * 获取视频审核状态
 * @param params
 * @returns {*}
 */
const getVideoStatusList = params => axios.request({url: 'pretreatment/controller/file/getVideoStatusList', method: 'get', params})

/**
 * 获取场视频列表
 * @param data
 * @returns {*}
 */
const getPreVideoThemeList = data => axios.request({url: 'pretreatment/controller/themevideo/getPreVideoThemeList', method: 'post', data})

/**
 * 增加长视频主题
 * @param data
 * @returns {*}
 */
const editVideoThemeInfo = data => axios.request({url: 'pretreatment/controller/themevideo/editVideoThemeInfo', method: 'post', data})

/**
 * 主题审核
 * @param data
 * @returns {*}
 */
const auditVideoThemeInfo = data => axios.request({url: 'pretreatment/controller/themevideo/auditVideoThemeInfo', method: 'post', data})

/**
 * 查看主题下的子视频
 * @param params
 * @returns {*}
 */
const selectDetil = params => axios.request({url: 'pretreatment/controller/themevideo/selectDetil', method: 'get', params})

/**
 * 获取已上架和审核通过的视频主题
 * @param params
 * @returns {*}
 */
const getAllThemeByStatus = params => axios.request({url: 'pretreatment/controller/themevideo/getAllThemeByStatus', method: 'get', params})

/**
 * 获取子视频列表
 * @param data
 * @returns {*}
 */
const getPreVideoDetailList = data => axios.request({url: 'pretreatment/controller/detailvideo/getPreVideoDetailList', method: 'post', data})

/**
 * 新增/编辑子视频
 * @param data
 * @returns {*}
 */
const editVideoDetailInfo = data => axios.request({url: 'pretreatment/controller/detailvideo/editVideoDetailInfo', method: 'post', data})

/**
 * 子视频审核
 * @param data
 * @returns {*}
 */
const auditVideoDetailInfo = data => axios.request({url: 'pretreatment/controller/detailvideo/auditVideoDetailInfo', method: 'post', data})

/**
 * 查看主题
 * @param data
 * @returns {*}
 */
const themeVideoSelect = params => axios.request({url: 'pretreatment/controller/themevideo/select', method: 'get', params})

/**
 * 查看子视频详情
 * @param data
 * @returns {*}
 */
const getVideoDetail = params => axios.request({url: 'pretreatment/controller/detailvideo/select', method: 'get', params})

/**
 * 下架子视频
 * @param data
 * @returns {*}
 */
const downSubVideo = params => axios.request({url: 'pretreatment/controller/detailvideo/lowerShelf', method: 'get', params})
/**
 * 下架主题
 * @param data
 * @returns {*}
 */
const downTheme = params => axios.request({url: 'pretreatment/controller/themevideo/lowerShelf', method: 'get', params})

/**
 * 审核主题
 * @param data
 * @returns {*}
 */
const auditTheme = data => axios.request({url: 'pretreatment/controller/themevideo/auditVideoThemeInfo', method: 'post', data})
export {
  getVideoStatusList,
  getPreVideoThemeList,
  editVideoThemeInfo,
  selectDetil,
  auditVideoThemeInfo,
  getPreVideoDetailList,
  getAllThemeByStatus,
  editVideoDetailInfo,
  auditVideoDetailInfo,
  themeVideoSelect,
  getVideoDetail,
  downSubVideo,
  downTheme,
  auditTheme
}
