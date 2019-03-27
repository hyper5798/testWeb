export const state = () => ({
  users: [],
  token: 'PhU0Sd9zwUSwOQgXnJpj7pgSwdA7YD80', // 登陆token
  sign_key: null, // 加密密钥
  info: {},// 用户的信息
  role: ''
})

export const getters = {
  getToken: state => {
    return state.token
  },
  getSignKey: state => {
    return state.sign_key
  },
  token: state => {
    return state.token
  },
  signkey: state => {
    return state.sign_key
  },
  getUserId: state => {
    return state.info.id || null
  },
  getInfo: state => {
    return state.info
  }
}

export const mutations = {
  SET_USERS: (state, users) => {
    state.users = users
  },
  SET_ROLE: (state, role) => {
    console.log('role : ')
    console.log(role)
    state.role = role
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, info = {}) => {
    if( typeof(info) == 'string') {
      info = JSON.parse(info)
    }
    console.log(info)
    state.info = info
  },
  // 登陆
  LOGIN: (state, session) => {
    state.token = session.user.token || null
    state.sign_key = session.user.sign_key || null
    state.info = session.user.info || {}
  },
  // 登出
  LOGOUT: state => {
    state.token = null
    state.sign_key = null
    state.info = {}
  }
}

export const actions = {
  // 登出
  LOGOUT: state => {
    state.token = null
    state.sign_key = null
    state.info = {}
  }
}
