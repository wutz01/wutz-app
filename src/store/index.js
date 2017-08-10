import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {

    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {},
  getters: {
    loadedUser(state){
      return (userId) => {
      }
    }
  }
})
