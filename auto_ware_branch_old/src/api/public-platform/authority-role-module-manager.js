/**
 * Created by ndong on 2017-06-16.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxAutomatictBaseUrl + 'api/system/roleManager',
  timeout: window.global.timeout
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})
// =================================   模块管理   ===============================
// 增加模块
// {name:"123",describe:"描述",subsystemId:"验证码"}
export const superAddModule = params => { return instance.post('addModule', params) }

// 删除模块
// {moduleId:"模块ID"}
export const superDelModule = params => { return instance.post('deleteModuleById', params) }

// 更新模块
// {moduleId:"模块id",name:"名字"，subsystemId："子系统ID",describe:"描述"}
export const superUpdateModule = params => { return instance.post('updateModuleById', params) }

// 获取模块列表
// {moduleId:"模块id",name:"名字"，subsystemId："子系统ID",describe:"描述"}
export const superModuleList = params => { return instance.post('getModuleList', params) }

// =================================   权限管理   ===============================
// 获取权限列表
// accessToken:,"userType":"123","pageIndex":"1"
export const adminPrivilegeList = params => { return instance.post('getPrivilegeList', params) }

// 添加权限
// ccessToken:, name:权限名称, descripe:描述
export const adminPrivilegeAdd = params => { return instance.post('addPrivilege', params) }

// 更新权限
// accessToken: , Id: 权限id
export const modifyPrivilege = params => { return instance.post('updatePrivilegeById', params) }

// 删除权限
// {"id":"123"}
export const deletePrivilege = params => { return instance.post('deletePrivilegeByIds', params) }

// =================================   角色管理   ===============================
// 获取角色列表
// accessToken:,"userType":"123","pageIndex":"1"
export const adminRoleList = params => { return instance.post('getRoleList', params) }

// 添加角色
// accessToken: , Id:角色id, name:角色名称, descripe:描述, privilegeId：权限id
export const adminRoleAdd = params => { return instance.post('addRole', params) }

// 更新角色
// accessToken: , Id:角色id, name:角色名称, descripe:描述,
export const adminModifyRole = params => { return instance.post('updateRoleById', params) }

// 删除角色
// "id":"123"
export const deleteRole = params => { return instance.post('deleteRoleByIds', params) }

// =================================   角色权限管理   ===============================
// 所有的模块
export const getListAllModule = params => { return instance.post('getModuleListByNoPage', params) }

// 所有的权限
export const getListAllPrivilege = params => { return instance.post('getPrivilegeListNoPage', params) }

// 当前角色 添加权限
export const addPrivilegeRoleMap = params => { return instance.post('addPrivilegeRoleMap', params) }

// 当前角色 删除权限
export const deletePrivilegeRoleMapByPriId = params => { return instance.post('deletePrivilegeRoleMapByPriId', params) }

// 当前角色  所拥有的权限
export const getListPrivilegeRoleMap = params => { return instance.post('getPrivilegeRoleMapListByRoleId', params) }

// 当前权限  所拥有的模块
export const getListModulePrivilegeMap = params => { return instance.post('getModuleListByPrivilegeId', params) }

// 当前权限 添加模块
export const addModulePrivilegeMap = params => { return instance.post('addModulePrivilegeMap', params) }

// 当前权限 删除模块
export const deleteModulePrivilegeMapByPriId = params => { return instance.post('deleteModulePrivilegeMapByPrivilegeId', params) }

// 查询用户绑定子系统模块信息
// {"manUserId":"用户id"}
export const getManageUserBindList = params => { return instance.post('getManageUserBindList', params) }
// 用户子系统解绑模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const unBindSubSystemAndModule = params => { return instance.post('unBindSubSystemAndModule', params) }
// 用户子系统绑定模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const bindingSubsystemsAndModules = params => { return instance.post('BindingSubsystemsAndModules', params) }
