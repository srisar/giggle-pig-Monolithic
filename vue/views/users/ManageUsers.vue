<template>

  <div>

    <TopNavigationBar/>

    <div class="container">

      <div class="row">
        <div class="col">

          <h2>Manage Users</h2>

          <p>The table contains available users in the system.
            <router-link to="/users/create">Create new user</router-link>
          </p>

          <table class="table table-bordered table-sm" v-if="users.length > 0">
            <thead>
            <tr>
              <th>Full name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
            </thead>

            <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <router-link :to="'/users/edit/' + user.id">{{ user.full_name }}</router-link>
              </td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
            </tbody>
          </table>

          <div class="alert alert-warning text-center" v-else>
            No users found in the system
          </div>

        </div>
      </div>

    </div>

  </div>

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import {errorDialog} from "../../assets/libs/bs-dialogs";

export default {
  name: "ManageUsers",
  components: { TopNavigationBar },

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
    } catch ( e ) {
      errorDialog( { message: "Failed to get users details" } );
    }

  },
}
</script>

<style scoped>

</style>
