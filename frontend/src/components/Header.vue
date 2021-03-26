<template>    
    <header>
      <div id="nav" class="navbar navbar-expand-lg mb-3 navbar-light bg-blue d-flex justify-content-between">
          <router-link to="/" class="nav-item figure p-1">
          <img class="img-nav" alt="Logo Groupomania" src="../img/icon-black.png" />
          <router-link class=" bg-light rounded shadow-box p-1 m-3" v-if="User.isAdmin==1" to="/admin"> Administration</router-link>
          </router-link>
          <div class="d-flex justify-content-around">
            <router-link to=/login  v-if="User.token == null" class="nav-item p-1 text-secondary shadow-text"> Connexion </router-link>
            <router-link to=/signup  v-if=" User.token == null" class="nav-item p-1 text-secondary shadow-text">Inscription </router-link>            
            <router-link to=/profil  v-if="User.token != null" class="nav-item p-1 text-secondary shadow-text"> Profil </router-link>
            <router-link to=/post v-if="User.token !=null" class="nav-item p-1 text-secondary shadow-text">Poster </router-link>
            <button type="button" v-if="User.token !=null" class="nav-item btn p-1 text-secondary shadow-text" @click="disconnect">Disconnect</button>
          </div>
      </div>
    </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  //   name: "Header",
  //   props: {
  //     msg: String,
  //   },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    disconnect() {
      localStorage.clear();
      location.replace("/");
    },
  },
};
</script>