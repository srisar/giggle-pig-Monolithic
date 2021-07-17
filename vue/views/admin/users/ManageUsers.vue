<template>

  <div>


    <div class="container">

      <div class="row">

        <div class="col my-3" id="content-area">

          <div class="row">
            <div class="col-12 col-md-8 col-lg-6">
              <h2>Manage Users</h2>

              <p>The table contains available users in the system.
                <router-link to="/admin/users/create">Create new user</router-link>
              </p>


              <div id="list__users">


                <div class="row g-3 mb-3">
                  <div class="col">

                    <div class="input-group">
                      <input class="search form-control" placeholder="Search"/>
                      <button class="sort btn btn-outline-secondary" data-sort="full_name">Sort by name</button>
                      <button class="sort btn btn-outline-secondary" data-sort="email">Sort by email</button>
                    </div>

                  </div>
                </div>


                <table class="table table-bordered table-sm table-responsive" v-if="users.length > 0">
                  <thead>
                  <tr>
                    <th>Full name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                  </thead>

                  <tbody class="list">
                  <tr v-for="user in users" :key="user.id">
                    <td class="full_name">
                      <router-link :to="{name: 'editUser', params: {id: user.id}}">{{ user.full_name }}</router-link>
                    </td>
                    <td class="username">{{ user.username }}</td>
                    <td class="email">{{ user.email }}</td>
                    <td class="role">{{ user.role }}</td>
                  </tr>
                  </tbody>
                </table>

                <div class="alert alert-warning text-center" v-else>
                  No users found in the system
                </div>

              </div>

            </div>
          </div>


        </div><!--  -->
      </div>

    </div>

  </div>

</template>

<script>
import {errorDialog} from "../../../assets/libs/bootloks";
import AdminSidebar from "../components/AdminSidebar";

let List = require( "list.js" );

export default {
  name: "ManageUsers",
  components: { AdminSidebar },

  data() {
    return {};
  },


  computed: {

    users() {
      return this.$store.getters.getUsers;
    },

  },


  async mounted() {

    try {
      await this.$store.dispatch( "users_fetchAll" );

      let options = {
        valueNames: ["full_name", "username", "email", "role"]
      };
      new List( "list__users", options );

    } catch ( e ) {
      errorDialog( { message: "Failed to get users details" } );
    }

  },
}
</script>

<style scoped>

</style>
