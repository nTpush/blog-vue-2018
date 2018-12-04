import axios from 'axios'
import * as types from '../mutation-types'
let state = {
  name: 'default',
  userInfo: {

  }
}

const mutations = {
  [types.SETUSERINFO] (state, info) {
    state.userInfo = { ...info }
  }
}

const actions = {
  Login: ({ commit }, userInfo) => {
    return new Promise((resolve, reject) => {
      console.log(userInfo, 10086)
      state.name = userInfo.name
      axios.get('https://www.huishengqianzhushou.com/api/use202').then(res => {
        console.log(res)
        // commit(types.SETUSERINFO, res['list'])
      })
    })
  }
}

const getters = {
  info: state => state.info,
  name: state => state.name
}
export default {
  state,
  mutations,
  actions,
  getters
}
