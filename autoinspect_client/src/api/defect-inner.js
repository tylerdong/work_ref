import axios from 'axios'
const instance = axios.create({
  baseURL: window.global.ajaxDefectInnerUrl + 'controller',
  timeout: window.global.timeout
})
// 获取缺陷
export const getBatchInfoList = params => { return instance.post('batchInfo/getBatchInfoList', params) }
export const getBatchSum = params => { return instance.post('batchInfo/getBatchSum', params) }
export const getCurrentBatchSum = params => { return instance.post('batchInfo/getCurrentBatchSum', params) }
export const getDefectInfoList = params => { return instance.post('defectInfo/getDefectInfoList', params) }
export const getLastOrNextDefect = params => { return instance.post('defectInfo/getLastOrNextDefect', params) }
export const getImgByDefectId = params => { return instance.post('defectInfo/getImgByDefectId', params) }
export const getImgByDefectIdAndIndex = params => { return instance.post('defectInfo/getImgByDefectIdAndIndex', params) }
export const updateDefect = params => { return instance.post('defectInfo/updateDefect', params) }
export const exportDefectExcel = params => { return instance.post('defectInfo/exportDefectExcel', params, {responseType: 'arraybuffer'}) }
export const getDefectSumByBatch = params => { return instance.post('defectInfo/getDefectSumByBatch', params) }
export const getBatches = params => { return instance.post('batchInfo/getBatches', params) }
export const getAllDefectType = params => { return instance.post('defectInfo/getAllDefectType', params) }
export const getAllTbueColour = params => { return instance.post('tubecolour/getAllTbueColour', params) }
export const insertBasicBatch = params => { return instance.post('basicbatch/insertBasicBatch', params) }
export const updateBasicBatch = params => { return instance.post('basicbatch/updateBasicBatch', params) }
export const deleteBasicBatch = params => { return instance.post('basicbatch/deleteBasicBatch', params) }
export const getAllPcBasicBatch = params => { return instance.post('basicbatch/getAllPcBasicBatch', params) }
export const saveLineConfig = params => { return instance.post('lineconfig/saveLineConfig', params) }
export const getLineConfig = params => { return instance.post('lineconfig/getLineConfig', params) }
export const getSendwachatRecord = params => { return instance.post('sendwachat/getSendwachatRecord', params) }
export const getSendType = params => { return instance.post('sendwachat/getSendType', params) }
export const getDefectCameraMap = params => { return instance.post('defectcameramap/getDefectCameraMap', params) }
export const saveDefectCameraMap = params => { return instance.post('defectcameramap/saveDefectCameraMap', params) }
