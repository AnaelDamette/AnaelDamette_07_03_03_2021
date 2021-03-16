<template>
  <div class="jumbotron container h-100 ml-auto mr-auto mt-5 shadow-box">
    <div class="row">
      <div
        class="col-lg-4 bg-light shadow-box d-flex flex-column p-3 m-3 justify-content-around"
      >
        <h2 class="bg-dark rounded shadow-box text-center p-2 text-secondary">
          Ton profil
        </h2>
        <div class="p-2 m-2">
          <p>Ton Compte : {{ User.username }}</p>
        </div>
        <div class="p-2 m-2">
          <p>Ton mail : {{ User.mail }}</p>
        </div>
        <button class="p-2 m-2 btn btn-primary w-50">
          Changement de Mot de Passe
        </button>
        <button class="p-2 m-2 btn btn-danger w-50">Supprimer le profil</button>
      </div>
      <div
        class="col-lg-7 bg-light shadow-box d-flex flex-column p-3 m-3 justify-content-around"
      >
        <h2 class="bg-dark rounded shadow-box text-center p-2 text-secondary">
          Tes messages
        </h2>
        <div class="jumbotron h-75 m-2 shadow-box">
          <MesMessages />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import MesMessages from "../components/MesMessages";

export default {
  name: "BodyProfil",
  components: {
    MesMessages,
  },
  computed: {
    ...mapState(["User"]),
  },
};
</script>