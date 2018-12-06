/* 时分秒（时间戳） */
export const date = params => {
  const temp = new Date(parseInt(params))

  let month = temp.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }

  let date = temp.getDate()
  if (date < 10) {
    date = '0' + date
  }

  let hours = temp.getHours()
  if (hours < 10) {
    hours = '0' + hours
  }

  let minutes = temp.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  return temp.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes
}

/* 奖惩类型（０奖励，１惩罚） */
export const rewardPunishType = params => {
  let result = ''
  switch (params) {
    case '0':
      result = '奖励'
      break
    case '1':
      result = '惩罚'
      break
    default:
      result = '未知类型'
      break
  }
  return result
}
