<template>
  <div>
      <div class="bg-light rounded shadow-box p-3 d-flex flex-column justify-content-between">
      <div> <p> Titre : {{ titre }} </p></div>  
      <div> <p> Mon Post : {{ message }} </p></div>
      <div class="d-flex justify-content-end"> 
          <button class="btn btn-primary m-2"><i class="fas fa-comment-dots"></i></button>
          <button class="btn btn-primary m-2"><i class="fas fa-ban"></i></button>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MesMessages",
  props: {
    msg: String,
  },
  computed: {
    ...mapState(["User"]),
  },
};
</script>
