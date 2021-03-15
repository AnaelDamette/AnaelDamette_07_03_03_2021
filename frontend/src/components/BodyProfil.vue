<template>
  <div class="jumbotron container ml-auto mr-auto mt-5">
    <p>Test voir si il affiche bien les deux component</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
  
export default {
  name: "BodyProfil",
  computed: {
    ...mapState(["User"])
  }
};
</script>