<template>    
    <header>
      <div id="nav" class="navbar navbar-expand-lg mb-3 navbar-light bg-blue d-flex justify-content-between">
          <router-link to="/" class="nav-item figure p-1">
          <img class="img-nav" src="../img/icon-black.png" />
          </router-link>
          <div class="d-flex justify-content-around">
            <router-link to=/login  v-if="true == true" class="nav-item p-1 text-secondary shadow-text"> Connexion </router-link>
            <router-link to=/signup  v-if=" true==true" class="nav-item p-1 text-secondary shadow-text">Inscription </router-link>            
            <router-link to=/wall  v-if="true == false" class="nav-item p-1 text-secondary shadow-text"> Actus </router-link>
            <router-link to=/wall/post v-if="true == false" class="nav-item p-1 text-secondary shadow-text">Mes Posts </router-link>
          </div>
      </div>
    </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    msg: String,
  }
}
</script>