import axios from '@/libs/api.request'

/**
 * 添加用户
 * {"username":"agfan",
 * "name":"agfan_xm",
 * "sex":"男",
 * "password":"agfan123",
 * "description":"描述描述描述描述描述描述"}
 */
export function createUser (data) {
  return axios.request({
    url: '/user',
    method: 'post',
    data
  })
}

/**
 * 修改用户
 * {
    "id": 5,
    "username": "test123",
    "name": "test12__3fdsf",
    "sex": "女",
    "description": "阿尔",
    "crtTime": "2017-11-01 14:11:14",
    "crtUser": "1",
    "crtName": "Mr.AG",
    "crtHost": "124.160.88.202",
    "updTime": "2017-11-01 14:11:14",
    "updUser": "1",
    "updName": "Mr.AG",
    "updHost": "124.160.88.202"
    }
 */
export function putUser (data) {
  return axios.request({
    url: '/user/' + data.id,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 * @param uid 用户id
 */
export function delUser (uid) {
  return axios.request({
    url: '/user/' + uid,
    method: 'delete'
  })
}

/**
 * 获取用户列表
 * @param page 当前页
 * @param limit 每页数量
 * @param name 关键词
 */
export function getUserList (query) {
  return axios.request({
    url: '/user/page',
    method: 'get',
    params: query
  })
}

/**
 * 获取菜单树
 */
export function getTree () {
  return axios.request({
    url: '/menu/tree',
    method: 'get'
  })
}

/**
 * 获取某个角色组的菜单权限
 */
export function getMenuAccessByGroupId (id) {
  return axios.request({
    url: '/group/' + id + '/authority/menu',
    method: 'get'
  })
}

/**
 * 获取页面元素列表
 * ?page=1&limit=20&menuId=1
 */
export function getPageElement (query) {
  return axios.request({
    url: '/element/list',
    method: 'get',
    params: query
  })
}

/**
 * 登录
 * /login username,password,codeKey,code
 */
export function postLogin (data) {
  return axios.request({ url: '/api/login', method: 'post', data: data })
}

/**
 * 获取log日志
 * ?page=1&limit=20&menuId=1
 */
export function getLogs (query) {
  return axios.request({
    url: '/admin/gateLog/page',
    method: 'get',
    params: query
  })
}

/**
 * 创建菜单
 * @param {*} query
 * {"code":"topMenu","title":"顶级菜单","parentId":-1,"href":"/topmenu","orderNum":"1","type":"menu"}
 */
export function createMenu (data) {
  return axios.request({
    url: '/menu',
    method: 'post',
    data: data
  })
}

/**
 * 修改菜单
 * @param {*} query
 * {"code":"topMenu","title":"顶级菜单","parentId":-1,"href":"/topmenu","orderNum":"1","type":"menu"}
 */
export function putMenu (data) {
  return axios.request({
    url: '/menu/' + data.id,
    method: 'put',
    data: data
  })
}

/**
 * 删除菜单
 * @param {*} query
 * {"code":"topMenu","title":"顶级菜单","parentId":-1,"href":"/topmenu","orderNum":"1","type":"menu"}
 */
export function delMenu (id) {
  return axios.request({
    url: '/menu/' + id,
    method: 'delete'
  })
}

/**
 * 新建页面按钮或资源
 * @param {*} data
 * {"name":"cdode","sex":"男","code":"code","type":"BUTTON","method":"POST","uri":"/weradfs/asdfasdf/","menuId":29}
 */
export function createElement (data) {
  return axios.request({
    url: '/element',
    method: 'post',
    data: data
  })
}

/**
 * 修改页面按钮或资源
 * @param {*} data
 * {"name":"cdode","sex":"男","code":"code","type":"BUTTON","method":"POST","uri":"/weradfs/asdfasdf/","menuId":29}
 */
export function putElement (data) {
  return axios.request({
    url: '/element/' + data.id,
    method: 'put',
    data: data
  })
}

/**
 * 删除页面按钮或资源
 * @param {*} query
 * {"code":"topMenu","title":"顶级菜单","parentId":-1,"href":"/topmenu","orderNum":"1","type":"menu"}
 */
export function delElement (id) {
  return axios.request({
    url: '/element/' + id,
    method: 'delete'
  })
}

/**
 * 获取角色类型列表
 * @param {*} query
 * ?page=1&limit=20
 */
export function getRoleList (query) {
  return axios.request({
    url: '/groupType/page',
    method: 'get',
    params: query
  })
}

/**
 * 新建角色类型
 * @param {*} data
 * {name: "联系吗电池", sex: "男", description: "微软dsfsaf", code: "uiu12"}
 */
export function createRole (data) {
  return axios.request({
    url: '/groupType',
    method: 'post',
    data: data
  })
}

/**
 * 修改角色类型
 * @param {*} data
 * {name: "联系吗电池", sex: "男", description: "微软dsfsaf", code: "uiu12"}
 */
export function putRole (data) {
  return axios.request({
    url: '/groupType/' + data.id,
    method: 'put',
    data: data
  })
}

/**
 * 删除角色类型
 * @param id
 */
export function delRole (id) {
  return axios.request({
    url: '/groupType/' + id,
    method: 'delete'
  })
}

/**
 * 查询角色组类型
 * @param id
 */
export function getRoleGroup (id) {
  return axios.request({
    url: '/groupType/' + id,
    method: 'delete'
  })
}

/**
 * 查询所有用户组
 */
export function getAllRoleGroup () {
  return axios.request({
    url: '/groupType/all',
    method: 'get'
  })
}

/**
 * 根据角色类型来获取菜单树
 * @param {*} query
 */
export function getTreeByRoleGroupType (query) {
  return axios.request({
    url: '/group/tree',
    method: 'get',
    params: query
  })
}

/**
 * 根据系统类型查找角色树
 * @param {systemId: 1}
 * @returns {*}
 */
const getRolesTreeBySystemId = params => axios.request({url: `/role/tree`, method: 'get', params})

/**
 * 根据角色id获取角色信息
 * @param {roleId: 1}
 * @returns {*}
 */
const getRoleByRoleId = params => axios.request({url: '/role', method: 'get', params})

/**
 * 获取角色组详情
 * @param 角色组id id
 */
export function getRoleGroupDetail (id) {
  return axios.request({
    url: '/group/' + id,
    method: 'get'
  })
}

/**
 * 创建新的角色组
 * {"parentId":-1,"code":"new_role","name":"新角色","description":"创建新的角色","groupType":1}
 */
export function postRoleGroup (data) {
  return axios.request({
    url: '/group',
    method: 'post',
    data: data
  })
}

/**
 * 更新角色组
 * {"id":12,
 * "code":"werwr",
 * "name":"ewrwer",
 * "parentId":4,
 * "path":"/testGroup/visitorRole/werwr",
 * "groupType":1,
 * "crtTime":"2017-11-04 12:28:35",
 * "crtUser":"1",
 * "crtName":"Mr.AG",
 * "crtHost":"171.217.98.17",
 * "updTime":"2017-11-04 12:28:35",
 * "updUser":"1",
 * "updName":"Mr.AG",
 * "updHost":"171.217.98.17",
 * "description":"fdfsf"}
 */
export function putRoleGroup (data) {
  return axios.request({
    url: '/group/' + data.id,
    method: 'put',
    data: data
  })
}

/**
 * 删除角色组
 * {"id":12,
 * "code":"werwr",
 * "name":"ewrwer",
 * "parentId":4,
 * "path":"/testGroup/visitorRole/werwr",
 * "groupType":1,
 * "crtTime":"2017-11-04 12:28:35",
 * "crtUser":"1",
 * "crtName":"Mr.AG",
 * "crtHost":"171.217.98.17",
 * "updTime":"2017-11-04 12:28:35",
 * "updUser":"1",
 * "updName":"Mr.AG",
 * "updHost":"171.217.98.17",
 * "description":"fdfsf"}
 */
export function delRoleGroup (data) {
  return axios.request({
    url: '/group/' + data.id,
    method: 'delete'
  })
}

/**
 * 获取用户组上下级信息
 * @param {*} id 组ID
 */
export function getConnectUser (id) {
  return axios.request({
    url: '/group/' + id + '/user',
    method: 'get'
  })
}

/**
 * 查询用户列表
 * @param {*} name = "hello"
 */
export function getUserByName (query) {
  return axios.request({
    url: '/user/page',
    method: 'get',
    params: query
  })
}

/**
 * 保存用户关联角色
 * @param {string} id - 当前组id
 * @param {object} query - member和leader数据
 */
export function putConnectUser (id, query) {
  return axios.request({
    url: '/group/' + id + '/user',
    method: 'put',
    params: query
  })
}

/**
 * 保存权限分配信息
 * @param {*} id 角色组id
 * @param {*} query menuTrees=13,5,1,6,7
 */
export function postMenuAuthority (id, query) {
  return axios.request({
    url: '/group/' + id + '/authority/menu',
    method: 'post',
    params: query
  })
}

/**
 * 根据菜单id获取页面元素列表
 * @param {*} id 角色组id
 * @param {*} query menuId=6
 */
export function getElementList (query) {
  return axios.request({
    url: '/element/list',
    method: 'get',
    params: query
  })
}

/**
 * 根据菜单id获取页面元素列表
 * @param {*} id 角色组id
 * @param {*} query menuId=6
 */
export function getElementAuthorityList (group_id) {
  return axios.request({
    url: '/group/' + group_id + '/authority/element',
    method: 'get'
  })
}

/**
 * 添加页面元素的权限
 * @param {*} id 角色组id
 * @param {*} query menuId=6
 */
export function postElementAuthority (group_id, query) {
  return axios.request({
    url: '/group/' + group_id + '/authority/element/add',
    method: 'post',
    params: query
  })
}

/**
 * 删除页面元素的权限
 * @param {*} id 角色组id
 * @param {*} query menuId=6
 */
export function delElementAuthority (group_id, query) {
  return axios.request({
    url: '/group/' + group_id + '/authority/element/remove',
    method: 'post',
    params: query
  })
}

/**
 * 获取System list
 * @export
 * @param {any} params
 * @returns
 */
export function ajaxGetSystem (params) {
  return axios.request({
    url: '/authority/controller/system/getSystemForPage',
    method: 'post',
    data: params
  })
}
/**
 * 新建Article
 * @export
 * @param {any} data
 * @returns
 */
export function ajaxPostSystem (data) {
  return axios.request({
    url: '/authority/controller/system/saveSystem',
    method: 'post',
    data: data
  })
}
/**
 * 修改System
 * @export
 * @param {any} data
 * @returns
 */
export function ajaxPutSystem (id, data) {
  return axios.request({
    url: '/system/' + id,
    method: 'post',
    data: data
  })
}
/**
 * 删除System
 * @export
 * @param {any} data
 * @returns
 */
export function ajaxDelSystem (data) {
  return axios.request({
    url: '/authority/controller/system/deleteSystem',
    method: 'post',
    data: data
  })
}

/**
 * 获取角色权限树
 * @export
 * @param {any} params
 * @returns
 */
export function ajaxGetUserGroup (id) {
  return axios.request({
    url: '/authority/user/getUserGroup/' + id,
    method: 'get'
  })
}

/**
 * 对用户进行权限赋值
 * @export
 * @param {any} data
 * @returns
 */
export function ajaxPutUserGroup (data) {
  return axios.request({
    url: '/user/updateUserGroup',
    method: 'put',
    data: data
  })
}

/**
 * 获取所有系统
 * @export
 * @param {any} params
 * @returns
 */
export function ajaxGetAllSystem () {
  return axios.request({
    url: '/authority/system/all',
    method: 'get'
  })
}

/**
 * 获取某个系统下的菜单
 * @export
 * @param {any} params
 * @returns
 */
export function ajaxGetMenuBySystemId (id) {
  return axios.request({ url: `/system/menu/${id}`, method: 'get' })
}

export default {
  createUser,
  putUser,
  delUser,
  getUserList,
  getTree,
  getMenuAccessByGroupId,
  getPageElement,
  postLogin,
  getLogs,
  createMenu,
  putMenu,
  delMenu,
  createElement,
  putElement,
  delElement,
  getRoleList,
  getRolesTreeBySystemId,
  getRoleByRoleId,
  createRole,
  putRole,
  delRole,
  getRoleGroup,
  getAllRoleGroup,
  getTreeByRoleGroupType,
  getRoleGroupDetail,
  postRoleGroup,
  putRoleGroup,
  delRoleGroup,
  getConnectUser,
  getUserByName,
  putConnectUser,
  postMenuAuthority,
  getElementList,
  getElementAuthorityList,
  postElementAuthority,
  delElementAuthority,
  ajaxGetSystem,
  ajaxPostSystem,
  ajaxPutSystem,
  ajaxDelSystem,
  ajaxGetUserGroup,
  ajaxPutUserGroup,
  ajaxGetAllSystem,
  ajaxGetMenuBySystemId
}
