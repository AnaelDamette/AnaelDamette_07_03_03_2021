<template>
  <div>
    <div v-if="Update"
      class="bg-light rounded shadow-box m-2 p-3 d-flex flex-column justify-content-between" 
    >
      <div class="jumbotron rounded shadow-box p-2" >
        <p>{{ post.titre }}</p>
      </div>
      <div >
        <p>{{ post.message }}</p>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary m-2">
          <i class="far fa-comments"></i>
        </button>
        <button class="btn btn-primary m-2">
          <i class="fas fa-comment-dots"></i>
        </button>
        <button @click="deletePost()" class="btn btn-primary m-2"><i class="fas fa-ban"></i></button>
        <button class="btn btn-primary m-2">Commentaires</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
//import router from "../router/index"

export default {
  name: "LesMessages",
  data() { return {Update: true}},
  props: {
    post: {
      type: Object,
      default() {},
      message: String,
      titre: String,
    },
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
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
        this.Update = false
        console.log(this.Update)
       
      })
      .catch(error => console.log(error));
    },
  },
};
</script>
