<template>
  <div
    class="bg-light p-2 rounded shadow-box mb-1 w-100 d-flex flex-column justify-content-between"
  >
    <p class="text-comment">{{ comment.message }}</p>
    <div class="d-flex justify-content-between align-items-center">
      <p class="text-comment">Posté par <strong>{{ comment.user.username }}</strong></p>
      <div class="d-flex align-items-end">
      <p class="text-comment">Créer le : {{ postDate}} </p>
    <button
      @click="deleteComment"
      v-if="controleComment == true"
      class="btn btn-primary m-2"
    >
      <i class="fas fa-ban"></i>
    </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios"

export default {
  name: "AffichageComments",
  props: {
    comment: {
      type: Object,
    },
  },
  data() {
    return {
       postDate: "",
      controleComment: true,
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    deleteComment() {
      let uuid = localStorage.getItem("uuid");

      axios
        .delete("http://localhost:3000/api/comments/delete/" + uuid, {
         data:{uuidComment: this.comment.uuidComment,
          userIsAdmin: this.User.isAdmin,} 
        })
        .then(() => {
          let closeComment = false
          console.log("je viens de delete un post et closeComment = " + closeComment)
          this.$emit("ShowComment", closeComment);
        })
        .catch((error) => console.log(error));
    },
    AfficheDate(){
      let createdAt = new Date(this.comment.createdAt)
      this.postDate = createdAt.toLocaleDateString()

    },
  },
  
    
  Mounted() {
    if (this.User.isAdmin == 1 || this.User.userID == this.comment.user.uuid) {
      this.controleComment = true;
    } else {
      this.controleComment = false;
    }
  },
   beforeMount() {
    this.AfficheDate()
  }
};
</script>
<style scoped>

</style>
