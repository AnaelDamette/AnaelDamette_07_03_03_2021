<template>
  <div class="home container ">
    <HelloWorld msg="Bienvenue chez Groupomania" />
    <div v-if="User.token != null" class='jumbotron shadow-box m-3 p-2'>
    <LesMessages v-for="post in allPosts" v-bind:key="post.id" :post="post"   /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import LesMessages from '../components/LesMessages'
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    LesMessages
  },
  data() {
    return {
      updateKey: false,
      post: {
        uuid:"",
        message:"",
        titre:"",
      },
      allPosts:[]
    }
  },
  computed: {
    ...mapState(["User"]),
  },
  mounted() {
    axios
    .get("http://localhost:3000/api/post")
    .then(response => {
      console.log("post", response.data)
      this.allPosts = response.data;
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>
