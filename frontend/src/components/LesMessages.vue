<template>
  <div>
    <ModaleModifyHome
      v-bind:key="modifPost.id"
      :modifPost="modifPost"
      v-show="showModaleModify"
      @ModaleModify="ModaleModify"
    />
    <div
      class="bg-light rounded shadow-box m-2 p-3 d-flex flex-column justify-content-between"
    >
      <div class="jumbotron rounded shadow-box p-2">
        <p>{{ post.titre }}</p>
      </div>
      <div>
        <p>{{ post.message }}</p>
      </div>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary m-2">
          <i class="far fa-comments"></i>
        </button>
        <button 
        v-if="(this.User.isAdmin == 1 || this.User.userID == this.post.user.uuid)"
          class="btn btn-primary m-2"
        >
          <i class="fas fa-comment-dots"  v-bind:post="post"
          @click="showModaleModify = !showModaleModify"></i>
        </button>
        <button 
        v-if="(this.User.isAdmin == 1 || this.User.userID == this.post.user.uuid)"
        @click="updateDeletePost" class="btn btn-primary m-2">
          <i class="fas fa-ban"></i>
        </button>
        <button class="btn btn-primary m-2">Commentaires</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModaleModifyHome from "../components/ModaleModifyHome";

export default {
  name: "LesMessages",  
  components: {
    ModaleModifyHome,
  },
  props: {
    post: {
      type: Object,
      message: String,
      titre: String,
    },
  },
  data() {
    return {
       showModaleModify: false,
       modifPost: this.post,
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    updateDeletePost() {
      const deleteUuidPost = this.post.uuidPost;
      console.log("test dans updateDeletePost : " + deleteUuidPost);
      this.$emit("deletePost", deleteUuidPost);
    },
    ModaleModify(showModaleModify) {
      let reload = true;
      console.log(this.User)
      console.log("je suis dans modaleModify");
      this.showModaleModify = showModaleModify;
      this.$emit("reload", reload);
    },
  },
};
</script>
