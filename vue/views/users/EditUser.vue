<template>

  <div>

    <TopNavigationBar/>

    <div class="container" v-if="user">

      <div class="row justify-content-center">
        <div class="col-12 col-md-6">

          <h4 class="text-center">Edit {{ user.full_name }} details</h4>

          <div class="alert alert-secondary">

            <form @submit.prevent="onUpdate">

              <div class="mb-3">
                <label for="text-fullname" class="form-label">Full name</label>
                <input type="text" id="text-fullname" class="form-control" v-model="userToEdit.full_name">
              </div>

              <div class="mb-3">
                <label for="text-username" class="form-label">Username</label>
                <input type="text" id="text-username" class="form-control" v-model="userToEdit.username">
              </div>

              <div class="mb-3">
                <label for="text-email" class="form-label">Email</label>
                <input type="text" id="text-email" class="form-control" v-model="userToEdit.email">
              </div>

              <div class="text-center">
                <button type="submit" class="btn btn-primary">Update</button>
                <button class="btn btn-secondary" @click="onCancel">Cancel</button>
              </div>

            </form>

          </div>

          <div v-if="messages">
            <div class="alert alert-info text-center alert-dismissible fade show" role="alert">
              {{ messages }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>

          <div v-if="errors">
            <div class="alert alert-danger text-center alert-dismissible fade show" role="alert">
              {{ errors }}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </div>

        </div>
      </div>

    </div>


  </div>

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";

export default {
  name: "EditUser",
  components: {TopNavigationBar},

  data() {
    return {

      userToEdit: {
        id: undefined,
        username: "",
        full_name: "",
        email: ""
      },

      messages: "",
      errors: "",

    }
  },


  computed: {

    user: function () {
      let user = this.$store.getters.getUser
      this.userToEdit = user
      return user
    }
  },

  mounted() {

    const id = this.$route.params.id

    this.$store.dispatch('FETCH_USER', id)
        .then(response => {


        })
        .catch(error => {

          console.log('invalid user')
          this.$router.push('/users')

        })


  },

  methods: {

    onCancel: function () {
      this.$router.push('/users')
    },
    /* on cancelling */

    onUpdate: function () {

      this.$store.dispatch('UPDATE_USER', this.userToEdit)
          .then(response => {
            this.messages = 'Updated'
          })
          .catch(error => {
            this.errors = error.response.data.payload.error
          })

    },
    /* on update */

  },


}
</script>

<style scoped>

</style>
