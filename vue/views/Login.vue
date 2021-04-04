<template>

  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6">

        <div class="alert alert-success">

          <form @submit.prevent="onLogin">
            <div class="mb-3">
              <label for="txt-username" class="form-label">Username</label>
              <input id="txt-username" type="text" class="form-control" v-model="username">
            </div>

            <div class="mb-3">
              <label for="txt-password" class="form-label">Password</label>
              <input id="txt-password" type="password" class="form-control" v-model="password">
            </div>

            <div class="text-center">
              <button class="btn btn-success" type="submit">Login</button>
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

      username: '',
      password: '',

      error: ''

    }
  },

  methods: {

    onLogin: function () {

      const payload = {
        username: this.username,
        password: this.password
      }

      this.$store.dispatch('LOGIN', payload)
          .then(response => {


            this.$router.push('/')

          })
          .catch(error => {
            this.error = 'Login failed. Please check your username and password'
          })

    }

  },

}
</script>

<style scoped>

</style>
