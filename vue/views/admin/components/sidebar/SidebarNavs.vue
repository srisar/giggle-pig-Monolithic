<template>

  <ul class="nav__ul">

    <li class="">
      <div class="nav__root-button">
        <div><i class="bi bi-people"></i> Manage Users</div>
        <i class="bi bi-arrow-down-short"></i>
      </div>
      <div class="submenu">
        <ul>
          <li>
            <router-link :to="{name: 'manageUsers'}">View all</router-link>
          </li>
          <li>
            <router-link :to="{name: 'createUser'}">Create new</router-link>
          </li>
        </ul>
      </div>
    </li>

    <li>
      <div class="nav__root-button">
        <div><i class="bi bi-cpu"></i> Components</div>
        <i class="bi bi-arrow-down-short"></i></div>
      <div class="submenu">
        <ul>
          <li>
            <router-link :to="{name: 'demoBootloks'}">Bootloks</router-link>
          </li>
          <li>
            <router-link :to="{name: 'demoModals'}">Modals</router-link>
          </li>
          <li>
            <router-link :to="{name: 'demoFileUploads'}">File upload</router-link>
          </li>
        </ul>
      </div>
    </li>

  </ul>

</template>

<script>
export default {
  name: "SidebarNavs"
}
</script>

<style scoped lang="scss">
</style>
