/*
 * @Author: dongweiliang@gmail.com
 * @Date: 2019-02-20 16:15:28
 * @LastEditors: dongweiliang@gmail.com
 * @LastEditTime: 2019-02-21 13:39:24
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
