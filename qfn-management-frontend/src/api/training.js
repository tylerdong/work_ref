/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-20 16:15:28
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-03-22 11:03:27
 * @Description: 培训模块api
 */

import axios from '@/libs/api.request'

/**
 * 分页返回招聘信息数据
 * @param {object} data
 * @param {number} data.pageCount 每页显示条数
 * @param {number} data.pageIndex 第几页
 *
 */
export const getRecruitmentList = (data) => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/getAllPreManufactureInfoForPage',
    method: 'post',
    data
  })
}

/**
 * 获取招聘信息来源
 */
export const getRecruitmentSourceList = () => {
  return axios.request({
    url: 'pretreatment/controller/pretreatmentdictionary/getAllRecruitmentSource',
    method: 'get'
  })
}

/**
 * 获取招聘信息的所有状态
 */
export const getRecruitmentStatusList = () => {
  return axios.request({
    url: 'pretreatment/controller/pretreatmentdictionary/getAllRecruitmentStatus',
    method: 'get'
  })
}

/**
 * 获取所有市
 */
export const getAllCity = () => {
  return axios.request({
    url: 'pretreatment/controller/pretreatmentdictionary/getAllCity',
    method: 'get'
  })
}

/**
 * 单条招聘信息详情
 * @param {object} data
 * @param {number} data.id id
 *
 */
export const getRecruitmentById = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/getPreRecruitmentById',
    method: 'post',
    data
  })
}

/**
 * 保存审核结果
 * @param {object} data
 * @param {number} data.id 招聘id
 * @param {number} data.status 审核结果
 * @param {number} data.auditRemark 审核备注
 * @param {number} data.jobAddrArea 工作地点
 */
export const postPreRecruitment = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/auditPreRecruitment',
    method: 'post',
    data
  })
}

/**
 * 下架招聘
 * @param {object} data
 * @param {number} data.id 招聘id
 */
export const postDownRecruitment = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/lowerShelf',
    method: 'post',
    data
  })
}

/**
 * 获取企业期望薪资（即月薪范围配置
 * @param params
 * @returns {*}
 */
export const getExceptSlaryList = params =>
  axios.request({url: 'pretreatment/controller/preRecruitment/getExceptSlaryList', method: 'get', params})

/**
 * 企业模糊查询
 * @param {object} data
 * @param {string} data.matchName 企业名称
 */
export const getMatchManufacturerByName = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/getMatchManufacturerByName',
    method: 'post',
    data
  })
}

/**
 * 添加招聘信息
 * @param {object} data
 * @param {string} data.matchName 企业名称
 */
export const addRecruitment = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/editPreRecruitment',
    method: 'post',
    data
  })
}

/**
 * 获取企业信息
 * @param {object} data
 * @param {string} data.manufacturerId 企业id
 */
export const getManufacturerById = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/getManufacturerById',
    method: 'post',
    data
  })
}

/**
 * 获取福利待遇列表
 * @param {object} data
 * @param {string} data.manufacturerId 企业id
 */
export const getAllWelfareBase = () => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/getAllWelfareBase',
    method: 'get'

  })
}

/**
 * 删除招聘
 * @param {object} data
 * @param {string} data.manufacturerId 企业id
 */
export const delRecruitment = data => {
  return axios.request({
    url: 'pretreatment/controller/preRecruitment/deletePrePreRecruitmentById',
    method: 'post',
    data
  })
}
/*
* 招聘配置：获取省市
* @param {object}
* @param {number}
*/
export const getAllProvinceAndCity = data => {
  return axios.request({
    url: 'quotation/controller/areadata/getAllProvinceAndCity',
    method: 'get'
  })
}
