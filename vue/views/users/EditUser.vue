<template>

  <div>

    <TopNavigationBar/>

    <div class="container" v-if="userToEdit">

      <div class="row justify-content-center">
        <div class="col-12 col-md-6">

          <h4 class="text-center">Edit {{ userToEdit.full_name }} details</h4>

          <div class="alert alert-secondary">

            <div id="form-edit-user">

              <div class="row g-3">
                <div class="col">

                  <div class="mb-3">
                    <label for="text-fullname" class="form-label">Full name</label>
                    <input type="text" id="text-fullname" class="form-control" v-model="userToEdit.full_name">
                  </div>

                </div>
                <div class="col">

                  <div class="mb-3">
                    <label for="text-username" class="form-label">Username</label>
                    <input type="text" id="text-username" class="form-control" v-model="userToEdit.username">
                  </div>

                </div>
              </div>


              <div class="row g-3">
                <div class="col">

                  <div class="mb-3">
                    <label for="text-email" class="form-label">Email</label>
                    <input type="text" id="text-email" class="form-control" v-model="userToEdit.email">
                  </div>

                </div>
                <div class="col">


                  <div class="mb-3">
                    <label for="roles" class="form-label">Role</label>
                    <select id="roles" class="form-select" v-model="userToEdit.role" :disabled="isSameAsLoggedInUser">
                      <option v-for="(item, key) in roles" :key="key" :value="key">{{ item }}</option>
                    </select>
                  </div>

                </div>
              </div>

              <div class="text-center">
                <button type="button" class="btn btn-primary" @click="onUpdate()">Update</button>
                <router-link to="/users" class="btn btn-secondary">Cancel</router-link>
              </div>

              <hr>

              <div class="text-center mb-3">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="checkbox" id="check-change-password" v-model="isChangingPassword">
                  <label class="form-check-label" for="check-change-password">
                    Change password
                  </label>
                </div>
              </div>

              <!-- change password area -->
              <div v-if="isChangingPassword">

                <div class="row g-3">
                  <div class="col">

                    <div class="mb-3">
                      <label for="current-password">Current password</label>
                      <input id="current-password" type="password" class="form-control" v-model="passwordToChange.currentPassword">
                    </div>

                  </div>

                </div>

                <div class="row">
                  <div class="col">

                    <div class="mb-3">
                      <label for="new-password">New password</label>
                      <input id="new-password" type="password" class="form-control" v-model="passwordToChange.newPassword"
                             :class="{'is-invalid': !isNewPasswordValid, 'is-valid': isNewPasswordValid}">
                      <div class="invalid-feedback">New password is empty or not valid</div>
                      <div class="valid-feedback">All looks good!</div>
                    </div>

                  </div>

                  <div class="col">

                    <div class="mb-3">
                      <label for="confirm-new-password">New password</label>
                      <input id="confirm-new-password" type="password" class="form-control" v-model="passwordToChange.confirmNewPassword"
                             :class="{'is-invalid': !isNewPasswordValid, 'is-valid': isNewPasswordValid}">
                    </div>

                  </div>
                </div>

                <div class="col text-center">
                  <button class="btn btn-primary" type="button" :disabled="!isNewPasswordValid" @click="onUpdatePassword">Update password</button>
                </div>

              </div><!-- change password area -->

              <!-- feedback messages -->


            </div><!-- form-edit-user -->
          </div><!-- alert -->
        </div><!-- col -->
      </div><!-- row -->

    </div><!-- container -->
  </div><!-- template -->

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";

import {AlertDialog,} from "../../assets/libs/DialogBox";

export default {
  name: "EditUser",
  components: {TopNavigationBar},

  data() {
    return {

      userToEdit: {
        id: undefined,
        username: "",
        full_name: "",
        email: "",
        role: ""
      },

      passwordToChange: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },

      isChangingPassword: false,

    };

  },


  computed: {

    roles: function () { return this.$store.getters.getUserRoles; },
    loggedInUser: function () { return this.$store.getters.getLoggedInUser; },
    isSameAsLoggedInUser: function () { return this.userToEdit.username === this.loggedInUser.username; },

    isNewPasswordValid: function () {
      if (this.passwordToChange.newPassword === "") return false;
      return this.passwordToChange.newPassword === this.passwordToChange.confirmNewPassword;
    },

  },

  async mounted() {

    try {

      const id = this.$route.params.id
      await this.$store.dispatch("users_fetch", id);

      this.userToEdit = this.$store.getters.getUser;


    } catch (error) {
      console.log(error.response.data.payload.error);
      // await this.$router.push("/users");
    }

  },

  methods: {


    async onUpdate() {

      try {

        await this.$store.dispatch("users_updateUser", this.userToEdit);

        new AlertDialog({message: "User details updated", title: "Updated"});

      } catch (error) {
        new AlertDialog({message: error.response.data.payload.error, title: "Error"});
      }

    },
    /* on update */


    async onUpdatePassword() {

      const params = {
        id: this.userToEdit.id,
        current_password: this.passwordToChange.currentPassword,
        new_password: this.passwordToChange.newPassword
      }

      try {

        await this.$store.dispatch("users_updatePassword", params);

        new AlertDialog({message: "Password updated", title: "updated"});

      } catch (error) {
        new AlertDialog({message: error.response.data.payload.error, title: "Error"});
      }

    },
    /* on update password */


  },


}
</script>

<style scoped>

</style>
