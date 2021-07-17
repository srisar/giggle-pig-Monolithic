<template>

  <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3 shadow">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/images/app-icon.svg" alt="" height="24px">
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
          <li class="nav-item dropdown">

            <a href="#" class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Components</a>

            <ul class="dropdown-menu">
              <li class="dropdown-item">
                <router-link :to="{name: 'demoBootloks'}" class="nav-link">Bootloks: Dialog boxes</router-link>
              </li>
              <li class="dropdown-item">
                <router-link :to="{name: 'demoModals'}" class="nav-link">Modal Windows</router-link>
              </li>
              <li class="dropdown-item">
                <router-link :to="{name: 'demoFileUploads'}" class="nav-link">Upload Example</router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item">
            <router-link to="/admin" class="nav-link">Admin Page</router-link>
          </li>
        </ul>

        <!-- right side -->
        <div class="d-flex align-items-center" v-if="showUserArea">
          <span v-if="loginState" class="me-2">
            <span class="navbar-text">Welcome {{ loggedInUser.full_name }}</span>
          </span>
          <router-link to="/login" class="btn btn-success btn-sm me-2" v-if="!loginState">Login</router-link>

          <router-link to="/admin/users" class="btn btn-outline-success btn-sm me-2" v-if="loginState && userType === 'ADMIN'">
            <i class="bi bi-people-fill"></i>Manage users
          </router-link>

          <button class="btn btn-danger btn-sm" @click="logout" v-if="loginState">Logout</button>
        </div>
      </div>
    </div>
  </nav>

</template>

<script>
import {errorDialog} from "../assets/libs/bootloks";

export default {
  name: "TopNavigationBar",

  data() {
    return {

      /* use this flag to set if navbar should display user admin area */
      showUserArea: false,

    };
  },


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
