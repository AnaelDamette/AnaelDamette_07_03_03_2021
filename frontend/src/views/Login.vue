<template>
  <div class="container">
    <form class="row d-flex jumbotron shadow-box opacity mt-6 m-auto">
      <div class="col-6 p-3 d-flex justify-content-center">
        <figure><img src="../img/icon-above-font.png" class="w-75" /></figure>
      </div>
      <div class="col-6 p-3 d-flex flex-column justify-content-center">
        <div class="form-group">
          <label for="inputUsername"><p class="m-0">Pseudo</p></label>
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
export default {
  name: "SignUp",
  data() {
    return {
      dataLogin: {
        username: null,
        password: null,
      },
    };
  },
};
</script>