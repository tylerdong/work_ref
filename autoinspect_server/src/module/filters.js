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
Vue.filter('isgoodStatus', function (value) {
  if (value === '0') {
    return '未处理'
  } else {
    return '已处理'
  }
})
Vue.filter('booleanValue', function (value) {
  if (value) {
    if (value === 'Y') {
      return '是'
    } else if (value === 'N') {
      return '否'
    }
  } else {
    return '未配置'
  }
})
