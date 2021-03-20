<template>
  <div class="container">
    <h1 class="bg-blue rounded-pill text-center p-4 text-secondary">
      Partage tes idées !
    </h1>

    <form
      action=""
      class="row d-flex flex-column jumbotron rounded shadow-box p-3 m-4"
    >
      <div class="d-flex flex-column form-group p-3">
        <div
          class="d-flex justify-content-start bg-dark rounded shadow-box pt-2 pl-3"
        >
          <label for="input_titre" class="">
            <p class="text-secondary">En premier un beau titre</p></label
          >
        </div>
        <input
          type="text"
          class="form-control mt-2"
          v-model="contentPost.titre"
          id="input_titre"
          placeholder="Ecris ici ton titre"
        />
      </div>
      <div class="d-flex flex-column form-group p-3">
        <div class="d-flex justify-content-start bg-dark rounded shadow-box pt-2 pl-3">
          <label for="input_text" class="">
            <p class="text-secondary">Ensuite votre joli message !</p></label
          >
        </div>
        <textarea
          type="text"
          v-model="contentPost.message"
          class="form-control mt-2"
          id="input_text"
          rows="8"
          placeholder="Ecris ici ton message"
        ></textarea>
      </div>
      <div class="d-flex form-group justify-content-end">
        <input
          type="submit"
          class="btn btn-primary w-25"
          @click.prevent="createPost"
          value="Submit"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex"
import axios from "axios"
import router from "../router/index"
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        message: null,
        titre: null,
      },
      msgError:""
    };
  },
  computed: {
    ...mapState(["User"])
  },
  methods: {
    createPost() {
      console.log(this.contentPost);
      let uuid = localStorage.getItem("uuid");
      if (this.contentPost.message != null && this.contentPost.titre != null) {
        axios
        .post("http://localhost:3000/api/post/create/" + uuid, this.contentPost)
        .then(response => {
          if(response) {
            router.push('/');
          }
        })
        .catch(error => (this.msgError = error))
      }

    },
  }
};
</script>