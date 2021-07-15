<template>

  <div class="page-container">

    <AdminSidebar/>

    <main id="main">
      <router-view/>
    </main>

  </div>

</template>

<script>
import AdminSidebar from "./components/AdminSidebar";

export default {
  name: "AdminApp",
  components: { AdminSidebar },
}
</script>

<style scoped lang="scss">

</style>
