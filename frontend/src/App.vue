<template>
  <div id="app">
    <header>
      <div id="nav" class="navbar navbar-expand-lg mb-3 navbar-light bg-light">
          <router-link to="/" class="nav-item figure p-1">
          <img class="img-nav" src="./img/icon-black.png" />
          </router-link>
      </div>
      <router-view />
    </header>
    <main class="flex relative"></main>
    <footer class="bg-light text-lg-start footer d-flex justify-content-between">
      <!-- Copyright -->
      <div class="text-center p-3">
        <p class='text-secondary text-footer'>© 2021 Copyright : Damette Corp</p>
      </div>
      <!-- Copyright -->
      <div class="text-center  p-3">
        <router-link to="/about" class='text-secondary text-footer'>About</router-link>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
</style>
