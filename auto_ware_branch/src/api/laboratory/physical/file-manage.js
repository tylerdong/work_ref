/**
 * 原始记录单管理
 * */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let fileInstance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/file',
  timeout: window.global.timeout
})

// 原始记录单模板管理/新增/编辑模板信息/上传pdf
export const uploadOriginalTemplate = params => {
  return fileInstance.post('upload', params)
}

// 原始记录单模板管理/新增/编辑模板信息/下载pdf截图
export const downloadFdfToJpg = params => {
  return fileInstance.post('downloadFdfToJpg', params)
}

// 下载文件
export const download = params => {
  return fileInstance.post('download', params)
}

// 预览
export const preView = params => {
  return fileInstance.get('preView', {params})
}
