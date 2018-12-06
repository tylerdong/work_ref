import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/system/roleManagerbindSubsystemModule',
  timeout: window.global.timeout
})
// 用户子系统解绑模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const unbindSubsystemModule = params => { return instance.post('unbindSubsystemModule', params) }
// 用户子系统绑定模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const bindSubsystemModule = params => { return instance.post('bindSubsystemModule', params) }
