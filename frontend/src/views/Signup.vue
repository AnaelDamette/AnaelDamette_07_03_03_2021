<template>
  <div class="container">
    <form class="row d-flex jumbotron shadow-box opacity ml-auto mr-auto mt-5">
      <div class="col-sm-6 p-3 d-flex justify-content-center">
        <figure><img src="../img/icon-above-font.png" class="w-75" /></figure>
      </div>
      <div class="col-sm-6 p-3 d-flex flex-column justify-content-center">
        <div class="form-group">
          <label for="inputEmail"><p class="m-0">Email Groupomania</p></label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="dataSignup.mail"
          />
        </div>
        <div class="form-group">
          <label for="inputUsername"><p class="m-0">Pseudo</p></label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            v-model="dataSignup.pseudo"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword"><p class="m-0">Mot de passe</p></label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataSignup.password"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button
            @click.prevent="sendSignup"
            type="submit"
            class="btn btn-primary w-25"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      dataSignup: {
        pseudo: null,
        mail: null,
        password: null,
        isAdmin: false
      },
      msg: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    sendSignup() {
      console.log(
        "test N°1 je suis dans sendSignup " +
          this.dataSignup.mail +
          " " +
          this.dataSignup.pseudo +
          " " +
          this.dataSignup.password
      );
      const url = "http://localhost:3000/api/auth/signup";
      const regexPassword = /\D/;
      //const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,64})/; regex Password avec 1 charactère spécial 1 majuscule minimum
      const regexEmail = /^[a-z0-9!#$ %& '*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&' * +/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;
      const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
      if (
        (this.dataSignup.mail !== null ||
          this.dataSignup.pseudo !== null ||
          this.dataSignup.password !== null) &&
        regexPassword.test(this.dataSignup.password) &&
        regexEmail.test(this.dataSignup.mail) &&
        usernameRegex.test(this.dataSignup.pseudo)
      ) {
        axios
          .post(url, this.dataSignup)
          .then((response) => {
            console.log(response);
            //Réinitialisation
            this.dataSignup.mail = null;
            this.dataSignup.pseudo = null;
            this.dataSignup.password = null;
          })
          .catch((error) => console.log("voici l'erreur : " + error));
      } else {
        alert("Un problème, lors du renseignement du document");
      }
    },
  },
};
</script>