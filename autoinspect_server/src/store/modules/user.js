const user = {
  state: {
    user: {
      token: ''
    }
  },
  mutations: {
    TOGGLE_USERTOKEN: (state, data) => {
      state.user.token = data
    }
  },
  actions: {
    toggleUserToken ({commit}, data) {
      commit('TOGGLE_USERTOKEN', data)
    }
  }
}
export default user
