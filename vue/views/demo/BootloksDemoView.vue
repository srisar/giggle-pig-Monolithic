<template>

  <div class="page-container">

    <main id="main">
      <TopNavigationBar/>

      <div class="container">
        <div class="row justify-content-center">
          <div class="col text-center">

            <div class="">
              <img src="https://srisar.github.io/bootloks/bootloks-icon.18d5a4b8.svg" style="width: 250px" alt="Bootloks Logo">
            </div>

            <h4>Bootstrap based modal windows</h4>

            <p>Bootloks is a Bootstrap 5 modal based programmatically invokable dialog boxes for various needs.</p>
            <p>Its only dependency is Bootstrap 5. Please <a href="https://srisar.github.io/bootloks/">read full documentation</a> for how-to and examples.</p>
            <hr>

            <div>
              <h3 class="text-center">Testing messagebox fly outs</h3>

              <div class="my-2 text-center">
                <button class="btn btn-primary mx-1" @click="onSuccessMessage()">Open Success Message</button>
                <button class="btn btn-primary mx-1" @click="onErrorMessage()">Open Error Message</button>
              </div>

              <div class="my-2 text-center">
                <button class="btn btn-secondary mx-1" @click="onTextPrompt()">Open text input</button>
                <button class="btn btn-secondary mx-1" @click="onTextAreaPrompt()">Open multiline input</button>
                <button class="btn btn-secondary mx-1" @click="onDatePrompt()">Open date input</button>
                <button class="btn btn-secondary mx-1" @click="onNumberPrompt()">Open number input</button>
              </div>

              <div class="my-2 text-center">
                <button class="btn btn-warning" @click="onDrpDatePrompt()">Open daterangepicker based input</button>
              </div>

              <div class="my-3 text-center fw-bold" style="white-space: pre-line" v-if="callBackOutput">
                {{ callBackOutput }}
              </div>

            </div>

          </div>
        </div>

      </div>


    </main>

  </div>


</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import {datePrompt, drpDatePrompt, errorDialog, numberPrompt, successDialog, textAreaPrompt, textPrompt} from "../../assets/libs/bootloks";
import AdminSidebar from "../admin/components/AdminSidebar";


export default {
  name: "BootloksDemoView",
  components: { AdminSidebar, TopNavigationBar },

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

    onDrpDatePrompt() {

      this.callBackOutput = "";

      drpDatePrompt( {
        message: "What is the day of the champions?"
      }, ( data ) => {
        this.callBackOutput = data;
      } );

    }


  }

}
</script>

<style scoped>

</style>
