/**
 * Created by Administrator on 2017/1/19.
 */
const keys = [
  'User',
  'Menu',
  'Permission',
  'FactoryConfig'
]
const utility = {
  setObj (key, data, islocal = false) {
    if (islocal) {
      window.localStorage.setItem(key, JSON.stringify(data))
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(data))
    }
  },
  getObj (key, islocal = false) {
    try {
      let data
      if (islocal) {
        data = JSON.parse(window.localStorage.getItem(key))
      } else {
        data = JSON.parse(window.sessionStorage.getItem(key))
      }
      return data
    } catch (e) {
      return null
    }
  }
}
const storage = {}
for (let key of keys) {
  storage['set' + key] = (value, islocal = false) => {
    utility.setObj(key, value, islocal)
  }
  storage['get' + key] = (islocal = false) => {
    return utility.getObj(key, islocal)
  }
}
export default storage
