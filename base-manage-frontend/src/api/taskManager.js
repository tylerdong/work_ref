import axios from '@/libs/api.request'

export function getAllJob (query) {
  return axios.request({
    url: '/task/controller/task/getAllJob',
    method: 'post',
    data: query
  })
}
export function getRunningJob (query) {
  return axios.request({
    url: '/task/controller/task/getRunningJob',
    method: 'post',
    data: query
  })
}
export function addJob (query) {
  return axios.request({
    url: '/task/controller/task/addJob',
    method: 'post',
    data: query
  })
}
export function deleteJob (query) {
  return axios.request({
    url: '/task/controller/task/deleteJob',
    method: 'post',
    data: query
  })
}
export function pauseJob (query) {
  return axios.request({
    url: '/task/controller/task/pauseJob',
    method: 'post',
    data: query
  })
}
export function resumeJob (query) {
  return axios.request({
    url: '/task/controller/task/resumeJob',
    method: 'post',
    data: query
  })
}
export function updateJobCron (query) {
  return axios.request({
    url: '/task/controller/task/updateJobCron',
    method: 'post',
    data: query
  })
}
export function execute (query) {
  return axios.request({
    url: '/task/controller/task/execute',
    method: 'post',
    data: query
  })
}
export function getLogByJobId (query) {
  return axios.request({
    url: '/task/controller/task/getLogByJobId',
    method: 'post',
    data: query
  })
}
