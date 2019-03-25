import axios from '@/libs/api.request'

// 获取视频列表
export const getshortList = params => {
  return axios.request({
    url: 'pretreatment/controller/file/getPreVideoXList',
    method: 'get',
    params: params
  })
}
// 来源列表
export const getVideoSourceList = params => {
  return axios.request({
    url: 'pretreatment/controller/file/getVideoSourceList',
    method: 'get',
    params: params
  })
}
// 下架视频
export const unloadVideo = params => {
  return axios.request({
    url: 'pretreatment/controller/file/edit',
    method: 'get',
    params: params
  })
}

// 审核视频
export const auditVideo = params => {
  return axios.request({
    url: 'pretreatment/controller/file/audit',
    method: 'get',
    params: params
  })
}
// 作者
export const getUserList = params => {
  return axios.request({
    url: 'pretreatment/controller/file/getUserList',
    method: 'get',
    params: params
  })
}
// 作者
export const getTestAuth = params => {
  return axios.request({
    url: 'quotation/qn/getTestAuth',
    method: 'get',
    params: params
  })
}
