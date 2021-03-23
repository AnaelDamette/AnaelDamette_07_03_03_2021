<template>
  <div class="hello container ml-auto mr-auto mt-5">
    <div class="jumbotron p-2 m-2 d-flex flex-column rounded">
        <h2 class="text"> Commentaires : </h2>
      <div
        class="bg-light p-2 rounded shadow-box mb-1 w-100 d-flex justify-content-between"
        v-for="comment in allComment"
        v-bind:key="comment.message"
      >
        <p>{{ comment.message }}</p>
        <button
          @click="deleteComment"
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

export default {
  name: "Comments",
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
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
      deleteComment() {
          console.log('Delete Comment')
      }
  }
};
</script>
