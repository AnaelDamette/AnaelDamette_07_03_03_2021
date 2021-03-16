<template>
  <div class="container">
    <form class="row d-flex jumbotron shadow-box opacity ml-auto mr-auto mt-5">
      <div class="col-sm-6 p-3 d-flex justify-content-center">
        <figure><img src="../img/icon-above-font.png" class="w-75" /></figure>
      </div>
      <div class="col-sm-6 p-3 d-flex flex-column justify-content-center">
        <div class="form-group">
          <label for="inputUsername"><p class="m-0">username</p></label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            v-model="dataLogin.username"
          />
        </div>
        <div class="form-group">
          <label for="inputPassword"><p class="m-0">Mot de passe</p></label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            v-model="dataLogin.password"
          />
        </div>
        <div class="d-flex justify-content-end">
          <button
            @click.prevent="logIn"
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
import axios from "axios";
import { mapState } from "vuex";
import store from "../store/index";
import router from "../router/index"

export default {
  name: "SignUp",
  data() {
    return {
      dataLogin: {
        username: null,
        password: null,
      },
      msg: "",
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    logIn() {
      if (
        this.dataLogin.username !== null ||
        this.dataLogin.password !== null
      ) {
        axios
          .post("http://localhost:3000/api/auth/login", this.dataLogin)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            store.commit("saveToken");
            router.push('/')
          })
          .catch((error) => console.log(error));
        console.log(store.state.User);
      } else {
        console.log("Une petite erreur ici !");
      }
    },
  },
};
</script>