import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import article from './modules/article'

Vue.use(Vuex)

/**
 * 将 modules 的 store 合并
 * @type {Store}
 */


const store = new Vuex.Store({
  modules: {
    user,
    article
  }

})

export default store
