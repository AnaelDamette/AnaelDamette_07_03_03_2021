<template>
  <div class="container">
    <EnTeteProfil />
    <BodyProfil />
  </div>
</template>

<script>
import { mapState } from "vuex";
import EnTeteProfil from "../components/EnTeteProfil";
import BodyProfil from "../components/BodyProfil";

export default {
  name: "Profil",
  components: {
    EnTeteProfil,
    BodyProfil,
  },
  computed: {
    ...mapState(["User"]),
  },
  mounted() {
    this.$store.dispatch("getUserInfos");
  }
};
</script>