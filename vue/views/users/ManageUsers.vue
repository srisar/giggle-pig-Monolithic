<template>

  <div>

    <TopNavigationBar/>

    <div class="container">

      <div class="row">
        <div class="col">

          <h2>Manage Users</h2>

          <p>The table contains available users in the system. <router-link to="/users/create">Create new user</router-link></p>
          <table class="table table-bordered table-sm">
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
              <td><router-link :to="'/users/edit/' + user.id">{{ user.full_name }}</router-link></td>
              <td>{{ user.username }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.role }}</td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>

  </div>

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import axios from "axios";

export default {
  name: "ManageUsers",
  components: {TopNavigationBar},

  data() {
    return {
      users: []
    }
  },

  async mounted() {

    try{

      let response = await axios.get("users/all.php");

      this.users = response.data.payload;

    }catch (e){
      console.log(e);
    }

  },
}
</script>

<style scoped>

</style>
