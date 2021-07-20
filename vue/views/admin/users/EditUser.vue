<template>

  <div id="view:edit_user">

    <div class="container my-3" v-if="userToEdit">

      <div class="row justify-content-center">

        <div class="col-12 col-md-8 col-lg-6">


          <div class="card shadow">
            <div class="card-header">Edit {{ userToEdit.full_name }} Details</div>
            <div class="card-body">

              <div class="text-center profile__pic position-relative">
                <img :src="profilePicUrl" alt="Profile picture" class="img-fluid">
                <button class="btn btn-sm btn-danger position-absolute bottom-0 start-50 translate-middle" @click="onRemoveProfilePic()">
                  remove
                </button>
              </div>

              <div id="form-edit-user">

                <div class="row g-3">
                  <div class="col-12 col-md-6">

                    <div class="mb-3">
                      <label for="text-fullname" class="form-label">Full name</label>
                      <input type="text" id="text-fullname" class="form-control" v-model="userToEdit.full_name">
                    </div>

                  </div>
                  <div class="col-12 col-md-6">

                    <div class="mb-3">
                      <label for="text-username" class="form-label">Username</label>
                      <input type="text" id="text-username" class="form-control" v-model="userToEdit.username">
                    </div>

                  </div>
                </div>


                <div class="row g-3">
                  <div class="col-12 col-md-6">

                    <div class="mb-3">
                      <label for="text-email" class="form-label">Email</label>
                      <input type="text" id="text-email" class="form-control" v-model="userToEdit.email">
                    </div>

                  </div>
                  <div class="col-12 col-md-6">


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
                  <router-link :to="{name: 'manageUsers'}" class="btn btn-secondary">Cancel</router-link>
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

                  <div class="row g-3 mb-3">
                    <div class="col-12 col-md-6">

                      <div class="">
                        <label for="new-password">New password</label>
                        <input id="new-password" type="password" class="form-control" v-model="passwordToChange.newPassword"
                               :class="{'is-invalid': !isNewPasswordValid, 'is-valid': isNewPasswordValid}">
                        <div class="invalid-feedback">New password is empty or not valid</div>
                        <div class="valid-feedback">All looks good!</div>
                      </div>

                    </div>

                    <div class="col-12 col-md-6">

                      <div class="">
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

            </div><!-- card-body -->
          </div><!-- card -->

          <div class="mt-3 alert alert-secondary">
            <p class="lead">Advanced Options</p>
            <div class="" v-if="canDelete">
              Delete this user. This action cannot be undone.
              <button class="btn btn-sm btn-danger" @click="onDelete()">Delete user</button>
            </div>
            <div class="" v-else>
              Super admin user cannot be deleted.
            </div>
          </div>

        </div><!-- col -->

        <div class="col-12 col-md-4 col-lg-4">

          <div class="card shadow">
            <div class="card-header">Profile Picture</div>
            <div class="card-body">

              <div class="mb-3 text-center">
                <label class="form-label">Upload profile picture</label>
                <input type="file" class="form-control form-control-sm" ref="profilePicField" @change="onChooseFile()">
              </div>

              <div class="text-center">
                <button class="btn btn-sm btn-primary" :disabled="!profilePicFile" @click="onUploadProfilePic()">Upload Image</button>
              </div>

            </div>
          </div>

        </div><!-- col -->

      </div><!-- row -->

    </div><!-- container -->
  </div><!-- template -->

</template>

<script>
import {errorDialog, infoDialog, successDialog, textPrompt} from "../../../assets/libs/bootloks";

let _ = require( "lodash" );

export default {
  name: "EditUser",
  components: {},

  data() {
    return {

      userToEdit: {
        id: undefined,
        username: "",
        full_name: "",
        email: "",
        role: "",
        profile_pic: ""
      },

      passwordToChange: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },

      isChangingPassword: false,

      profilePicFile: null,

    };
  },


  computed: {

    roles() {
      return this.$store.getters.getUserRoles;
    },

    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },

    isSameAsLoggedInUser() {
      return this.userToEdit.username === this.loggedInUser.username;
    },

    isNewPasswordValid() {
      if ( this.passwordToChange.newPassword === "" ) return false;
      return this.passwordToChange.newPassword === this.passwordToChange.confirmNewPassword;
    },

    profilePicUrl() {
      if ( _.isEmpty( this.userToEdit.profile_pic ) ) {
        return "images/user.svg";
      }
      return `uploads/${ this.userToEdit.profile_pic }`;
    },

    canDelete() {
      return this.userToEdit.id !== 1;

    }

  },


  async mounted() {

    try {

      const id = this.$route.params.id;
      await this.$store.dispatch( "users_fetch", id );

      this.userToEdit = this.$store.getters.getUser;

    } catch ( error ) {
      errorDialog( { message: error.response.data.payload.error } );
    }

  },
  /* -- mounted -- */


  methods: {

    onChooseFile() {
      this.profilePicFile = this.$refs.profilePicField.files[ 0 ];
    },

    async onUploadProfilePic() {
      try {

        const params = {
          profilePicFile: this.profilePicFile,
          id: this.userToEdit.id,
        }

        await this.$store.dispatch( "users_uploadProfilePic", params );

        const id = this.$route.params.id;
        await this.$store.dispatch( "users_fetch", id );

        this.userToEdit = this.$store.getters.getUser;

      } catch ( e ) {
        console.log( e.response.data );
        errorDialog( { message: "Failed to upload image" } );
      }

    }, /* on upload profile picture */

    async onUpdate() {

      try {

        await this.$store.dispatch( "users_updateUser", this.userToEdit );

        successDialog( {
          message: "User details updated"
        } );

      } catch ( error ) {
        errorDialog( {
          message: error.response.data.payload.error
        } )
      }

    }, /* on update */


    async onUpdatePassword() {
      try {

        const params = {
          id: this.userToEdit.id,
          new_password: this.passwordToChange.newPassword
        };

        await this.$store.dispatch( "users_updatePassword", params );

        successDialog( { message: "Password updated" } );

      } catch ( error ) {
        errorDialog( { message: "Failed to update password" } );
      }

    }, /* on update password */


    async onDelete() {

      textPrompt(
          {
            message: "Do you want to delete the user? Type \"DELETE\" to confirm",
            title: "Delete user"
          },
          async ( value ) => {

            if ( value === "DELETE" ) {

              try {
                await this.$store.dispatch( "users_delete", this.userToEdit.id );

                await this.$router.push( { name: "manageUsers" } );

              } catch ( e ) {
                errorDialog( { message: "Failed to delete the user" } );
              }

            } else {
              infoDialog( { message: "Please type the word DELETE to delete the user" } );
            }

          } );

    }, /* on delete user */

    async onRemoveProfilePic() {
      try {

        const params = {
          id: this.userToEdit.id
        };

        await this.$store.dispatch( "users_removeProfilePicture", params );

        const id = this.$route.params.id;
        await this.$store.dispatch( "users_fetch", id );

        this.userToEdit = this.$store.getters.getUser;

      } catch ( e ) {
        errorDialog( { message: "Failed to remove profile picture" } );
      }
    },


  },
  /* -- methods -- */


}
</script>

<style scoped lang="scss">

.profile__pic {
  display         : flex;
  justify-content : center;
  align-items     : center;
  margin-bottom   : 20px;

  img {
    width         : 150px;
    height        : 150px;
    object-fit    : cover;
    border-radius : 50%;
  }
}

</style>
