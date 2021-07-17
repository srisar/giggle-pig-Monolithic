<template>

  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-4">

        <div class="alert alert-success shadow">

          <div class="text-center">
            <router-link :to="{name: 'home'}">
              <img src="../assets/images/giggle-pig-full.svg" alt="Giggle Pig" class="img-fluid" style="width: 250px">
            </router-link>
          </div>

          <form @submit.prevent="onLogin()">
            <div class="form-floating mb-3">
              <input id="txt-username" type="text" class="form-control" v-model="username" placeholder="Username">
              <label for="txt-username" class="form-label">Username</label>
            </div>

            <div class="form-floating mb-3">
              <input id="txt-password" type="password" class="form-control" v-model="password" placeholder="password">
              <label for="txt-password" class="form-label">Password</label>
            </div>

            <div class="text-center">
              <button class="btn btn-success btn-lg" type="submit">Login</button>
            </div>
          </form>

          <div v-if="error" class="mt-3">
            <div class="alert alert-danger">
              {{ error }}
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: "Login",

  data() {
    return {

      username: "",
      password: "",

      error: "",
    }
  },


  methods: {

    async onLogin() {

      const userParams = {
        username: this.username,
        password: this.password
      };

      try {

        await this.$store.dispatch( "auth_login", userParams );
        await this.$router.push( "/" );

      } catch ( e ) {
        this.error = "Login failed. Please check your username and password";
      }


    }

  },

}
</script>

<style scoped>

</style>
