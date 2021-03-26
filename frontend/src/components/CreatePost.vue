<template>
  <div class="container">
    <h1 class="bg-blue rounded-pill text-center p-4 text-secondary">
      Partage tes idées !
    </h1>

    <form
      action=""
      class="row d-flex flex-column jumbotron rounded shadow-box p-3 m-4"
    >
      <div class="d-flex flex-column col-12 form-group p-3">
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
      <div class="d-flex flex-column col-12 form-group p-3">
        <div
          class="d-flex justify-content-start bg-dark rounded shadow-box pt-2 pl-3"
        >
          <label for="input_text" class="text-secondary">
           Ensuite votre joli message !</label
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
      <label for="inputFile" v-show="false">Entrez un nouveau message</label>
      <input
      class="col-12"
        name="inputFile"
        type="file"
        id="inputFile"
        @change="onFileChange"
      />
      <div class="d-flex form-group mt-2 col-12 justify-content-end">
        <input
          type="submit"
          class="btn btn-primary md-w-25"
          @click.prevent="createPost"
          value="Submit"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import router from "../router/index";
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        message: null,
        titre: null,
        image: {
          name:'NC'
        }
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    createPost() {
      console.log(this.contentPost);
      const fd = new FormData();
      if(this.contentPost.image.name != 'NC'){fd.append("image", this.contentPost.image, this.contentPost.image.name);}
      
      fd.append("message", this.contentPost.message)
      fd.append("titre", this.contentPost.titre)
      let uuid = localStorage.getItem("uuid");
      if (this.contentPost.message != null && this.contentPost.titre != null) {
        axios
          .post(
            "http://localhost:3000/api/post/create/" + uuid, fd
          )
          .then((response) => {
            if (response) {
              router.push("/");
            }
          })
          .catch((error) => (this.msgError = error));
      }
    },
    onFileChange(event) {
      console.log(event);
      this.contentPost.image = event.target.files[0]
      console.log(this.contentPost.image)
    },
  },
};
</script>