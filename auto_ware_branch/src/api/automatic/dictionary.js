/**
 * Created by gelingyan on 2017/6/8.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/automaticintegration/dataDictionary',
  timeout: window.global.timeout
})

/* 添加叉车类型 */
export const addForkliftClassify = params => { return instance.post('addForkliftClassify', params) }
/* 分页获取叉车类型 */
export const getForkliftClassifyList = params => { return instance.post('getForkliftClassifyList', params) }
/* 修改叉车类型 */
export const updateForkliftClassify = params => { return instance.post('updateForkliftClassify', params) }
/* 获取所有叉车类型 */
export const getAllForkliftClassifyList = params => { return instance.post('getAllForkliftClassifyList', params) }

/* 添加车间 */
export const addWorkshop = params => { return instance.post('addWorkshop', params) }
/* 分页获取车间 */
export const getWorkshopList = params => { return instance.post('getWorkshopList', params) }
/* 所有车间 */
export const getAllWorkshopList = params => { return instance.post('getAllWorkshopList', params) }
/* 修改车间 */
export const updateWorkshop = params => { return instance.post('updateWorkshop', params) }

/* 添加工种 */
export const addWorkType = params => { return instance.post('addWorkType', params) }
/* 分页获取工种 */
export const getWorkTypeList = params => { return instance.post('getWorkTypeList', params) }
/* 获取所有工种 */
export const getAllWorkTypeList = params => { return instance.post('getAllWorkTypeList', params) }
/* 修改工种 */
export const updateWorkType = params => { return instance.post('updateWorkType', params) }

/* 添加职位 */
export const addPosition = params => { return instance.post('addPosition', params) }
/* 分页获取职位 */
export const getPositionList = params => { return instance.post('getPositionList', params) }
/* 获取所有职位 */
export const getAllPositionList = params => { return instance.post('getAllPositionList', params) }
/* 修改职位 */
export const updatePosition = params => { return instance.post('updatePosition', params) }

/* 添加降等原因类别 */
export const addDownGradeReasonType = params => { return instance.post('addDownGradeReasonType', params) }
/* 分页获取降等原因类别 */
export const getDownGradeReasonTypeList = params => { return instance.post('getDownGradeReasonTypeList', params) }
/* 获取所有降等原因类别 */
export const getAllDownGradeReasonTypeList = params => { return instance.post('getAllDownGradeReasonTypeList', params) }
/* 修改降等原因类别 */
export const updateDownGradeReasonType = params => { return instance.post('updateDownGradeReasonType', params) }

/* 添加产品工艺 */
export const addProductProcess = params => { return instance.post('addProductProcess', params) }
/* 分页获取产品工艺 */
export const getProductProcessList = params => { return instance.post('getProductProcessList', params) }
/* 获取所有产品工艺 */
export const getAllProductProcessList = params => { return instance.post('getAllProductProcessList', params) }
/* 修改产品工艺 */
export const updateProductProcess = params => { return instance.post('updateProductProcess', params) }
/* 工艺编号 唯一性检测 */
export const checkProductProcessNumber = params => { return instance.post('checkProductProcessNumber', params) }

/* 添加纸管信息 */
export const addPaperTube = params => { return instance.post('addPaperTube', params) }
/* 分页获取纸管信息 */
export const getPaperTubeList = params => { return instance.post('getPaperTubeList', params) }
/* 获取所有纸管信息 */
export const getAllPaperTubeList = params => { return instance.post('getAllPaperTubeList', params) }
/* 修改纸管信息 */
export const updatePaperTube = params => { return instance.post('updatePaperTube', params) }

/* 添加丝锭批号 */
export const addBatch = params => { return instance.post('addBatch', params) }
/* 分页获取丝锭批号 */
export const getBatchList = params => { return instance.post('getBatchList', params) }
/* 获取所有丝锭批号 */
export const getAllBatchList = params => { return instance.post('getAllBatchList', params) }
/* 修改丝锭批号 */
export const updateBatch = params => { return instance.post('updateBatch', params) }
// 模糊查询批号
export const fuzzyQueryBatchNo = params => { return instance.post('fuzzyQueryBatchNo', params) }
// 模糊查询规格
export const fuzzyQuerySpec = params => { return instance.post('fuzzyQuerySpec', params) }

/* 添加班次 */
export const addClasses = params => { return instance.post('addClasses', params) }
/* 分页获取班次 */
export const getClassesList = params => { return instance.post('getClassesList', params) }
/* 获取所有班次 */
export const getAllClassesList = params => { return instance.post('getAllClassesList', params) }
/* 根据线别获取打印机 */
export const getPrintListByWorkshopId = params => { return instance.post('getPrintListByWorkshopId', params) }
/* 修改班次 */
export const updateClasses = params => { return instance.post('updateClasses', params) }

