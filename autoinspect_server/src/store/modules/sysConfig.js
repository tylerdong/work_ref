const sysConfig = {
  state: {
    appname: '',
    appentrance: '',
    classesnum: ''
  },
  mutations: {
    SET_APPNAME: (state, data) => {
      state.appname = data
    },
    SET_APPENTRANCE: (state, data) => {
      state.appentrance = data
    },
    SET_CLASSESNUM: (state, data) => {
      state.classesnum = data
    }
  },
  actions: {
    setAppname ({commit}, data) {
      commit('SET_APPNAME', data)
    },
    setAppentrance ({commit}, data) {
      commit('SET_APPENTRANCE', data)
    },
    setClassesnum ({commit}, data) {
      commit('SET_CLASSESNUM', data)
    }
  }
}

export default sysConfig
