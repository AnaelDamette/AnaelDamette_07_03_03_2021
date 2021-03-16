<template>
  <div id="app">
    
    <Header />
    <main class="flex relative"><router-view /></main>
    <footer class="bg-blue text-lg-start footer d-flex justify-content-between">
      <!-- Copyright -->
      <div class="text-center p-2">
        <p class=' text-footer '>© 2021 Copyright : Damette Corp</p>
      </div>
      <!-- Copyright -->
      <div class="text-center  p-2">
        <router-link to="/about" class='nav-item text-secondary text-footer shadow-text'>About</router-link>
      </div>
    </footer>
  </div>
</template>
<script>

import Header from "./components/Header.vue";
export default {
  components: {
    Header
  }
};
</script>
<style lang="scss">
#app {
  font-family: roboto
}
</style>
