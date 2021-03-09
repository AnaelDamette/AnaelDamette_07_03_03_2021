<template>
  <div class="container">
    <h1 class="bg-blue rounded-pill text-center p-4 text-secondary">
      Partage tes idées !
    </h1>

    <form action="" class="row d-flex flex-column jumbotron rounded shadow-box p-3 m-4">
      <div class=" d-flex flex-column form-group">
        <label for="input_titre" class=" mt-3">
          <p>En premier un beau titre</p></label
        >
        <input
          type="text"
          class=" form-control"
          v-model="contentPost.titre"
          id="input_titre"
        />
      </div>
      <div class=" d-flex flex-column form-group">
        <label for="input_text" class="mt-3"><p>Ensuite votre jolie message !</p></label>
        <input
          type="text"
          v-model="contentPost.content"
          class=" form-control"
          id="input_text"
        />
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "CreatePost",
  data() {
    return {
      contentPost: {
        content: null,
        titre: null,
      },
    };
  },
};
</script>