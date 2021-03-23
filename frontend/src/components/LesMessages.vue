<template>
  <div>
    <ModaleModify
      v-bind:key="modifPost.id"
      :modifPost="modifPost"
      v-show="showModaleModify"
      @ModaleModify="ModaleModify"
    />
    <ModaleComment
    v-bind:key="comment.id"
    :post="post"
    v-show="showModaleComment"
    @ModaleComment="ModaleComment" />
    <div
      class="bg-light rounded shadow-box m-2 p-3 d-flex flex-column justify-content-between"
    >
      <div class="jumbotron rounded shadow-box p-2">
        <p>{{ post.titre }}</p>
      </div>
      <div class="d-flex">
      <div class='col-6'>
        <p>{{ post.message }}</p>
      </div>
        <figure class="rounded p-1 bg-dark"><img :src="post.attachement" class="w-100 rounded" /></figure>
      </div>
      <Comments v-show="showComment" :post="post"/>
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary m-2"
        @click="showModaleComment = !showModaleComment">
          <i class="far fa-comments"></i>
        </button>
        <button
          v-if="
            this.User.isAdmin == 1 || this.User.userID == this.post.user.uuid
          "
          v-bind:post="post"
            @click="showModaleModify = !showModaleModify"
          class="btn btn-primary m-2"
        >
          <i
            class="fas fa-comment-dots"
            
          ></i>
        </button>
        <button
          v-if="
            this.User.isAdmin == 1 || this.User.userID == this.post.user.uuid
          "
          @click="updateDeletePost"
          class="btn btn-primary m-2"
        >
          <i class="fas fa-ban"></i>
        </button>
        <button @click='showComment = !showComment' class="btn btn-primary m-2">Commentaires</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModaleModify from "../components/ModaleModify";
import ModaleComment from "../components/ModaleComment";
import Comments from "../components/Comments"

export default {
  name: "LesMessages",
  components: {
    ModaleModify,
    ModaleComment,
    Comments
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
      comment: this.post,
      showModaleComment: false,
      showComment: false,
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
      console.log(this.User);
      console.log("je suis dans modaleModify");
      this.showModaleModify = showModaleModify;
      this.$emit("reload", reload);
    },
    ModaleComment(showModaleComment) {
      let reload = true;
      console.log('je suis dans modaleComment')
      this.showModaleComment = showModaleComment
      this.$emit("reload", reload)
    }
  },
};
</script>
