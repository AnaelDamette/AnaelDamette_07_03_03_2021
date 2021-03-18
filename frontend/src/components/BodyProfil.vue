<template>
  <div class="jumbotron container h-100 ml-auto mr-auto mt-5 shadow-box">
    <ChangeMdp :revele="revele" :toggleModale="toggleModale" />

    <div class="row">
      <div
        class="col-lg-4 bg-light shadow-box d-flex flex-column p-3 m-3 justify-content-around"
      >
        <h2 class="bg-dark rounded shadow-box text-center p-2 text-secondary">
          Ton profil
        </h2>
        <div class="p-2 m-2">
          <p>Ton Compte : {{ User.username }}</p>
        </div>
        <div class="p-2 m-2">
          <p>Ton email : {{ User.email }}</p>
        </div>
        <div
          type="button"
          id="change"
          class="p-2 m-2 btn btn-primary w-50"
          @click="toggleModale"
        >
          Changement Mot de passe
        </div>
        <div
        type="button"
        id="MesMsg"
        class="p-2 m-2 btn btn-primary w-50"
        @click="profil">
        Voir mes message
        </div>
        <button
          type="button"
          class="p-2 m-2 btn btn-danger w-50"
          @click="deleteAccount"
        >
          Supprimer le profil
        </button>
      </div>
      <div
        class="col-lg-7 bg-light shadow-box d-flex flex-column p-3 m-3 justify-content-between"
      >
        <h2 class="bg-dark rounded shadow-box text-center p-2 text-secondary">
          Tes messages
        </h2>
        <div v-if='afficheMsg == true' class="jumbotron d-flex flex-column p-1 m-2 shadow-box">
          <MesMessages  class="p-2" v-for="post in allPostsUser" v-bind:key="post.id" :post="post"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MesMessages from "../components/MesMessages";
import axios from "axios";
import ChangeMdp from "../components/ChangeMdp";

export default {
  name: "BodyProfil",
  data() {
    return {
      revele: false ,
      post: {
        uuid:"",
        message:"",
        titre:"",
      },
      allPostsUser:[],
      afficheMsg: false
      
    };
  },
  components: {
    MesMessages,
    ChangeMdp,
  },
  computed: {
    ...mapState(["User"]),
  },
  
  methods: {
    profil() {
      this.afficheMsg = !this.afficheMsg
      console.log("on est bien dans la fonction profil")
      let uuid = localStorage.getItem("uuid");
      axios
      .get("http://localhost:3000/api/post/mesMessages/" + uuid)
      .then(response => {
        console.log("post mes messages", response.data.post)
        this.allPostsUser = response.data.post;
      })
      .catch(error => {
        console.log(error);
      })
    },
    toggleModale: function () {
      console.log("dans le fonction toggleModale");
      this.revele = !this.revele;
      console.log(this.revele);
    },
    deleteAccount() {
      let uuid = localStorage.getItem("uuid");
      axios
        .delete("http://localhost:3000/api/auth/delete/" + uuid)
        .then(() => {
          localStorage.clear();
          location.replace("/signup");
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>