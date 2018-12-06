/* 文档管理 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/document',
  timeout: window.global.timeout
})

// 获取文档分类
export const getDocumentTypeListNoPage = params => {
  return instance.post('getDocumentTypeListNoPage', params)
}

// 新增文档
// 请求参数:{\"typeId\":\"文档类型Id\",\"fileId\":\"上传文件Id\",\"checkPersonId\":\"查看权限\",\"uploadPersonId\":\"下载权限\",\"deletePersonId\":\"归档权限\",\"creatorId\":\"上传人Id\",\"createTime\":\"上传时间\"}
export const addDocumentManage = params => {
  return instance.post('addDocumentManage', params)
}

// 上传文件
export const addDocumentMeta = params => {
  return instance.post('addDocumentMeta', params)
}

// 新增文档分类
// 请求参数:{"name":"分类名称","fatherId":"节点Id","userId":"登录人员Id"}
export const addDocumentType = params => {
  return instance.post('addDocumentType', params)
}
// 删除文档分类
// 请求参数:{"id":"编号"}
export const deleteDocumentType = params => {
  return instance.post('deleteDocumentType', params)
}
// 更新文档分类
// 请求参数:{"id":"编号","name":"名称","fatherId":"父节点Id","personId":"登录人员Id"}
export const updateDocumentType = params => {
  return instance.post('updateDocumentType', params)
}

// =================================   文档   ===============================

// 文档列表左侧
// 请求参数:{"fatherId":"文档类型Id"，"userId":"userId"}
export const getDocumentManageLeft = params => {
  return instance.post('getDocumentManageLeft', params)
}

// 分页查看文档
// 请求参数:{"pageIndex":"页数","pageCount":"每页数量","userId":"登陆人员Id","fileName":"文档标题"}
export const getDocumentManageList = params => {
  return instance.post('getDocumentManageList', params)
}

// 下载文件
export const downLoad = params => {
  return instance.post('downLoad', params)
}
// 文件归档
export const addDocumentArchive = params => {
  return instance.post('addDocumentArchive', params)
}

// 档案库--分页获取
export const getDocumentArchiveList = params => {
  return instance.post('getDocumentArchiveList', params)
}
