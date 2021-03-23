<template>
  <div class="home container">
    <HelloWorld msg="Administration de Groupomania" />
    <LesUtilisateurs @reload="reload" v-for="users in allUsers" :users="users" v-bind:key="users.uuid" />
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LesUtilisateurs from "@/components/LesUtilisateurs.vue";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Admin",
  components: {
    HelloWorld,
    LesUtilisateurs
  },
  data() {
    return {
      users: {
        username: "",
        uuid: "",
      },
      allUsers: []
    }
  },
  computed: {
    ...mapState(["User"]),
  },
  
  methods: {
    reload(reload) {
    this.getUser()
    console.log(reload)
  },
  getUser(){

    console.log("Fonction getUser")
    let uuid = localStorage.getItem('uuid')


    axios

    .get("http://localhost:3000/api/auth/admin/" + uuid)
    .then((response) => {
      this.allUsers = response.data
      console.log(this.allUsers)
    })
    .catch((error) => {
      console.log(error)
    })
  },
  },
  mounted(){
    this.getUser()
  }
}

</script>