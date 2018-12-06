import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
let instance = axios.create({
  baseURL: window.global.chemicalAjaxBaseUrl + 'api/lab/report/labFileController',
  timeout: window.global.timeout,
  headers: {'Content-Type': 'application/json'}
})

// 保存文件
export const saveLabFile = param => { return instance.post('saveLabFile', param) }

// 预览文件
export const getLabFile = param => {
  return instance.get('getLabFile?id=' + param.id)
}

// 预览word格式文件
export const getLabFileIsWord = param => {
  return instance.get('getLabFileIsWord?id=' + param.id)
}

// 删除文件
export const delLabFile = param => {
  return instance.post('delLabFile', param)
}

// 查询当前分类文件列表
export const getAllLabFileDos = param => {
  return instance.post('getAllLabFileDos', param)
}

// 共享文件展示接口
export const getDisplayLabFileDos = param => {
  return instance.post('getDisplayLabFileDos  ', param)
}
// 是否展示共享文件
export const changeDisplayLabFileDo = param => {
  return instance.post('changeDisplayLabFileDo  ', param)
}
