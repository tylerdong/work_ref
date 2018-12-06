/* mdm管理 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxMdmBaseUrl + 'api/automaticintegration',
  timeout: window.global.timeout
})

/* -------------------------------------------------组织-------------------------------------------------- */
export const getOrganizationList = params => { return instance.post('dataDictionary/getOrganizationList', params) }
export const addOrganization = params => { return instance.post('dataDictionary/addOrganization', params) }
export const updateOrganization = params => { return instance.post('dataDictionary/updateOrganization', params) }

/* 分页获取班次 */
export const getClassesList = params => { return instance.post('dataDictionary/getClassesList', params) }
/* 更新班次 */
export const updateClasses = params => { return instance.post('dataDictionary/updateClasses', params) }
/* 添加班次 */
export const addClasses = params => { return instance.post('dataDictionary/addClasses', params) }

/* 添加职位 */
export const addPosition = params => { return instance.post('dataDictionary/addPosition', params) }
/* 分页获取职位 */
export const getPositionList = params => { return instance.post('dataDictionary/getPositionList', params) }
/* 获取所有职位 */
export const getAllPositionList = params => { return instance.post('dataDictionary/getAllPositionList', params) }
/* 修改职位 */
export const updatePosition = params => { return instance.post('dataDictionary/updatePosition', params) }

/* 分页获取工种 */
export const getWorkTypeList = params => { return instance.post('dataDictionary/getWorkTypeList', params) }
/* 添加工种 */
export const addWorkType = params => { return instance.post('dataDictionary/addWorkType', params) }
/* 修改工种 */
export const updateWorkType = params => { return instance.post('dataDictionary/updateWorkType', params) }

/* 分页获取丝锭锭重 */
export const getWeightList = params => { return instance.post('dataDictionary/getSilkWeightList', params) }
/* 获取所有丝锭锭重 */
export const getAllSilkWeightList = params => { return instance.post('dataDictionary/getAllSilkWeightList', params) }
/* 添加丝锭锭重 */
export const addWeight = params => { return instance.post('dataDictionary/addSilkWeight', params) }
/* 修改丝锭锭重 */
export const updateWeight = params => { return instance.post('dataDictionary/updateSilkWeight', params) }

/* 分页获取产品分类 */
export const getProductTypeList = params => { return instance.post('dataDictionary/getProductTypeList', params) }
/* 获取所有产品分类 */
export const getAllProductTypeList = params => { return instance.post('dataDictionary/getAllProductTypeList', params) }
/* 添加产品分类 */
export const addProductType = params => { return instance.post('dataDictionary/addProductType', params) }
/* 修改产品分类 */
export const updateProductType = params => { return instance.post('dataDictionary/updateProductType', params) }

/* 添加产品工艺 */
export const addProductProcess = params => { return instance.post('dataDictionary/addProductProcess', params) }
/* 分页获取产品工艺 */
export const getProductProcessList = params => { return instance.post('dataDictionary/getProductProcessList', params) }
/* 获取所有产品工艺 */
export const getAllProductProcessList = params => { return instance.post('dataDictionary/getAllProductProcessList', params) }
/* 修改产品工艺 */
export const updateProductProcess = params => { return instance.post('dataDictionary/updateProductProcess', params) }
/* 工艺编号 唯一性检测 */
export const checkProductProcessNumber = params => { return instance.post('dataDictionary/checkProductProcessNumber', params) }

/* 添加降等原因类别 */
export const addDownGradeReason = params => { return instance.post('dataDictionary/addDownGradeReason', params) }
/* 分页获取降等原因类别 */
export const updateDownGradeReason = params => { return instance.post('dataDictionary/updateDownGradeReason', params) }
/* 获取所有降等原因类别 */
export const getAllDownGradeReasonTypeList = params => { return instance.post('dataDictionary/getAllDownGradeReasonTypeList', params) }
/* 修改降等原因类别 */
export const updateDownGradeReasonType = params => { return instance.post('dataDictionary/updateDownGradeReasonType', params) }
export const addDownGradeReasonType = params => { return instance.post('dataDictionary/addDownGradeReasonType', params) }
export const getDownGradeReasonList = params => { return instance.post('dataDictionary/getDownGradeReasonList', params) }
/* 获取所有异常等级 */
export const getAllExceptionLevelList = params => { return instance.post('dataDictionary/getAllExceptionLevelList', params) }
/* 分页获取丝锭等级 */
export const getSilkGradeList = params => { return instance.post('dataDictionary/getSilkGradeList', params) }
/* 获取所有丝锭等级 */
export const getAllSilkGradeList = params => { return instance.post('dataDictionary/getAllSilkGradeList', params) }
/* 添加丝锭等级 */
export const addSilkGrade = params => { return instance.post('dataDictionary/addSilkGrade', params) }
/* 修改丝锭等级 */
export const updateSilkGrade = params => { return instance.post('dataDictionary/updateSilkGrade', params) }

export const getDownGradeReasonTypeList = params => { return instance.post('dataDictionary/getDownGradeReasonTypeList', params) }

/* -------------------------------------工厂配置-------------------------------------- */
export const selectFactory = pararms => { return instance.post('factory/selectFactory', pararms) }
