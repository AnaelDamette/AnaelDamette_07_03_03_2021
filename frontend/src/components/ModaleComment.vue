<template>
  <div class="bloc-modale">
    <div class="overlay" @click="toggleModaleComment"></div>
    <div class="modale card">
      <div @click="toggleModaleComment" class="btn-modale btn btn-danger">
        X
      </div>
      <form>
        <div class="form-group">
          <label for="InputNewMessage">Entrez un commentaire</label>
          <textarea
            type="message"
            class="form-control"
            rows="8"
            v-model="comment.message"
          />
        </div>
        <button
          @click="postComment"
          type="button"
          class="p-2 m-2 btn btn-success w-50"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ModaleComment",
  props: {
    post: {
      type: Object,
      message: String,
      titre: String,
    },
  },
  data() {
    return {
      comment: {
        type: Object,
        message: "",
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    toggleModaleComment() {
      let showModaleComment = false;
      console.log(showModaleComment);
      this.$emit("ModaleComment", showModaleComment);
    },
    postComment() {
      console.log("test post comment");
      console.log(this.comment.message);
      let uuid = localStorage.getItem("uuid");
      let uuidPost = this.post.uuidPost;

      axios
        .post("http://localhost:3000/api/comments/create/" + uuid, {
          uuidPost: uuidPost,
          message: this.comment.message,
        })
        .then((response) => {
          if (response) {
            this.toggleModaleComment();
            console.log("reponse de Comment " + response);
          }
        })
        .catch((err) => {
          console.log("erreur Post Comment  " + err);
        });
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 60% !important;
}
</style>