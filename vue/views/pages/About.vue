<template>

  <div>

    <TopNavigationBar/>

    <div class="container mt-2">
      <div class="row">
        <div class="col">

          <h3 class="text-center">About</h3>
          <p>This page is a protected page. Unless valid login is provided, this page cannot be displayed & will be redirected to login page.</p>
          <hr>



        </div>
      </div>
    </div>

  </div>

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import axios from "axios";

export default {
  name: "About",
  components: {TopNavigationBar},

  data() {
    return {
      users: []
    }
  },

  mounted() {


  },

}
</script>

<style scoped>

</style>
