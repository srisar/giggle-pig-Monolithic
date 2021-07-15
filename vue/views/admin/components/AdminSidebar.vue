<template>

  <nav id="sidebar" :class="sidebarStateClass">
    <div class="sidebar-toggle-button" @click="sidebarExpanded = !sidebarExpanded">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
        <path
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
      </svg>
    </div>

    <div class="sidebar__contents">

      <div class="sidebar__contents__top">

        <div class="app-icon mb-3">
          <router-link to="/admin">
            <img src="../../../assets/images/app-icon.svg" alt="Plum Pig">
          </router-link>
          <hr>
        </div><!-- app-icon -->

        <div class="sidebar-nav">

          <ul class="list-unstyled menu__ul">

            <li class="menu__li">
              <a class="menu__item" @click="toggleSubmenu('#users_menu')">
                <div class="btn__icon"><i class="bi bi-people-fill"></i></div>
                <div class="btn__text">Users</div>
              </a>

              <div class="menu__submenu collapse" id="users_menu">
                <ul>
                  <li>
                    <router-link to="/admin/users" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-people-fill"></i></div>
                      <div class="btn__text">Manage users</div>
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/admin/users/create" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-person-lines-fill"></i></div>
                      <div class="btn__text">Create user</div>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>

            <li class="menu__li">
              <a class="menu__item" @click="toggleSubmenu('#submenu_1')">
                <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                <div class="btn__text">Menu Item 1</div>
              </a>

              <div class="menu__submenu collapse" id="submenu_1">
                <ul>
                  <li>
                    <a href="#" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                      <div class="btn__text">Sub Menu 1.1</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                      <div class="btn__text">Sub Menu 1.2</div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>


            <li class="menu__li">
              <a class="menu__item" @click="toggleSubmenu('#submenu_2')">
                <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                <div class="btn__text">Menu Item 2</div>
              </a>

              <div class="menu__submenu collapse" id="submenu_2">
                <ul>
                  <li>
                    <a href="#" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                      <div class="btn__text">Sub Menu 2.1</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                      <div class="btn__text">Sub Menu 2.2</div>
                    </a>
                  </li>
                  <li>
                    <a href="#" class="menu__item">
                      <div class="btn__icon"><i class="bi bi-arrow-right-short"></i></div>
                      <div class="btn__text">Sub Menu 2.3</div>
                    </a>
                  </li>
                </ul>
              </div>
            </li>


          </ul>

        </div><!--  -->

      </div><!-- sidebar-top -->

      <div class="sidebar__contents__bottom d-grid gap-2">

        <div class="d-flex gap-1 align-items-center justify-content-between" v-if="isLoggedIn">
          <div class="footer__username">{{ loggedInUser.full_name }}</div>

          <div class="dropdown">
            <a class="footer__btn" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="bi bi-gear"></i>
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <button class="dropdown-item" @click="logout()">Logout</button>
              </li>
              <li>
                <router-link to="/admin/users" class="dropdown-item">Manage Users</router-link>
              </li>
            </ul>
          </div>
        </div>

        <div class="d-flex gap-1 align-items-center justify-content-center" v-else>
          <router-link to="/login" class="footer__btn">
            <div class="btn__icon"><i class="bi bi-box-arrow-in-right"></i></div>
            <div class="btn__text">Login</div>
          </router-link>
        </div>

      </div><!-- sidebar-bottom -->


    </div>


  </nav>

</template>

<script>

import {errorDialog} from "../../../assets/libs/bootloks";

