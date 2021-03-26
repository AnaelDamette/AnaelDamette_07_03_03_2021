
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    User: {
      username: 'Nc',
      userID: localStorage.getItem('uuid'),
      email: 'Nc',
      token: localStorage.getItem("token"),
      isAdmin: localStorage.getItem('isAdmin'),
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
    deletePost() {
      console.log(this.post.uuidPost)
      let uuid = localStorage.getItem("uuid");
      console.log("le post uuid : " + this.post.uuidPost + " l'user uuid" + uuid)
      axios.delete("http://localhost:3000/api/post/delete/" + uuid, {
        data: {
          uuidPost: this.post.uuidPost,
          userIdOrder: localStorage.getItem('uuid'),
        },
      })
      .then(() => {
        this.post.updatekey != this.post.updateKey 
        console.log(this.post.updateKey)
       
      })
      .catch(error => console.log(error));
    },
  },
  modules: {
  }
});
export default store