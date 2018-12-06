/**
 * 公用
 */
// import axios from 'axios'
// import promiseFinally from 'promise.prototype.finally'
// promiseFinally.shim()
// var instance = axios.create({
//   baseURL: `/api`
// })
export const randomString = len => {
  len = len || 4
  let chars = 'ABCDEFGHJKMNPQRSTWXYZ'
  let maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}
