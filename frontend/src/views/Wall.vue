<template>
  <div class="container">
    <CreatePost />
  </div>
</template>

<script>
import CreatePost from '@/components/CreatePost.vue'
export default {
  name: "Wall",
  components: {
    CreatePost,
  },
};
</script>