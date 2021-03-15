//const url = "http://localhost:3000/api";
import axios from "axios";
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    User: {
      pseudo: 'Nc',
      userID: 'Nc',
      mail: 'Nc',
      token: null,
      isAdmin: false,
    }
  },
  mutations: {
    saveUserInfos(state, [pseudo, userId, mail, isAdmin]) {
      state.User.pseudo = pseudo,
        state.User.userId = userId,
        state.User.mail = mail,
        
      state.User.isAdmin = isAdmin
    },
    saveToken(state) {
      state.User.token = localStorage.getItem('token')
    }
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
        .then(response => {
          console.log('réponse API', response);
          context.commit('saveUserInfos', [response.data.pseudo, response.data.id, response.data.mail, response.data.isAdmin])
        })
        .catch(error => {
          console.log('Erreur auth', error); 
        });
    },
  },
  modules: {
  }
});
export default store