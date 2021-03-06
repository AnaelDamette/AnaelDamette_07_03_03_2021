<template>
  <div class="conntainer">
    <h1 class="bg-blue rounded-pill text-center p-4 text-secondary">
      Partage tes idées !
    </h1>
    <form action="" class="row d-flex flex-column jumbotronc rounded shadow-box p-3 m-4">
      <div class=" d-flex flex-column">
        <label for="input_titre" class="input-text">
          En premier un beau titre</label
        >
        <input
          type="text"
          class="input-text"
          v-model="contentPost.titre"
          id="input_titre"
        />
      </div>
      <div class=" d-flex flex-column">
        <label for="input_text">ensuite votre beau message !</label>
        <input
          type="text"
          v-model="contentPost.content"
          class="input-text"
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