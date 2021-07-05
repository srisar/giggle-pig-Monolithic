<template>

  <div>

    <TopNavigationBar/>

    <div class="container mt-2">
      <div class="row">
        <div class="col text-center">

          <h3 class="text-center">BS-Dialogs</h3>
          <p>BS-Dialog is a Bootstrap 5 modal based programmatically callable dialog boxes for various needs.</p>
          <p>Its only dependency is Bootstrap 5. Please <a href="https://srisar.github.io/bs-dialog/">read the documents</a> for how to and examples.</p>
          <hr>

          <div>
            <h3 class="text-center">Testing messagebox fly outs</h3>

            <div class="my-2 text-center">
              <button class="btn btn-primary" @click="onSuccessMessage()">Open Success Message</button>
              <button class="btn btn-primary" @click="onErrorMessage()">Open Error Message</button>
            </div>

            <div class="my-2 text-center">
              <button class="btn btn-secondary" @click="onTextPrompt()">Open text input</button>
              <button class="btn btn-secondary" @click="onTextAreaPrompt()">Open multiline input</button>
              <button class="btn btn-secondary" @click="onDatePrompt()">Open date input</button>
              <button class="btn btn-secondary" @click="onNumberPrompt()">Open number input</button>
            </div>

            <div class="my-3 text-center fw-bold" style="white-space: pre-line" v-if="callBackOutput">
              {{ callBackOutput }}
            </div>

          </div>


        </div>
      </div>
    </div>

  </div>

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import {datePrompt, errorDialog, numberPrompt, successDialog, textAreaPrompt, textPrompt} from "../../assets/libs/bs-dialogs";


export default {
  name: "BsDialogBoxes",
  components: { TopNavigationBar },

  data() {
    return {
      callBackOutput: ""
    }
  },

  mounted() {


  },

  methods: {

    onSuccessMessage() {

      this.callBackOutput = "";

      successDialog( {
        message: "This is a message - success!",
        title: "You've done it!",
      }, () => {
        this.callBackOutput = "Success message box close callback worked!";
      } );
    },

    onErrorMessage() {

      this.callBackOutput = "";

      const params = {
        message: "This is an error message <p class='text-success'>You can also add html content here!</p>",
        title: "Oops... Sorry",
      };

      errorDialog( params, () => {
        this.callBackOutput = "Error message box close callback worked!";
      } );
    },

    onTextPrompt() {
      this.callBackOutput = "";
      textPrompt( {
            message: "What is your name?"
          },
          ( data ) => {
            this.callBackOutput = data;
          },
          () => {
            this.callBackOutput = "cancelled...";
          }
      );

    },

    onTextAreaPrompt() {

      this.callBackOutput = "";
      textAreaPrompt( {
            message: "What is your address?"
          },
          ( data ) => {
            this.callBackOutput = data;
          },
          () => {
            this.callBackOutput = "cancelled...";
          }
      );
    },

    onDatePrompt() {

      this.callBackOutput = "";
      datePrompt( {
            message: "What is your date of birth?"
          },
          ( data ) => {
            this.callBackOutput = data;
          },
          () => {
            this.callBackOutput = "cancelled...";
          }
      );
    },

    onNumberPrompt() {

      this.callBackOutput = "";
      numberPrompt( {
            message: "What is the meaning of life? (a number)"
          }, ( data ) => {
            if ( data === "42" )
              this.callBackOutput = "42 is the correct answer";
            else
              this.callBackOutput = "I dont think you understood";
          }, () => {
            this.callBackOutput = "cancelled...";
          }
      );
    },


  }

}
</script>

<style scoped>

</style>
