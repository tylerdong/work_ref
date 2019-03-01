import Vue from 'vue'
import dateFns from 'date-fns'

Vue.filter('timeFormat', function (value, format) {
  if (value) {
    return dateFns.format(value, format)
  }
  return ''
})
Vue.filter('recommand', value => {
  if (value) {
    return ['y', 'Y', '1'].includes(value) ? '简讯推荐' : '不推荐'
  }
  return ''
})
Vue.filter('guidance', value => {
  if (value) {
    return ['y', 'Y', '1'].includes(value) ? '引导详情内容' : '无引导'
  }
  return ''
})
Vue.filter('booleanValue', value => {
  if (value) {
    return ['Y', 'y', true, '1'].includes(value) ? '是' : '否'
  }
  return ''
})
