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
  return ['Y', '1', 'OK'].includes(value) ? '是' : '否'
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
Vue.filter('doffType', val => {
  if (['1', 1].includes(val)) {
    return '手动'
  }
  return '自动'
})
Vue.filter('scheduleStatus', val => {
  let result = ''
  switch (val) {
    case '0':
      result = '正在运行'
      break
    case '1':
      result = '完成'
      break
    case '2':
      result = '异常'
      break
    default:
      break
  }
  return result
})
Vue.filter('hosieryType', val => {
  let result = ''
  switch (val) {
    case 'HOSIERY_NOMAL':
      result = '正常抽样'
      break
    case 'HOSIERY_ITEM_SILK':
      result = '位与锭'
      break
    case 'HOSIERY_ITEM_ITEM':
      result = '位与位'
      break
    case 'HOSIERY_PINCHE_1':
      result = '一次织袜拼车'
      break
    case 'HOSIERY_PINCHE_2':
      result = '二次织袜拼车'
      break
    case 'HOSIERY_PINCHE_3':
      result = '三次织袜拼车'
      break
    case 'OTHER':
      result = '其他'
      break
    default:
      break
  }
  return result
})

Vue.filter('operateType', val => {
  let result = ''
  switch (val) {
    case 'HOSIERY_NOMAL':
      result = '正常抽样织袜'
      break
    case 'HOSIERY_ITEM_SILK':
      result = '位与锭织袜'
      break
    case 'HOSIERY_ITEM_ITEM':
      result = '位于位织袜'
      break
    case 'SILKCAR_FLOW_TYPE_DOFF':
      result = '落筒'
      break
    case 'SILKCAR_FLOW_TYPE_STRIPSILK':
      result = '剥丝'
      break
    case 'SILKCAR_FLOW_TYPE_MEASUREFIBER':
      result = '测纤'
      break
    case 'HOSIERY_PINCHE_1':
      result = '一次织袜'
      break
    case 'HOSIERY_PINCHE_2':
      result = '二次织袜'
      break
    case 'HOSIERY_PINCHE_3':
      result = '三次织袜'
      break
    case 'SENTENCE':
      result = '染判'
      break
    case 'ARTFICIALCHECK':
      result = '人工外观检'
      break
    case 'SILK_ABNORMAL':
      result = '添加丝锭异常'
      break
    case 'SILK_CAR_JUDGE_GRADE':
      result = '整车判等'
      break
    case 'WUJIAN_REGISTRY':
      result = '物检登记'
      break
    case 'WUJIAN_CONFIRM':
      result = '物检确认'
      break
    case 'UNBIND_SILK':
      result = '解绑丝锭'
      break
    case 'ADD_WEIGHT':
      result = '正常抽样织袜'
      break
    case 'AUTO_SURFACE_CHECK':
      result = '自动外观检查'
      break
    case 'DEL_SILK_EXCEPTION':
      result = '清除丝锭异常'
      break
    case 'ARTFICIALCHECK_REVIEW_SILK':
      result = '异常丝锭-人工复核'
      break
    case 'PACKAGE_AUTO_SURFACE':
      result = '自动外观'
      break
    case 'MANUAL_PACKAGE':
      result = '人工打包'
      break
    case 'AUTO_PACKAGE':
      result = '自动打包'
      break
    case 'OTHER':
      result = '其他操作'
      break
    default:
      break
  }
  return result
})
Vue.filter('timeType', val => {
  let result = ''
  switch (val) {
    case 'DAY':
      result = '日'
      break
    case 'MONTH':
      result = '月'
      break
    case 'YEAR':
      result = '年'
      break
    default:
      break
  }
  return result
})
Vue.filter('formatType', val => {
  let result = ''
  switch (val) {
    case 'PERCENT':
      result = '百分比'
      break
    case 'AMOUNT':
      result = '数字'
      break
    default:
      break
  }
  return result
})
Vue.filter('dataType', val => {
  let result = ''
  switch (val) {
    case 'WEIGHT':
      result = '重量'
      break
    case 'NUMBER':
      result = '数量'
      break
    case 'COMPLETION_RATE':
      result = '完成率'
      break
    default:
      break
  }
  return result
})
Vue.filter('formatSymbol', (formatType, dataType) => {
  let result = ''
  switch (formatType) {
    case 'PERCENT':
      result = '%'
      break
    case 'AMOUNT':
      switch (dataType) {
        case 'WEIGHT':
          result = 'kg'
          break
        case 'NUMBER':
          result = '锭'
          break
        case 'COMPLETION_RATE':
          result = '%'
          break
        default:
          break
      }
      break
    default:
      break
  }
  return result
})
Vue.filter('sentenceStatus', val => {
  if ([1, '1'].includes(val)) {
    return '异常'
  } else if ([2, '2'].includes(val)) {
    return '异常'
  }
  return '异常'
})
Vue.filter('warnMessageType', val => {
  if (val === 'WECHAT') {
    return '微信'
  }
  if (val === 'EMAIL') {
    return '邮件'
  }
  return ''
})
