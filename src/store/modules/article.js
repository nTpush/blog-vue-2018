import $http from '@/service/index.js'
import * as types from '../mutation-types'
let state = {
  mates: [],
  classes: []
}

const mutations = {
  [types.CLASSORMATE] (state, info) {
    state.mates = info.mate
    state.classes = info.class
  }
}

const actions = {
  GetClassOrMate: ({ commit }) => {
    console.log('调用，分类接口')
    return new Promise((resolve, reject) => {
      $http.get('/api/class').then(res => {
        console.log(res, '分类')
        commit(types.CLASSORMATE, res)
      })
    })
  }
}

const getters = {
  mates: state => state.mates,
  classes: state => state.classes
}
export default {
  state,
  mutations,
  actions,
  getters
}
