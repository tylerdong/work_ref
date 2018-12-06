/**
 * 消息通知
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.physicalAjaxBaseUrl + 'api/lab/message/',
  timeout: window.global.timeout
})

// 分页接收消息
export const getMessageReceiveList = params => { return instance.post('getMessageReceiveList', params) }

// 查看接收消息的详情
export const getMessageReceiveById = params => { return instance.post('getMessageReceiveById', params) }

// 分页发布消息
export const getMessageSenderList = params => { return instance.post('getMessageSenderList', params) }

// 查看发布消息的详情
export const getMessageSenderById = params => { return instance.post('getMessageSenderById', params) }

// 查看未读消息
export const getMessageReceiveListByNoRead = params => { return instance.post('getMessageReceiveListByNoRead', params) }

// 发布消息
export const senderMessage = params => { return instance.post('senderMessage', params) }

