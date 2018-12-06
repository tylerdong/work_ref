/*
 * 二期 奖惩管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labUserRewardsController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 奖惩管理 新增
export const createLabUserRewardsDo = params => {
  return instance.post('createLabUserRewardsDo', params)
}

// 奖惩管理 更新
export const updateLabUserRewardsDo = params => {
  return instance.post('updateLabUserRewardsDo', params)
}

// 奖惩管理 删除
export const deleteLabUserRewardsDo = params => {
  return instance.post('deleteLabUserRewardsDo', params)
}

// 奖惩管理 列表
export const getLabUserRewardsDoList = params => {
  return instance.post('getLabUserRewardsDoList', params)
}
