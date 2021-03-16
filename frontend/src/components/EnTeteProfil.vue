<template>
  <div class="hello container ml-auto mr-auto mt-5">
    <h1 class="bg-blue rounded-pill text-center p-3 text-secondary">
      Ton Profil {{ User.username  }}
    </h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
  
export default {
  name: "EnTeteProfil",
  computed: {
    ...mapState(["User"])
  }
};
</script>