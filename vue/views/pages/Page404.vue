<template>

  <div class="container">
    <div class="row">

      <div class="col">

        <div class="text-center">
          <img class="error-404-icon" src="../../assets/images/error-404.svg" alt="Error 404">
        </div>

        <div class="text-center">
          <h1>You have reached a dead end!</h1>
          <router-link to="/">Back to homepage</router-link>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
export default {
  name: "Page404"
}
</script>

<style scoped>

.error-404-icon {
  width: 300px;
}

</style>
