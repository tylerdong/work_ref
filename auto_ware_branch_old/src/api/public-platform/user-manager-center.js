/**
 * Created by Administrator on 2017/3/24.
 */
import axios from 'axios'
import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()
var instance = axios.create({
  baseURL: window.global.ajaxPublicPlatformBaseUrl + 'api/system/managerUser',
  timeout: window.global.timeout
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// 获取person列表接口（无分页）
export const getPersonListByNoPage = params => { return instance.post('getPersonListByNoPage', params) }

// 登录管理者
// 请求参数: account: ,password: , verCode:
export const managerUserLogin = params => { return instance.post('managerUserLogin', params) }

// 注册管理者
// 请求参数：account:, password:
export const adminRegister = params => { return instance.post('registerManagerUser', params) }

// 查看用户信息
// 请求参数：accessToken: , userId:"用户id"，usetType:"用户类型"
export const userInfor = params => { return instance.post('getUser', params) }

// 校验用户帐号
// accessToken:, account:
export const adminCheckUser = params => { return instance.post('user/username/check', params) }

// 修改用户
// accessToken:, userId:用户id, name:用户名, organizationId:用户部门id, roleId:角色id, descripe:描述
export const adminUpdateUser = params => { return instance.post('user/update', params) }

// 查询用户组织接口
export const adminOrganicUser = params => { return instance.post('user/organization', params) }

// 查询用户或管理员详情
// accessToken:, userId:用户id, usetType:用户类型, pageIndex:当前页数
export const adminDetailUser = params => { return instance.post('getUser', params) }

// =================================   管理员列表   ===============================
// 查询管理员列表
// {pageIndex:"当前页数",pageCount:"每页条数"}
export const adminListUser = params => { return instance.post('getManageUserList', params) }

// 新增管理员
// {"account":"账号名称" "password":"密码" "name":"1"  "describe":"1"}
export const addAdminUser = params => { return instance.post('addManagerUser', params) }

// 删除管理员
// {"manageUserId":"管理员id",superManageUserId:"用户id"}
export const delAdminUser = params => { return instance.post('deleteManageUserById', params) }

// 激活普通管理员申请
// {accessToken:,systemId:"子系统id",superManageUserId:"用户id",manageUserId:"管理员id"}
export const adminSuperAudit = params => { return instance.post('activationManageUser', params) }

// =================================   用户列表   ===============================
// 查询用户列表
// 请求参数：accessToken: , pageIndex: 当前页数 , pageCount: 每页条数
export const normalUserList = params => { return instance.post('getUserList', params) }

// 新增用户
// accessToken:, account:用户账号, name:用户名, organizationId:用户部门id, descripe:描述
export const adminAddUser = params => { return instance.post('addUser', params) }

// 删除用户
// accessToken:, userId:用户id
export const adminDeleteUser = params => { return instance.post('delUser', params) }

// 删除用户
// accessToken:, userId:用户id
export const deleteUserByIds = params => { return instance.post('deleteUserByIds', params) }

// 激活用户
// 请求参数 {systemId:"申请子系统id",userId:"用户id"}
export const adminActiveUser = params => { return instance.post('activationUserByUserId', params) }

// ==========================================用户绑定==============================================//
// 绑定列表
export const getUserPersonList = params => { return instance.post('getUserPersonList', params) }

// 解绑
export const deleteUserPersonById = params => { return instance.post('deleteUserPersonById', params) }
// 绑定用户和人员
export const bandingUserPerson = params => { return instance.post('bandingUserPerson', params) }
// =================================   用户角色管理   ===============================
// 根据userId获取角色信息【未调用】
// 请求参数：accessToken:, userId:用户id
export const adminUserRole = params => { return instance.post('getListUserRoleByUserId', params) }

// 查询用户还能授权的角色信息以及用户现有的角色信息【未调用】
// {"userId":"1703405085066788897"}
export const adminGetListExistedAndNoHaveUserRoleMap = params => { return instance.post('getListExistedAndNoHaveUserRoleMap', params) }

// =================================   角色权限管理   ===============================

// =================================   访问管理   ===============================
// 查询用户绑定子系统模块信息
// {"manUserId":"用户id"}
export const getManageUserBindList = params => { return instance.post('getManageUserBindList', params) }
// 用户子系统绑定模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const bindSubsystemModule = params => { return instance.post('bindSubsystemModule', params) }
// 用户子系统解绑模块
// {"manUserId":"用户id","subsystemModuleId":"子系统模块对应关系id"}
export const unbindSubsystemModule = params => { return instance.post('unbindSubsystemModule', params) }

// 管理员修改密码
export const updatePasswordByManageUserId = params => { return instance.post('updatePasswordByManageUserId', params) }
