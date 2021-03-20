<template>
  <div class="home container">
    <HelloWorld msg="Bienvenue chez Groupomania" />
    <div v-if="User.token != null" class="jumbotron shadow-box m-3 pb-5 p-2">
      <LesMessages
        @deletePost="deletePost"
        @reload="reload"
        v-for="post in allPosts"
        v-bind:key="post.id"
        :post="post"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import LesMessages from "../components/LesMessages";
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "Home",
  components: {
    HelloWorld,
    LesMessages,
  },

  data() {
    return {
      deleteUuidPost: "Test",
      post: {
        uuid: "",
        message: "",
        titre: "",
      },
      allPosts: [],
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    getPost() {
      axios
        .get("http://localhost:3000/api/post")
        .then((response) => {
          console.log("post", response.data);
          this.allPosts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    reload(reload){
      this.getPost()
      console.log(reload)
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
          this.getPost();
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getPost();
  },
};
</script>
