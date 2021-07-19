<template>

  <div class="container mt-3">

    <div class="row">
      <div class="col">

        <h1>Admin Panel</h1>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore eligendi esse, et eveniet explicabo, illum maxime nam nesciunt non nostrum
          officia placeat possimus quaerat qui quibusdam recusandae soluta tempore, ut!</p>


        <hr>

        <p>Simple list.js based table implementation.</p>

        <div id="users">

          <div class="mb-3">
            <div class="input-group">
              <input class="search form-control" placeholder="Search"/>
              <button class="sort btn btn-sm btn-primary" data-sort="born">Sort by name</button>
            </div>
          </div>


          <table class="table table-bordered table-striped">
            <!-- IMPORTANT, class="list" have to be at tbody -->
            <tbody class="list">
            <tr>
              <td class="name">Jonny Stromberg</td>
              <td class="born">1986</td>
            </tr>
            <tr>
              <td class="name">Jonas Arnklint</td>
              <td class="born">1985</td>
            </tr>
            <tr>
              <td class="name">Martina Elm</td>
              <td class="born">1986</td>
            </tr>
            <tr>
              <td class="name">Gustaf Lindqvist</td>
              <td class="born">1983</td>
            </tr>
            </tbody>
          </table>

        </div>


      </div>
    </div>
  </div>

</template>

<script>

let List = require( "list.js" );

export default {
  name: "AdminIndexView",

  mounted() {

    var options = {
      valueNames: ['name', 'born']
    };

    var userList = new List( 'users', options );

  },

}
</script>

<style scoped>

</style>
