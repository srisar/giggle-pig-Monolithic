<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/images/navbar-icon.svg" alt="" height="24px">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- left side -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bs-dialogs" class="nav-link">BS-Dialogs</router-link>
          </li>
        </ul>

        <!-- right side -->
        <div class="d-flex align-items-center">
          <span v-if="loginState" class="me-2">
            <span class="navbar-text">Welcome {{ loggedInUser.full_name }}</span>
          </span>
          <router-link to="/login" class="btn btn-success btn-sm me-2" v-if="!loginState">Login</router-link>

          <router-link to="/users" class="btn btn-outline-success btn-sm me-2" v-if="loginState && userType === 'ADMIN'"><i class="bi bi-people-fill"></i>Manage
            users
          </router-link>

          <button class="btn btn-danger btn-sm" @click="logout" v-if="loginState">Logout</button>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import {errorDialog} from "../assets/libs/bs-dialogs";

export default {
  name: "TopNavigationBar",

  computed: {

    loginState() {
      return this.$store.getters.getLoginStatus;
    },

    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },

    userType() {
      return this.$store.getters.getUserType;
    }

  },

  methods: {

    async logout() {

      try {
        await this.$store.dispatch( "auth_logout" );
        await this.$router.push( "/login" );

      } catch ( e ) {
        errorDialog( { message: "Login attempt failed." } );
      }

    },

  },

}
</script>

<style scoped>

</style>
