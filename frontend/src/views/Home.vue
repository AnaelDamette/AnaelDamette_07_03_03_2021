<template>
  <div class="home container ">
    <HelloWorld msg="Bienvenue chez Groupomania" />
    <div v-if="User.token != null" class='jumbotron shadow-box m-3 p-2'>
    <MesMessages /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import MesMessages from '../components/MesMessages'
import { mapState } from "vuex";

export default {
  name: 'Home',
  components: {
    HelloWorld,
    MesMessages
  },
  computed: {
    ...mapState(["User"]),
  },
}
</script>
