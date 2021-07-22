<template>

  <div id="view:manage_users">


    <div class="container my-3">

      <div class="row justify-content-center">

        <div class="col-12 col-md-8">


          <div class="card shadow">
            <div class="card-header">Manage Users</div>
            <div class="card-body">

              <p>The table contains available users in the system.
                <router-link to="/admin/users/create">Create new user</router-link>
              </p>


              <div id="list__users" class="">

                <table class="table table-bordered data_table" v-if="users.length > 0">
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

            </div><!-- card-body -->
          </div><!-- card -->


        </div>

      </div>

    </div>

  </div>

</template>

<script>
import {errorDialog} from "../../../assets/libs/bootloks";
import AdminSidebar from "../components/AdminSidebar";

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

      $( ".data_table" ).DataTable();

    } catch ( e ) {
      errorDialog( { message: "Failed to get users details" } );
    }

  },
}
</script>

<style scoped>

</style>
