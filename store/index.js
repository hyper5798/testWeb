export const state = () => ({
  name: ''
})

export const getters = {
}

export const mutations = {
  SET_LEADS(state, leads) {
    state.leads = leads
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req, res }) {
    // console.log('nuxtServerInit', res.session)
    if (!!req.session && !!req.session.user && !!req.session.user.token) {
      commit('user/LOGIN', req.session)
    } else {
      commit('user/LOGOUT')
    }
  }
}
