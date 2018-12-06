const layout = {
  state: {
    sidebar: {
      expand: true
    }
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.expand = !state.sidebar.expand
    }
  },
  actions: {
    toggleSideBar ({commit}) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default layout
