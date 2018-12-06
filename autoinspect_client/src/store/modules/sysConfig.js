const sysConfig = {
  state: {
    appname: '',
    appentrance: '',
    classesnum: '',
    factory: '',
    workshop: '',
    linename: '',
    producttype: '',
    classPeroid: [],
    plConfigs: []
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
    },
    SET_FACTORY: (state, data) => {
      state.factory = data
    },
    SET_WORKSHOP: (state, data) => {
      state.workshop = data
    },
    SET_LINENAME: (state, data) => {
      state.linename = data
    },
    SET_PRODUCTTYPE: (state, data) => {
      state.producttype = data
    },
    SET_CLASSPERIOD: (state, data) => {
      state.classPeroid = data
    },
    SET_PLCONFIGS: (state, data) => {
      state.plConfigs = data
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
    },
    setFactory ({commit}, data) {
      commit('SET_FACTORY', data)
    },
    setWorkshop ({commit}, data) {
      commit('SET_WORKSHOP', data)
    },
    setLinename ({commit}, data) {
      commit('SET_LINENAME', data)
    },
    setProductType ({commit}, data) {
      commit('SET_PRODUCTTYPE', data)
    },
    setClassPeriod ({commit}, data) {
      commit('SET_CLASSPERIOD', data)
    },
    setPlConfig ({commit}, data) {
      commit('SET_PLCONFIGS', data)
    }
  }
}

export default sysConfig
