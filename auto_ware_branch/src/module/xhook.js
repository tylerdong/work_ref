// import {errorCode} from './errorCode.js'
import {Message} from 'element-ui'
// import storage from './storage'
// 拦截发送请求
xhook.before(function (request) {
//  const user = storage.getUser()
  //  附加请求头token信息
  // if (user && user.token) {
  //   request.xhr.setRequestHeader('token', user.token)
  // }
})
// 拦截返回请求
xhook.after(function (request, response) {
  if (response.status !== 200) {
    Message.error('服务器连接失败，错误代码：' + response.status)
  }
  if (response.data instanceof ArrayBuffer) {
    return
  }
  try {
    const data = JSON.parse(response.data)
    let message = ''
    let messageType = 0
    if (!data || !data.meta || !data.meta.code) {
      return false
    }
    if (data.meta.code === 100000) {
      messageType = 1
      message = data.meta.message
    } else {
      messageType = 2
      message = data.meta.message
      Message.error(message)
    }
    data.message = message
    data.messageType = messageType
    response.text = JSON.stringify(data)
  } catch (error) {
    // Message.error('服务器异常，错误代码：' + response.status)
    Message({message: '服务器异常，错误代码：' + response.status, type: 'error', duration: 50000})
  }
})
