<template>
  <div>
    <ModaleModify
      v-bind:key="modifPost.id"
      :modifPost="modifPost"
      v-show="showModaleModify"
      @ModaleModify="ModaleModify"
    />
    <div
      class="bg-light rounded shadow-box p-3 d-flex flex-column justify-content-between"
    >
      <div class="jumbotron rounded shadow-box p-2">
        <p>{{ post.titre }}</p>
      </div>
      <div class="">
        <figure class=""><img :src="post.attachement" class="w-50 rounded float-left m-2" /></figure>
        <figcaption><p class="text-justify  ">{{ post.message}}</p></figcaption>
      </div>
      <div class="d-flex justify-content-end">
        <button
          v-bind:post="post"
          @click="showModaleModify = !showModaleModify"
          class="btn btn-primary m-2"
        >
          <i class="fas fa-comment-dots"></i>
        </button>
        <button @click="updateDeletePost" class="btn btn-primary m-2">
          <i class="fas fa-ban"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ModaleModify from "../components/ModaleModify";

export default {
  name: "MesMessages",
  components: {
    ModaleModify,
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
      console.log("je suis dans modaleModify");
      this.showModaleModify = showModaleModify;
      this.$emit("reload", reload);
    },
  },
};
</script>
