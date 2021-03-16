
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    User: {
      username: 'Nc',
      userID: 'Nc',
      email: 'Nc',
      token: null,
      isAdmin: false,
    }
  },
  mutations: {
    saveUserInfos(state, [username, uuid, email, isAdmin]) {
      state.User.username = username,
        state.User.userID = uuid,
        state.User.email = email,
        
      state.User.isAdmin = isAdmin
    },
    saveToken(state) {
      state.User.token = localStorage.getItem('token')
    }
  },
  actions: {
  },
  modules: {
  }
});
export default store