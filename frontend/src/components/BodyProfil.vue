<template>
  <div class="jumbotron container h-100 ml-auto mr-auto mt-5 shadow-box">
    <ChangeMdp :revele="revele" :toggleModale="toggleModale" />

    <div class="row">
      <div
        class="col-lg-4 bg-light shadow-box d-flex flex-column p-3 m-3"
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
        <div class="jumbotron d-flex flex-column p-1 m-2 shadow-box">
          <MesMessages
            @reload="reload"
            @deletePost="deletePost"
            class="p-2"
            v-for="post in allPostsUser"
            v-bind:key="post.id"
            :post="post"
          />
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
      revele: false,
      post: {
        uuid: "",
        message: "",
        titre: "",
      },
      allPostsUser: [],
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
      let uuid = localStorage.getItem("uuid");
      axios
        .get("http://localhost:3000/api/post/mesMessages/" + uuid)
        .then((response) => {
          this.allPostsUser = response.data.post;
          console.log(response)
        })
        .catch((error) => {
          console.log(error);
        });
    },
    toggleModale() {
      console.log("dans le fonction toggleModale");
      this.revele = !this.revele;
      console.log(this.revele);
    },
    reload(reload){
      this.profil()
      console.log("test si reload est bien ici !  " + reload)
    },
    deleteAccount() {
      let uuid = localStorage.getItem("uuid");
      let dataDelete = {
        deleteUserUuid: uuid, 
        userIsAdmin: this.User.isAdmin
        }
      console.log(dataDelete.deleteUserUuid + "  dataDelete Existe  " + dataDelete.userIsAdmin)
      axios
        .delete("http://localhost:3000/api/auth/delete/" + uuid, { data: dataDelete})
        .then(() => {
          localStorage.clear();
          location.replace("/signup");
        })
        .catch((error) => console.log(error));
    },
    deletePost(deleteUuidPost) {
      console.log("test : " + deleteUuidPost);
      let uuid = localStorage.getItem("uuid");
      console.log("le post uuid : " + deleteUuidPost + " l'user uuid" + uuid);
      axios
        .delete("http://localhost:3000/api/post/delete/" + uuid, {
          data: {
            uuidPost: deleteUuidPost,
            userIdOrder: uuid,
          },
        })
        .then(() => {
          this.profil();
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.profil();
  },
};
</script>