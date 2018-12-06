const keys = ['User', 'ParallelLineConfigs']
const utility = {
  setObj (key, data, local = false) {
    if (local) {
      window.localStorage.setItem(key, JSON.stringify(data))
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(data))
    }
  },
  getObj (key, local = false) {
    try {
      let data
      if (local) {
        data = JSON.parse(window.localStorage.getItem(key))
      } else {
        data = JSON.parse(window.sessionStorage.getItem(key))
      }
      return data
    } catch (e) {
      console.log(e)
    }
  }
}
const storage = {}
for (let key of keys) {
  storage[`set${key}`] = (value, local = false) => {
    utility.setObj(key, value, local)
  }
  storage[`get${key}`] = (local = false) => {
    return utility.getObj(key, local)
  }
}
export default storage
