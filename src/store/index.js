import Vue from 'vue'
import Vuex from 'vuex'
import { token } from '@/config'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem(token) || null
  },
  mutations: {
    setUserToken(state, payload) {
      state.token = payload

      // localstorage
      setItem(token, payload)
    }
  },
  actions: {},
  modules: {}
})
