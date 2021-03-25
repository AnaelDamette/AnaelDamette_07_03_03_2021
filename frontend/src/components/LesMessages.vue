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
    @ModaleModifyComment="ModaleModifyComment" />
    <div
      class="bg-light rounded shadow-box m-2 p-3 d-flex flex-column justify-content-between"
    >
      <div class="jumbotron rounded shadow-box p-2 d-flex justify-content-between">
        <p>{{ post.titre }}</p>
        <p>Posté par : {{ post.user.username}}</p>
      </div>
      <div class="">
        <figure class=""><img :src="post.attachement" class="w-50 m-2 rounded float-left" /></figure>
        <figcaption><p class="text-justify">{{ post.message }}</p></figcaption>
      </div>
      <div class='d-flex justify-content-between '>
      <p class="d-flex align-items-center">Créer le : {{ this.postDate }}</p>
      <div class="d-flex justify-content-end m-2 p-2">
        
        <button class="btn btn-primary m-2"
        @click="showModaleComment = !showModaleComment">
          <i class="far fa-comments"></i>
        </button>
        <button
          v-if="
             this.User.userID == this.post.user.uuid
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
        <button @click='CommentMessage' class="btn btn-primary m-2">Commentaires</button>
      </div>
      
      </div>
      <Comments v-show="showComment" :post="post" @showCommentMessage="showCommentMessage"/>
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
      postDate: "",
      showModaleModify: false,
      modifPost: this.post,
      comment: this.post,
      showModaleComment: false,
      showComment: false,
      closeComment: true,
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    AfficheDate(){
      let createdAt = new Date(this.post.createdAt)
      this.postDate = createdAt.toLocaleDateString()

    },
    reload() {
      this.$emit("reload");

    },
    updateDeletePost() {
      const deleteUuidPost = this.post.uuidPost;
      console.log("test dans updateDeletePost : " + deleteUuidPost);
      this.$emit("deletePost", deleteUuidPost);
    },
    ModaleModify(showModaleModify) {
      console.log(this.User);
      console.log("je suis dans modaleModify");
      this.showModaleModify = showModaleModify;
      this.reload()
    },
    ModaleModifyComment(showModaleComment) {
      console.log('je suis dans modaleComment')
      this.showModaleComment = showModaleComment
      this.reload()
    },
    showCommentMessage(closeComment){
        this.closeComment = closeComment
      this.CommentMessage()
    },
    CommentMessage(){
      console.log("j'affiche/ je ferme les comments showComment = " + this.showComment)
      if(this.closeComment == false) {
        this.reload()
        this.closeComment = true
        }
      else {this.showComment = !this.showComment}
      
      console.log(this.showComment)

    },

  },
  beforeMount() {
    this.AfficheDate()
  }
};
</script>
