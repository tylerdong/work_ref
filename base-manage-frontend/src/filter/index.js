import Vue from 'vue'
import dateFns from 'date-fns'

Vue.filter('timeFormat', function (value, format) {
  if (value) {
    return dateFns.format(value, format)
  }
  return ''
})
