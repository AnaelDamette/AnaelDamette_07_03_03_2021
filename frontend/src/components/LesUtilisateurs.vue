<template>
  <div class="hello container jumbotron shadow-box ml-auto mr-auto mt-5">
    <div class="bg-light d-flex justify-content-between shadow-box">
      <div class="d-flex ml-1 pl-1 align-items-center justify-content-between">
        <p class="m-2">
          le nom d'utilisateur : <strong>{{ users.username }}</strong>
        </p>
      </div>
      <button @click="deleteUser" class="btn btn-primary m-2">
        <i class="fas fa-ban"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "LesUtilisateurs",
  props: {
    users: {
      type: Object,
      username: String,
    },
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    deleteUser() {
      let reload = true;
      let uuid = localStorage.getItem('uuid')
      let dataDelete = {
        deleteUserUuid: this.users.uuid, 
        userIsAdmin: this.User.isAdmin
        }



      axios
        .delete("http://localhost:3000/api/auth/delete/" + uuid, { data: dataDelete})
        .then(() => {
          console.log("utilisateur supprimé")
          this.$emit("reload", reload)})
        .catch((error) => console.log(error));
      console.log("Je suis bien en train de delete un User");
    },
  },
};
</script>