export default {
  name: "AdminSidebar",

  data() {
    return {
      screenSize: screen.width,
      sidebarExpanded: screen.width > 576,
    }
  },

  computed: {

    sidebarStateClass() {
      if ( this.sidebarExpanded ) return "sidebar__expanded";
      return "sidebar__collapsed";
    },

    isLoggedIn() {
      return this.$store.getters.getLoginStatus;
    },

    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    },

    userType() {
      return this.$store.getters.getUserType;
    },
  },

  mounted() {
    window.addEventListener( "resize", () => {
      this.screenSize = screen.width;
      this.sidebarExpanded = this.screenSize > 576;
    } );

  },

  methods: {

    toggleSubmenu( id ) {
      let element = document.querySelector( id );
      let allSubmenus = document.querySelectorAll( ".menu__submenu" );
      let closest = element.closest( ".menu__submenu" );

      if ( closest.classList.contains( "show" ) ) {
        closest.classList.remove( "show" );
        return;
      }

      allSubmenus.forEach( ( item ) => {
        item.classList.remove( "show" );
      } );


      closest.classList.add( "show" );

    },

    async logout() {

      try {
        await this.$store.dispatch( "auth_logout" );
        await this.$router.push( "/login" );

      } catch ( e ) {
        errorDialog( { message: "Login attempt failed." } );
      }

    },
  },

}
</script>

<style scoped lang="scss">


$color-sidebar-bg: #161C2E;
$color-hover: #394151;
$color-active: #394151;
$color-text: #FBFAFF;
$color-footer-bg: #0A0F17;

$margin: 5px;
$padding: 5px;


#sidebar {

  z-index: 999;

  height: inherit;
  position: relative;
  background-color: $color-sidebar-bg;
  flex-shrink: 0;
  box-shadow: 0 0 10px #cccccc;
  transition: width 50ms ease-in;

  .sidebar-toggle-button {
    position: absolute;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0.2rem;
    right: 0.2rem;
    width: 24px;
    height: 24px;
    background-color: $color-active;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 200ms ease-in-out;

    svg {
      width: 16px;
      height: 16px;
      color: $color-text;
    }
  }

  a {
    text-decoration: none;
  }

  /* sidebar-toggle-button */

  .sidebar__contents {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: all 300ms ease-in-out;
  }

  .sidebar__contents__top {
    padding: 50px $margin $margin $margin;
  }

  .sidebar__contents__bottom {
    background-color: $color-footer-bg;
    color: $color-text;
    padding: $margin;
  }


  .menu__li {
    margin-bottom: 20px;
  }

  .menu__submenu > ul {
    list-style: none;
    padding: 0 0 0 5px;
  }

  .menu__submenu {
    border-left: solid 2px $color-text;
    margin: 0 0 0 10px;
  }


  .menu__item {
    display: flex;
    gap: 10px;
    //background-color: $color-active;
    margin: 5px 0;
    padding: 5px;
    border-radius: 5px;
    text-decoration: none;
    color: $color-text;
    cursor: pointer;
    transition: inherit;

    &:hover {
      background-color: $color-hover;
    }

    &.router-link-exact-active {
      background-color: $color-active;
    }
  }


  .footer__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 5px;
    padding: 5px;
    color: $color-text;
    background-color: $color-active;
  }


}


/* ---- sidebar expanded state ----- */
.sidebar__expanded {
  width: 200px;

  .sidebar-toggle-button {
    transform: rotatez(-180deg);
  }

  .app-icon {
    justify-content: center;
    text-align: center;

    img {
      width: 60px;
    }
  }

}

/* ----- sidebar collapsed state ----- */
.sidebar__collapsed {
  width: 60px;

  .sidebar-toggle-button {
    transform: rotatez(0deg);
  }

  .menu__item {
    gap: 0;
    justify-content: center;
    align-items: center;
    padding: 2px !important;
    width: 100%;
  }

  .menu__submenu > ul {
    list-style: none;
    margin: 0;
    padding-left: 0 !important;
  }

  .menu__submenu {
    margin: 0 !important;
    padding-left: 5px;
  }

  .btn__text {
    display: none;
  }

  .btn__icon {
    font-size: 1.2rem;
  }

  /* sidebar_li__link */

  .app-icon {
    display: flex;
    justify-content: center;

    img {
      width: 36px;
    }
  }

  /* app-icon */

  .footer__username {
    display: none;
  }

  .sidebar__contents__bottom .dropdown {
    width: 100%;
  }

  .footer__btn {
    width: 100%;
    gap: 0 !important;
    border-radius: 5px;
    font-size: 1rem;
    padding: 2px !important;
    color: $color-text;
    background-color: #999999;
  }
}

@media (max-width: 576px) {
  #sidebar {
    position: absolute;

  }

  #main {
    margin-left: 100px;
  }
}


</style>
