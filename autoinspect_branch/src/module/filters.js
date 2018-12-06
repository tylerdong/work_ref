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
Vue.filter('isgoodStatus', function (value) {
  if (value === '0') {
    return '未处理'
  } else {
    return '已处理'
  }
})
Vue.filter('sendType', function (value) {
  if (value === 'DWP') {
    return '等外品'
  } else if (value === 'JP') {
    return '截批'
  } else if (value === 'JBJL') {
    return '交班记录('
  } else {
    return ''
  }
})
