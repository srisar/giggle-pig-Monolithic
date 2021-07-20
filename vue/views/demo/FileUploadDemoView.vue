<template>

  <div class="">

    <TopNavigationBar/>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-6">

          <div class="mb-3">
            <label class="form-label">Choose a file to upload</label>
            <input class="form-control" type="file" ref="fileUploadField" @change="chooseFile">
          </div>

          <div class="text-center">
            <button class="btn btn-primary" @click="onUploadFile">Upload</button>
          </div>

        </div>
      </div><!-- row -->

      <div class="row justify-content-center mt-3">
        <div class="col-4">
          <div class="" v-if="uploadedImage">
            <img class="img-fluid" :src="uploadedImage" alt="">
          </div>
        </div>
      </div>

    </div>


    <div class="container">
      <div class="row">
        <div class="col">

          <p class="lead">Here is how to process the upload file on the PHP side.</p>
          <EmbedGist gist-id="b1b9c955f451bacb80d03a98ec5e1026"/>

          <p class="lead">How to process image uploads</p>
          <EmbedGist gist-id="7c4eecab98d5513fe6e15c941777ea56"/>

        </div>
      </div>
    </div>


  </div><!-- template -->

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import {errorDialog, successDialog} from "../../assets/libs/bootloks";
import axios from "axios";
import EmbedGist from "../../components/gist/EmbedGist";

export default {
  name: "FileUploadDemoView",
  components: { EmbedGist, TopNavigationBar },

  data() {
    return {
      file: null,
      uploadedImage: "/uploads/images/img_90e40fe9540a460a24b9770bd22d5755.jpg",
    }
  },

  computed: {
    //
  },

  methods: {
    chooseFile() {
      this.file = this.$refs.fileUploadField.files[ 0 ];
      console.log( this.file ); /* debug output the file chosen */
    },

    async onUploadFile() {

      try {

        let formData = new FormData();
        formData.append( "file", this.file );

        const response = await axios.post( "/uploads/single.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        } );

        this.uploadedImage = `/uploads/${ response.data.payload.data }`;

        successDialog( { message: "Uploaded" } );

      } catch ( e ) {
        errorDialog( { message: e.response.data.payload.error } );
        console.log( e );
      }

    },

  },

}
</script>

<style scoped>

</style>
