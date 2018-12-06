/**
 * 人员管理
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/person',
  timeout: window.global.timeout
})

/* 公用 */
// 根据名称查人员列表
export const getPersonListByPersonName = params => { return instance.post('getPersonListByPersonName', params) }
// 根据名称查组织列表
export const getOrganizationListByName = params => { return instance.post('getOrganizationListByName', params) }
// 根据组织和内容 获取人员列表
export const getPersonListByConditions = params => { return instance.post('getPersonListByConditions', params) }

// 获取部门加人员列表
export const getPersonList = params => { return instance.post('getPersonList', params) }
// 获取人员列表
export const getCurrentOrganizationList = params => { return instance.post('getCurrentOrganizationPersonList', params) }
// 获取所有部门
export const getDeptList = params => { return instance.post('getDeptList', params) }
// 搜索人员
export const getPersonFuzzy = params => { return instance.post('getPersonFuzzy', params) }
// 奖惩记录 -- 列表
export const getRewardsList = params => { return instance.post('getRewardsList', params) }

/* 人员台账 */
  // 获取人员台账列表
export const getAllPerson = params => { return instance.post('getPersonList', params) }
// 获取单个人员信息
export const singlePerson = params => { return instance.post('getPersonById', params) }
// 更新人员信息
export const updatePerson = params => { return instance.post('updatePerson', params) }
// 获取人员类型列表
export const getPersonType = params => { return instance.post('getPersonType', params) }
// 获取人员奖惩记录   见公用
// 获取人员培训记录
export const getPersonalTrainList = params => { return instance.post('getPersonalTrainList', params) }

/* 培训管理 */

// 培训管理 -- 培训计划，培训记录列表
export const getTrainList = params => { return instance.post('getTrainList', params) }
// 培训管理 -- 新增计划
export const addTrain = params => { return instance.post('addTrain', params) }
// 培训管理 -- 删除计划
export const delTrainPlan = params => { return instance.post('delTrainPlan', params) }
// 培训管理 -- 修改计划
export const updateTrain = params => { return instance.post('updateTrain', params) }
// 培训管理 -- 培训登记
export const registerTrain = params => { return instance.post('registerTrain', params) }
// 培训管理 -- 培训登记更新
export const updateTrainRecord = params => { return instance.post('updateTrainRecord', params) }
// 培训管理 -- 删除培训记录
export const deleteRecord = params => { return instance.post('deleteRecord', params) }
// 培训管理 -- 导出
export const trainExport = params => { return instance.post('export', params) }

/* 奖惩管理 */

// 奖惩记录 -- 新增
export const addRewards = params => { return instance.post('addRewards', params) }
// 奖惩记录 -- 删除
export const deleteRewards = params => { return instance.post('deleteRewards', params) }
// 奖惩记录 -- 修改
export const updateRewards = params => { return instance.post('updateRewards', params) }

