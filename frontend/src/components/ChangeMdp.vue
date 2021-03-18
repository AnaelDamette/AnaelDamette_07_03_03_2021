<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale card">
      <div v-on:click="toggleModale" class="btn-modale btn btn-danger">X</div>
      <form>
        <div class="form-group">
          <label for="InputNewPassword">Entrez un nouveau password</label>
          <input
            type="password"
            class="form-control"
            id="InputNewPassword"
            v-model="changePwd.newPassword"
          />
        </div>
        <div class="form-group">
          <label for="RepeatInputNewPassword"
            >Répétez votre nouveau password</label
          >
          <input
            type="password"
            class="form-control"
            id="RepeatInputNewPassword"
            v-model="changePwd.RepeatNewPassword"
          />
        </div>
        <button
          @click="changePassword"
          type="button"
          class="p-2 m-2 btn btn-success w-50"
        >
          Valider
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "ChangeMdp",
  props: ["revele", "toggleModale"],

  data() {
    return {
      changePwd: {
        newPassword: null,
        ReapeatNewPassword: null,
      },
    };
  },
  computed: {
    ...mapState(["User"]),
  },
  methods: {
    test()  {
      console.log("test")
    },
    changePassword: function() {
      console.log('Bien dans la fonction changePassword')
      if (
        this.changePwd.newPassword == this.changePwd.RepeatNewPassword &&
        this.changePwd.newPassword != "" &&
        this.changePwd.RepeatNewPassword != ""
      ) {
        let uuid = localStorage.getItem("uuid");
        console.log(this.changePwd.newPassword)
        axios
          .put(
            
            "http://localhost:3000/api/auth/update/" + uuid, { newPassword: this.changePwd.newPassword })

          .then((response) => {
            console.log("pwd change", response);
            this.revele = false;
          })
          .catch((err) => {
            console.log("admin", err);
          });
      } else {
        document.getElementById("retour-api").classList.add("text-danger");
      }
    },
  },
};
</script>

<style scoped>
.bloc-modale {
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modale {
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  position: fixed;
  top: 30%;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>