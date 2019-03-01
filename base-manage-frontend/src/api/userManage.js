import axios from '@/libs/api.request'

export function getUserList (query) {
  return axios.request({
    url: '/authority/controller/user/getUserForPage',
    method: 'post',
    data: query
  })
}
export function createUser (query) {
  return axios.request({
    url: '/authority/controller/user/createUser',
    method: 'post',
    data: query
  })
}
export function putUser (data) {
  return axios.request({
    url: '/authority/controller/user/updateUser',
    method: 'post',
    data
  })
}
export function delUser (data) {
  return axios.request({
    url: '/authority/controller/user/deleteUser',
    method: 'post',
    data: data
  })
}
export function ajaxGetUserGroup (id) {
  id = 1
  return axios.request({
    url: '/authority/admin/user/getUserGroup/' + id,
    method: 'get'
  })
}
export function ajaxGetSystemAccountList (query) {
  return axios.request({
    url: '/admin/system/systemAccountList',
    method: 'get',
    params: query
  })
}
export function updateSystemAccountList (data) {
  return axios.request({
    url: '/admin/system/updateSystemAccount',
    method: 'post',
    data: data
  })
}
export function ajaxPutUserGroup (data) {
  return axios.request({
    url: '/admin/user/updateUserGroup',
    method: 'put',
    data: data
  })
}

export function ajaxUpdatePassword (data) {
  return axios.request({
    url: '/authority/controller/user/resetPassword',
    method: 'post',
    data: data
  })
}

// getTreeByRoleGroupType,
