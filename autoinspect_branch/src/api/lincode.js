import axios from 'axios'
const instance = axios.create({
  baseURL: window.global.ajaxDefectInnerUrl + 'controller',
  timeout: window.global.timeout
})

export const saveLineConfig = params => { return instance.post('lineconfig/saveLineConfig', params) }
export const getLineConfig = params => { return instance.post('lineconfig/getLineConfig', params) }
