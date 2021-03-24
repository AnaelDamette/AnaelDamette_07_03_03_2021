<template>
  <div class="hello container ml-auto mr-auto mt-5">
    <div class="jumbotron p-2 m-2 d-flex flex-column rounded">
        <h2 class="text"> Commentaires : </h2>
        <AffichageComments v-for="comment in allComment"
        :comment="comment"
        v-bind:key="comment.message"
        @ShowComment="ShowComment" />
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AffichageComments from './AffichageComments'

export default {
  name: "Comments",
  components: { AffichageComments,},
  
  props: {
    post: {
      type: Object,
      message: String,
      titre: String,
    },
  },
  data() {
    return {
      allComment: this.post.comment,
      comment: {
        type: Object
      }
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    ShowComment(closeComment) {
      console.log("je suis dans Comments closeComment = " + closeComment)
      this.$emit("showCommentMessage", closeComment);
    }
      
  },
  
};
</script>
