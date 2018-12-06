/**
 * Created by a on 2016/9/22.
 */
import Vue from 'vue'
import dateFns from 'date-fns'
Vue.filter('timeFormat', function (value, format) {
  if (value) {
    return dateFns.format(value, format)
  }
  return ''
})
Vue.filter('timeOver', function (value) {
  if (value <= 60000) {
    return '刚刚'
  } else {
    let time
    time = parseInt(value / (365 * 24 * 3600 * 1000))
    if (time >= 1) {
      return time + '年前'
    }
    time = parseInt(value / (30 * 24 * 3600 * 1000))
    if (time >= 1) {
      return time + '个月前'
    }
    time = parseInt(value / (24 * 3600 * 1000))
    if (time >= 1) {
      return time + '天前'
    }
    time = parseInt(value / (3600 * 1000))
    if (time >= 1) {
      return time + '小时前'
    }
    time = parseInt(value / (60 * 1000))
    if (time >= 1) {
      return time + '分钟前'
    }
  }
})
Vue.filter('filterBoxType', function (value) {
  switch (value) {
    case '1':
    case '2':
      return '人工打包'
    case '4':
      return '自动打包'
    case '6':
      return '补打'
    default:
      return ''
  }
})
Vue.filter('gradeNameFormat', function (value, shipmentType) {
  // 外贸
  if (shipmentType === '2') {
    switch (value) {
      case '合格':
        return '合格/B'
      case '等外':
        return '等外/C'
      case '优等':
        return '优等/AA'
      case '壹等':
        return '壹等/A'
      case '综合丝':
        return '综合丝/C'
      default:
        return ''
    }
  } else {
    return value
  }
})
Vue.filter('booleanFormat', function (value) {
  return ['Y', '1'].includes(value) ? '是' : '否'
})
Vue.filter('productStatus', function (value) {
  if (value === 'SAP_FINISH') {
    return '已过账'
  } else if (value === 'FINISH') {
    return '已完成'
  } else if (value === 'CHECKED') {
    return '已完成'
  }
})
Vue.filter('requisitionType', function (value) {
  if (value === 'SALE') {
    return '销售'
  } else if (value === 'REFUND') {
    return '退货'
  }
})
Vue.filter('plateNumberType', function (value) {
  if (value === 'NORMAL') {
    return '普通'
  } else if (value === 'WIRE') {
    return '丝车'
  } else {
    return ''
  }
})
Vue.filter('forkStatus', function (val) {
  if (val) {
    if (val === 'OFF_LINE') {
      return '离线'
    }
    if (val === 'SPARE_TIME') {
      return '空闲'
    }
    if (val === 'WORKING') {
      return '工作中'
    }
  }
  return ''
})
Vue.filter('productType', function (val) {
  if (val) {
    if (['INNER_SALE', 'Y'].includes(val)) {
      return '内销'
    }
    if (['OUT_SALE', 'N'].includes(val)) {
      return '外贸'
    }
  }
  return ''
})
Vue.filter('sapRequisitionStep', (val) => {
  if (val && val === 'X') {
    return '是'
  } else {
    return '否'
  }
})
Vue.filter('sapRequisitionStatus', (val) => {
  if (val) {
    let status = ''
    switch (val) {
      case 'PENDING':
        status = '未处理'
        break
      case 'PROCESSED':
        status = '拣配中'
        break
      case 'CHECKED':
        status = '已拣配'
        break
      case 'FINISH':
        status = '已完成'
        break
      case 'PICKUP_FAILED':
        status = '拣配失败'
        break
      case 'POST_FAILED':
        status = '过账失败'
        break
      case 'SAP_FINISH':
        status = '已过账'
        break
      case 'CANCEL':
        status = '取消'
        break
      default:
        status = '未知'
        break
    }
    return status
  }
})
Vue.filter('palletStatus', (val) => {
  if (val) {
    if (val === 'USING') {
      return '在用'
    }
    if (val === 'UNUSE') {
      return '未用'
    }
  }
})
Vue.filter('yokeType', val => {
  let value = ''
  switch (val) {
    case 'HENG_LI':
      value = '恒力木架'
      break
    case 'OLD_WOOD':
      value = '旧木新钉木架'
      break
    case 'DOWN_GRADE':
      value = '恒力降等木架'
      break
    case 'PLASTIC':
      value = '塑料托盘'
      break
    case 'NOT_PINE':
      value = '非松木'
      break
    case 'PLYWOOD':
      value = '胶合板木架'
      break
    case 'FUMIGATION':
      value = '熏蒸木架'
      break
    case 'HEIGHTENED':
      value = '加高木架'
      break
    case 'NORMAL':
      value = '普通木架'
      break
    default:
      value = ''
      break
  }
  return value
})