/* 添加丝锭规格 */
export const addSpec = params => { return instance.post('addSpec', params) }
/* 分页获取丝锭规格 */
export const getSpecList = params => { return instance.post('getSpecList', params) }
/* 获取所有丝锭规格 */
export const getAllSpecList = params => { return instance.post('getAllSpecList', params) }
/* 修改丝锭规格 */
export const updateSpec = params => { return instance.post('updateSpec', params) }

/* 分页获取打印机 */
export const getPrintList = params => { return instance.post('getPrintList', params) }
/* 获取所有打印机 */
// export const getPrintList = params => { return instance.post('getPrintList', params) }
/* 添加打印机 */
export const addPrint = params => { return instance.post('addPrint', params) }
/* 修改打印机 */
export const updatePrint = params => { return instance.post('updatePrint', params) }

/* 分页获取丝锭锭重 */
export const getWeightList = params => { return instance.post('getSilkWeightList', params) }
/* 获取所有丝锭锭重 */
export const getAllSilkWeightList = params => { return instance.post('getAllSilkWeightList', params) }
/* 添加丝锭锭重 */
export const addWeight = params => { return instance.post('addSilkWeight', params) }
/* 修改丝锭锭重 */
export const updateWeight = params => { return instance.post('updateSilkWeight', params) }

/* 分页获取产品分类 */
export const getProductTypeList = params => { return instance.post('getProductTypeList', params) }
/* 获取所有产品分类 */
export const getAllProductTypeList = params => { return instance.post('getAllProductTypeList', params) }
/* 添加产品分类 */
export const addProductType = params => { return instance.post('addProductType', params) }
/* 修改产品分类 */
export const updateProductType = params => { return instance.post('updateProductType', params) }

/* 分页获取丝锭等级 */
export const getSilkGradeList = params => { return instance.post('getSilkGradeList', params) }
/* 获取所有丝锭等级 */
export const getAllSilkGradeList = params => { return instance.post('getAllSilkGradeList', params) }
/* 添加丝锭等级 */
export const addSilkGrade = params => { return instance.post('addSilkGrade', params) }
/* 修改丝锭等级 */
export const updateSilkGrade = params => { return instance.post('updateSilkGrade', params) }

/* 分页获取异常等级 */
export const getExceptionLevelList = params => { return instance.post('getExceptionLevelList', params) }
/* 添加异常等级 */
export const addExceptionLevel = params => { return instance.post('addExceptionLevel', params) }
/* 修改异常等级 */
export const updateExceptionLevel = params => { return instance.post('updateExceptionLevel', params) }
/* 获取所有异常等级 */
export const getAllExceptionLevelList = params => { return instance.post('getAllExceptionLevelList', params) }

/* 添加染判等级 */
export const addSentenceLevel = params => { return instance.post('addSentenceLevel', params) }
/* 修改染判等级 */
export const updateSentenceLevel = params => { return instance.post('updateSentenceLevel', params) }
/* 获取所有染判等级 */
export const getAllSentenceLevelList = params => { return instance.post('getAllSentenceLevelList', params) }
/* 校验染判等级 */
export const checkSentenceLevelName = params => { return instance.post('checkSentenceLevelName', params) }

/* 饶卷备注 */
export const addWindRemark = params => { return instance.post('addWindRemark', params) }
export const updateWindRemark = params => { return instance.post('updateWindRemark', params) }
export const checkNumber = params => { return instance.post('checkNumber', params) }
export const checkName = params => { return instance.post('checkName', params) }
export const getWindRemarkList = params => { return instance.post('getWindRemarkList', params) }
export const getAllWindRemarkList = params => { return instance.post('getAllWindRemarkList', params) }

/* 添加类别 */
export const addKind = params => { return instance.post('addKind', params) }
/* 删除类别 */
export const deleteKind = params => { return instance.post('deleteKind', params) }
/* 分页获取所有种类列表 */
export const getAllKindList = params => { return instance.post('getAllKindList', params) }
/* 不分页获取所有种类列表 */
export const getKindList = params => { return instance.post('getKindList', params) }
/* 修改种类 */
export const updateKind = params => { return instance.post('updateKind', params) }

// 添加丝锭绑定规则
export const addSilkBindRules = params => { return instance.post('addSilkBindRules', params) }
export const updateSilkBindRules = params => { return instance.post('updateSilkBindRules', params) }
export const getSilkBindRules = params => { return instance.post('getSilkBindRules', params) }
export const getSilkBindRulesDetail = params => { return instance.post('getSilkBindRulesDetail', params) }
export const deleteSilkBindRule = params => { return instance.post('deleteSilkBindRule', params) }
