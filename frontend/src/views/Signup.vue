<template>
  <div class="container">
    <form class="row d-flex jumbotron shadow-box opacity mt-6 m-auto">
      <div class="col-6 p-3 d-flex justify-content-center">
        <figure><img src="../img/icon-above-font.png" class="w-75" /></figure>
      </div>
      <div class="col-6 p-3 d-flex flex-column justify-content-center">
        <div class="form-group">
          <label for="inputEmail"><p class="m-0">Email Groupomania</p></label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            v-model="dataSignup.email"
          />
        </div>
        <div class="form-group">
          <label for="inputUsername"><p class="m-0">Pseudo</p></label>
          <input
            type="text"
            class="form-control"
            id="inputUsername"
            v-model="dataSignup.username"
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
export default {
  name: "SignUp",
  data() {
    return {
      dataSignup: {
        username: null,
        email: null,
        password: null,
      },
    };
  },
};
</script>