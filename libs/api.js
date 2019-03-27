import axios from '~/plugins/axios2'

const isNew = true
console.log("%%%%% process.env.NODE_ENV :", process.env.NODE_ENV)

/* account url ------------------------------*/
const login_url = '/user/v1/login/'
const logout_url = '/user/v1/logout'
const users_url = '/user/v1/users'
const reg_url = '/user/v1/register'
/* cp url -----------------------------------*/
const cp_url = '/admin/v1/scps'
/* map url ----------------------------------*/
const map_url = '/device/v1/maps'
const map_old_url = '/map/v1'
/* device url -------------------------------*/
const sensor_url = '/device/v1/sensor'
const device_url = '/device/v1/device'
const add_batch_url = '/device/v1/batchDevices'
const active_device_url = '//device/v1/active'
/* event url --------------------------------*/
const event_url = '/device/v1/event'

/* method -----------------------------------*/
export const toGet = (url, params) => {
  return axios.get(url, {params: params}).then(res => res)
}

export const toUpdate = (url, params) => {
  return axios.put(url, params).then(res => res)
}

export const toDelete = (url, params) => {
  return axios.delete(url, {params: params}).then(res => res)
}

export const toPost = (url, params) => {
  return axios.post(url, params).then(res => res)
}

/* account ----------------------------------*/
export const toLogin = (params) => {
  var url = login_url + params.cp
  delete params.cp
  console.log('toLogin url : ', url)
  return toPost(url, params)
}

export const toLogout = (vm, params) => {
  return toPost(logout_url, params)
}

export const addUser = (params) => {
  var url = reg_url + params.cp
  delete params.cp
  return toPost(url, params)
}

export const getUserList = (params) => {
  return toGet(users_url, params)
}
  
export const deleteUser = (params) => {
  return toDelete(users_url, params)
}

export const updateUser = (params) => {
  return toUpdate(users_url, params)
}

/* device ----------------------------------*/
export const getMapList = (params) => {
  var url = isNew ? map_url : map_old_url
  console.log('getMap : ', url)
  return toGet(url, params)
}
export const updateMap = (params) => {
  var url = isNew ? map_url : map_old_url
  return toUpdate(url, params)
}

export const getEventList = (params) => {
  console.log(JSON.stringify(params))
  return toGet(event_url, params)
}

/* ------------------------------- device api -----------------------------*/
export const getSensorList = (params) => {
  return toGet(sensor_url, params)
}
  
  export const addBatchDevice = (params) => {
    return toPost(add_batch_url, params)
  }
  
  export const activeDevice = (params) => {
    return toPost(active_device_url, params)
  }

  export const addDevice = (params) => {
    return toPost(device_url, params)
  }
  
  export const updateDevice = (params) => {
    return toUpdate(device_url, params)
  }
  
  export const deleteDevice = (params) => {
    return toDelete(device_url, params)
  }
  
  
  
  

  