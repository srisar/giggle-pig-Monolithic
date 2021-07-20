<template>

  <div v-html="gistDiv"></div>

</template>

<script>

export default {
  name: "EmbedGist",
  props: ["gistId"],

  data() {
    return {
      gistDiv: "Loading...",
    }
  },


  async mounted() {

    const baseURL = "https://gist.github.com/" + this.gistId + ".json";

    $.ajax( {
      url: baseURL,
      dataType: 'jsonp',
      success: ( response ) => {
        this.gistDiv = response.div;
      },
      error: function ( response ) {
        console.log( "error" );
      }
    } );

  },

}
</script>

<style>
@import url("https://github.githubassets.com/assets/gist-embed-fec3781cf7686b910dd55b110aa63edf.css");
@import url("https://cdn.rawgit.com/lonekorean/gist-syntax-themes/d49b91b3/stylesheets/one-dark.css");

.gist .gist-data {
  background-color: #141414 !important;
}
</style>
