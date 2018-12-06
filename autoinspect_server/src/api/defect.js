import instance from './hook-instance'
// 获取缺陷
export const getBatchList = params => { return instance.post('batch/getBatchList', params) }
export const getDefectList = params => { return instance.post('defect/getDefectList', params) }
export const getImgByDefectId = params => { return instance.post('defect/getImgByDefectId', params) }
export const getImgByDefectIdAndIndex = params => { return instance.post('defect/getImgByDefectIdAndIndex', params) }
export const getBatches = params => { return instance.post('batch/getBatches', params) }
export const getAllDefectType = params => { return instance.post('defect/getAllDefectType', params) }
export const getDefectSumByBatch = params => { return instance.post('defectInfo/getDefectSumByBatch', params) }
export const getBatchSum = params => { return instance.post('defectInfo/getBatchSum', params) }

export const getListByLineCode = params => { return instance.post('log/getListByLineCode', params) }
export const downLoadLogFile = params => { return instance.post('log/downLoadLogFile', params) }
export const preRead = params => { return instance.get(`log/preRead?lineCode=${params.lineCode}&fileName=${params.fileName}&lineNumber=${params.lineNumber}`) }

export const getServer = params => { return instance.post('server/getServer', params) }
export const saveServer = params => { return instance.post('server/saveServer', params) }
export const getDataSynStatus = params => { return instance.post('monitor/getDataSynStatus', params) }

export const login = params => { return instance.post('user/login', params) }
export const getSysUserList = params => { return instance.post('user/getSysUserList', params) }
export const addSysUser = params => { return instance.post('user/addSysUser', params) }
export const updateSysUser = params => { return instance.post('user/updateSysUser', params) }
export const deleteSysUser = params => { return instance.post('user/deleteSysUser', params) }

export const getLine = params => { return instance.post('line/getLine', params) }
export const pcsAddLine = params => { return instance.post('line/pcsAddLine', params) }
export const pcsUpdateLine = params => { return instance.post('line/pcsUpdateLine', params) }
