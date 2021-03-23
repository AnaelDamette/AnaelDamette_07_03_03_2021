<template>
  <div class="bloc-modale">
    <div class="overlay" @click="toggleModifyModale"></div>
    <div class="modale card">
      <div @click="toggleModifyModale" class="btn-modale btn btn-danger">X</div>
      <form>
        <div class="form-group">
          <label for="InputNewTitre">Entrez un nouveau titre</label>
          <input type="titre" class="form-control" v-model="newPost.newTitre" />
        </div>
        <div class="form-group">
          <label for="InputNewMessage">Entrez un nouveau message</label>
          <textarea
            type="message"
            class="form-control"
            rows="8"
            v-model="newPost.newMessage"
          />
        </div>
        <input
          name="inputFile"
          type="file"
          id="inputFile"
          @change="onFileChange"
        />
        <button
          @click="modifyPost"
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
  name: "ModaleModify",
  props: {
    modifPost: {
      type: Object,
      message: String,
      titre: String,
    },
  },
  data() {
    return {
      newPost: {
        type: Object,
        newMessage: this.modifPost.message,
        newTitre: this.modifPost.titre,
        newAttachement: this.modifPost.attachement,
      },
      msgError: "",
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    modifyPost() {
      console.log(this.User.userID);

      const fd = new FormData();

      fd.append(
        "image",
        this.newPost.newAttachement
      );
      fd.append("newMessage", this.newPost.newMessage);
      fd.append("newTitre", this.newPost.newTitre);
      fd.append("userOrder", this.User.userID);
      fd.append("uuidPost", this.modifPost.uuidPost);

      let uuid = localStorage.getItem("uuid");

      axios
        .put("http://localhost:3000/api/post/update/" + uuid, fd)

        .then((response) => {
          this.toggleModifyModale();
          console.log("reponse de modifyPost  " + response);
        })
        .catch((err) => {
          console.log("err modifyPost  " + err);
        });
    },
    toggleModifyModale() {
      let showModaleModify = false;
      console.log(showModaleModify);
      this.$emit("ModaleModify", showModaleModify);
    },

    onFileChange(event) {
      console.log(event);
      this.newPost.newAttachement = event.target.files[0];
      console.log(this.newPost.newAttachement);
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 60% !important;
}
</style>