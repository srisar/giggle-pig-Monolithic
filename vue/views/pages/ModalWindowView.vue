<template>

  <div>
    <TopNavigationBar/>

    <div class="container">

      <div class="row">
        <div class="col">

          <h1 class="text-center">Modal Window Vue Component</h1>
          <hr>


          <div class="text-center">
            <p>Modal window Vue component wraps Bootstrap 5 modals and provide configurable attributes to change its look and feel.</p>
            <p>Each modal window in the page requires <code>id</code> which is used by the invoking element to invoke the modal.</p>
            <p>
              Modal size can be passed as <code>size</code> attribute with the following values: <br>
              <code>xl</code>, <code>lg</code>, <code>sm</code> and when nothing is passed default size will be rendered.
            </p>
          </div>

        </div>
      </div><!-- row -->

      <div class="row my-2">
        <div class="col text-center">

          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDefault">Open default size modal</button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalXl">Open xl size modal</button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalMd">Open md size modal</button>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSm">Open sm size modal</button>

        </div>
      </div><!-- row -->


      <div class="row">
        <div class="col text-center">
          <p>
            Modal content is rendered inside <code>vue-slot</code>. There is also footer area that can be accessed by
            <code>template v-slot:footer</code>
          </p>

          <p>
            Modal invoking element, such as button or a link tag needs to have <code>data-bs-toggle="modal"</code> and
            <code>data-bs-target="#modalName"</code>. Where <code>#modalName</code> is the id of the modal being invoked.
          </p>

          <p>
            <code>
              < button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalDefault" > Open default size modal < /button >
            </code>
          </p>

        </div>
      </div>

    </div>


    <!-- modal window: basic, default -->
    <ModalWindow id="modalDefault">
      <div class="">
        <h1>some heading</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum harum, impedit maxime necessitatibus nostrum velit voluptatibus! Animi ducimus
          expedita fugit illo nostrum quibusdam tempora temporibus voluptatem! Autem consequatur labore odit?</p>
      </div>

      <template v-slot:footer>
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </template>
    </ModalWindow>


    <!-- modal window: basic, small -->
    <ModalWindow id="modalSm" size="sm" title="Small modal">
      <div class="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum harum, impedit maxime necessitatibus nostrum velit voluptatibus! Animi ducimus
          expedita fugit illo nostrum quibusdam tempora temporibus voluptatem! Autem consequatur labore odit?</p>
      </div>

      <template v-slot:footer>
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </template>
    </ModalWindow>

    <!-- modal window: basic, xl -->
    <ModalWindow id="modalXl" size="xl" title="Extra large modal">
      <div class="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum harum, impedit maxime necessitatibus nostrum velit voluptatibus! Animi ducimus
          expedita fugit illo nostrum quibusdam tempora temporibus voluptatem! Autem consequatur labore odit?</p>
      </div>

      <template v-slot:footer>
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </template>
    </ModalWindow>

    <!-- modal window: basic, medium -->
    <ModalWindow id="modalMd" size="md" title="Medium sized modal">
      <div class="">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum harum, impedit maxime necessitatibus nostrum velit voluptatibus! Animi ducimus
          expedita fugit illo nostrum quibusdam tempora temporibus voluptatem! Autem consequatur labore odit?</p>
      </div>

      <template v-slot:footer>
        <button class="btn btn-primary">Confirm</button>
        <button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
      </template>
    </ModalWindow>


  </div><!-- template -->

</template>

<script>
import TopNavigationBar from "../../components/TopNavigationBar";
import ModalWindow from "../../components/ModalWindow";

import VueEmbedGist from "vue-embed-gist";

export default {
  name: "ModalWindowView",
  components: { ModalWindow, TopNavigationBar, VueEmbedGist },

  data() {
    return {
      modalVisible: false,

      simpleModalCode: '<ModalWindow id="myModal">\n' +
          '\n' +
          '\t<div class="text-center">\n' +
          '\t<h1>Bootstrap Modal</h1>\n' +
          '\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum harum, uatur labore odit?</p>\n' +
          '\t</div>\n' +
          '\n' +
          '\t<template v-slot:footer>\n' +
          '\t\t<button class="btn btn-primary">Confirm</button>\n' +
          '\t\t<button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>\n' +
          '\t</template>\n' +
          '</ModalWindow>',

    }
  },

  methods: {},
}
</script>

<style scoped>

</style>
