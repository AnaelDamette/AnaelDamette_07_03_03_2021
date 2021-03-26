<template>
  <div class="hello container ml-auto mr-auto mt-5">
    <h1 class="bg-blue rounded-pill text-center p-3 text-secondary">
      <img src="../img/icon-black.png" alt="Logo Groupomania" />
      {{ msg  }}
    </h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
  
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: {
    ...mapState(["User"])
  }
};
</script>
