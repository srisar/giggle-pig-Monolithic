<template>

  <div>

    <TopNavigationBar/>

    <div class="container">
      <div class="row">

        <div class="col">

          <div class="row justify-content-center mb-3">

            <div class="text-center">
              <img src="../../assets/images/app-icon.svg" style="width: 100px;" alt="Plum Pig">
            </div>

            <div class="col-12 col-md-4">
              <img class="img-fluid" src="../../assets/images/app-logo.svg" alt="Plum Pig">
            </div>
          </div>

          <h2 class="text-center">Welcome to Plum Pig Application scaffolding</h2>
          <hr>

          <p>PHPVue application scaffolding is a minimal framework/template to develop applications with PHP backend and Vue.js-based single page application.
            It comes with an authentication mechanism
            for Vue and a way to authenticate API from backend calls.</p>


          <h3>From PHP side</h3>
          <p>It has a simple database ORM for MySQL/Maria database tables. Model-based database querying, request parameters processing, and validating
            (including Axios parameters). It also has JSON
            response classes to nicely return data in a JSON response format. </p>

          <h3>Vue side</h3>
          <p>It uses Axios as a way to communicate with backend API. Uses Laravel-mix for watching and building Vue application.</p>

        </div>

      </div>
    </div>

  </div><!-- template -->

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";


export default {
  name: "Home",
  components: { TopNavigationBar },

}
</script>

<style scoped>

</style>
