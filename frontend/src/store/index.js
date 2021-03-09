const url = "http://localhost:3000/api";

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      pseudo: 'Nc',
      userID: 'Nc',
      mail: 'Nc',
      isAdmin: false,
    }
  },
  mutations: {
    saveUserInfos(state, [pseudo, userId, mail, isAdmin]) {
      state.user.pseudo = pseudo,
        state.user.userId = userId,
        state.user.mail = mail,
        state.user.isAdmin = isAdmin
    },
  },
  actions: {
    getUserInfos(context) {
      axios
        .get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
      //.get("http://localhost:3000/api/post",this.$store.state.headerParams)
      .then(response => {
        console.log('réponse API', response);
        context.commit('saveUserInfos', [response.data.username, response.data.id, response.data.email, response.data.isAdmin])
      })
      .catch(error => {
        console.log('Erreur auth', error); //affiche pas le message 'normalement' envoyé par le back
      });
    },
  },
  modules: {
  }
});
