export const state = () => ({
  map: [],
  list: []
})

export const getters = {
}

export const mutations = {
  SET_MAP: (state, map) => {
    state.map = map
  },
  SET_LIST: (state, list) => {
    state.list = list
  },
  UPDATE_MAP: (state, item) => {
    console.log('UPDATE_MAP :')
    console.log(item)
    if(state.map && state.map.length > 0) {
      state.map[item.index]['typeName'] = item.typeName
      state.map[item.index]['fieldName'] = JSON.parse(JSON.stringify(item.fieldName))
      state.map[item.index]['map'] = JSON.parse(JSON.stringify(item.map))
      console.log('state.map['+ item.index + '] : ', state.map[item.index])
    }
  }
}
  