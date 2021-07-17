<template>

  <div id="view-create-user" class="mt-3">


    <div class="container-fluid">

      <div class="row justify-content-center">

        <div class="col-12 col-md-6">

          <h4 class="text-center">Add new user</h4>

          <div class="alert alert-secondary">

            <div id="form-create-user">

              <div class="row g-3 mb-3">
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="text-fullname" class="form-label">Full name</label>
                    <input type="text" id="text-fullname" class="form-control" v-model="userToCreate.full_name">
                  </div>

                </div>
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="text-username" class="form-label">Username</label>
                    <input type="text" id="text-username" class="form-control" v-model="userToCreate.username">
                  </div>

                </div>
              </div>

              <div class="row g-3 mb-3">
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="text-email" class="form-label">Email</label>
                    <input type="text" id="text-email" class="form-control" v-model="userToCreate.email">
                  </div>

                </div>
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="roles" class="form-label">Role</label>
                    <select id="roles" class="form-select" v-model="userToCreate.role">
                      <option v-for="(item, key) in roles" :key="key" :value="key">{{ item }}</option>
                    </select>
                  </div>

                </div>
              </div>


              <div class="row g-3 mb-3">
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="text-password" class="form-label">Password</label>
                    <input type="text" id="text-password" class="form-control" v-model="userToCreate.password">
                  </div>

                </div>
                <div class="col-12 col-md-6">

                  <div class="mb-0">
                    <label for="text-confirm-password" class="form-label">Confirm Password</label>
                    <input type="text" id="text-confirm-password" class="form-control" v-model="userToCreate.confirm_password">
                  </div>

                </div>
              </div>

              <div class="row" v-if="!validPassword">
                <div class="col-12">

                  <div class="alert alert-danger">
                    Invalid password or password mismatch.
                  </div>

                </div>
              </div>


              <div class="row g-3">
                <div class="col text-center">

                  <button type="button" class="btn btn-primary" :disabled="!validPassword" @click="onCreate()">Create</button>
                  <router-link to="/admin/users" class="btn btn-secondary">Cancel</router-link>

                </div>
              </div>


              <!-- feedback messages -->
              <div v-if="feedback.message" class="mt-3">
                <div class="alert" :class="feedbackAlertClass">
                  {{ feedback.message }}
                </div>
              </div>


            </div><!-- form-create-user -->
          </div><!-- alert -->
        </div><!-- col -->
      </div><!-- row -->
    </div><!-- container -->

  </div><!-- template -->

</template>

<script>

export default {
  name: "CreateUser",
  components: {},
  data() {
    return {

      userToCreate: {
        username: "",
        full_name: "",
        role: "USER",
        email: "",
        password: "",
        confirm_password: "",
      },

      feedback: {
        message: "",
        type: "error"
      },


    };
  },

  computed: {
    roles() {
      return this.$store.getters.getUserRoles;
    },

    feedbackAlertClass() {
      if ( this.feedback.type === "error" ) return "alert-danger";
      return "alert-success";
    },

    validPassword() {
      if ( this.userToCreate.password === "" || this.userToCreate.password.length < 3 ) return false;
      return this.userToCreate.password === this.userToCreate.confirm_password;
    }

  },

  mounted() {
    /* */
  },

  methods: {

    async onCreate() {

      /* resetting feedback */
      this.feedback.message = "";
      this.feedback.type = "";

      const user = {
        username: this.userToCreate.username,
        full_name: this.userToCreate.full_name,
        password: this.userToCreate.password,
        email: this.userToCreate.email,
        role: this.userToCreate.role,
      };

      try {
        await this.$store.dispatch( "users_createUser", user );
        await this.$router.push( "/admin/users" );

      } catch ( e ) {
        this.feedback.message = e.response.data.payload.error;
        this.feedback.type = "error";
      }

    },

  },

}
</script>

<style scoped>

</style>
