<template>

  <div id="sidebar__container" class="shadow">


    <div class="sidebar__toggle">
      <button class="sidebar__toggle__button">
        <i class="bi bi-arrow-right"></i>
      </button>
    </div>

    <div id="sidebar" class="shadow">


      <div class="sidebar__contents">

        <div class="sidebar__contents__top">

          <div class="sidebar__top__logo">
            <div class="logo__container">
              <router-link :to="{name: 'home'}"><img src="../../../assets/images/app-icon.svg" alt="" class="img-fluid"></router-link>
            </div>
          </div>

          <nav class="sidebar__nav">
            <SidebarNavs/>
          </nav>

        </div>
        <div class="sidebar__contents__bottom">

          <div class="sidebar__user">
            <div class="sidebar__user__left">
              <img :src="profilePicUrl" style="width: 24px" class="img-fluid rounded-circle" alt="">
              <div class="">{{ loggedInUser.full_name }}</div>
            </div>
            <div class="sidebar__user__right">
              <div class="dropdown">
                <button class="dropdown-toggle" data-bs-toggle="dropdown"><i class="bi bi-gear"></i></button>
                <ul class="dropdown-menu" id="sidebarUserMenu">
                  <li>
                    <div @click="logout()" class="dropdown-item">Logout</div>
                  </li>
                  <li v-if="isAdmin">
                    <hr class="dropdown-divider">
                  </li>
                  <li v-if="isAdmin">
                    <router-link class="dropdown-item" :to="{name: 'manageUsers'}">Manage users</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="sidebar__backdrop">

    </div>

  </div>


</template>

<script>
import {usersMixins} from "../../../mixins/users_mixins";
import SidebarNavs from "./sidebar/SidebarNavs";

export default {
  name: "AdminSidebar",
  components: { SidebarNavs },
  mixins: [usersMixins],

  mounted() {

    document.querySelectorAll( ".nav__root-button" ).forEach( button => {

      button.addEventListener( "click", () => {
        const closestMenu = button.nextElementSibling;
        button.classList.toggle( "nav__root-button-active" );

        if ( button.classList.contains( "nav__root-button-active" ) ) {
          closestMenu.style.maxHeight = closestMenu.scrollHeight + "px";
        } else {
          closestMenu.style.maxHeight = 0;
        }

      } );
    } );

    document.querySelector( ".sidebar__toggle" ).addEventListener( "click", () => {
      this.toggleSidebar();
    } );

    document.querySelector( ".sidebar__backdrop" ).addEventListener( "click", () => {
      this.toggleSidebar();
    } );

  },

  methods: {

    toggleSidebar() {
      document.querySelector( "#sidebar__container" ).classList.toggle( "sidebar__container-show" );
      document.querySelector( "#sidebar" ).classList.toggle( "sidebar-show" );
      document.querySelector( ".sidebar__toggle__button" ).classList.toggle( "opened" );
      document.querySelector( ".sidebar__backdrop" ).classList.toggle( "sidebar__backdrop-show" );
    }

  },

}
</script>

<style lang="scss">

$color_backdrop_bg   : rgba(0, 0, 0, 0.5);
$color_sidebar_bg    : #161C2E;
$color_footer_bg     : #0A0F17;
$color_top_logo_bg   : $color-footer-bg;

$color_button        : $color_sidebar_bg;
$color_button_active : #394151;
$color_button_hover  : #394151;
$color_text          : #FBFAFF;
$color_button_text   : #FBFAFF;

$color-submenu       : #ffffff;

$color_scrollbar_bg  : $color_sidebar_bg;
$color_scrollbar_bar : $color_text;
$margin              : 5px;
$padding             : 5px;


@mixin scrollbars($size, $foreground-color, $background-color: mix($foreground-color, white,  50%)) {
  // For Google Chrome
  &::-webkit-scrollbar {
    width  : $size;
    height : $size;
  }

  &::-webkit-scrollbar-thumb {
    background    : $foreground-color;
    border-radius : 6px;
  }

  &::-webkit-scrollbar-track {
    background : $background-color;
  }

  // For Internet Explorer
  & {
    scrollbar-face-color  : $foreground-color;
    scrollbar-track-color : $background-color;
  }
}


/* collapsed sidebar in mobile screen */
@media (max-width : 576px) {

  #sidebar_container {
    position : absolute;
    z-index  : 99;
    width    : 0;
  }
  /* sidebar container */

  .sidebar__container-show {
    position : absolute;
    width    : 100%;
    height   : 100vh !important;
  }

  .sidebar__backdrop-show {
    position         : absolute;
    z-index          : 89;
    width            : 100%;
    height           : 100%;
    background-color : $color_backdrop_bg;
    transition       : background-color 200ms ease-in;
  }

  #sidebar {
    max-width   : 0;
    position    : absolute;
    z-index     : 98;
    //padding-top : 40px;
    overflow-y  : hidden;
    transition  : max-width 100ms ease-in-out;
    height      : inherit;
  }


  #main {
    padding-top : 40px;
  }

  .sidebar-show {
    max-width : 100% !important;
  }

  .sidebar__toggle {
    display  : block !important;
    z-index  : 9999;
    position : absolute;
    top      : 5px;
    left     : 5px;

    .sidebar__toggle__button {
      display          : flex;
      justify-content  : center;
      align-items      : center;
      border-radius    : 50%;
      font-size        : 1.5em;
      border           : none;
      background-color : $color_sidebar_bg;
      color            : $color_text;

      i:before {
        transition : transform 300ms ease-in-out;
      }
    }
    /* sidebar__toggle__button */

    .sidebar__toggle__button.opened {
      background-color : $color_text;
      color            : $color_button_active;

      i:before {
        transform : rotate(-180deg);
      }
    }
  }
  /* sidebar__toggle */
}
/* @media */


#sidebar_container {
  height   : 100% !important;
  position : relative;
  display  : flex;
}
/* sidebar_container */

.sidebar__toggle {
  position : absolute;
  display  : none;
}

#sidebar {
  width            : 250px;
  background-color : $color_sidebar_bg;
  color            : $color-text;
  display          : flex;
  flex-direction   : column;
  height           : 100%;
  overflow-y       : scroll;

  @include scrollbars(3px, $color_scrollbar_bar, $color_scrollbar_bg);


  .sidebar__contents {
    height          : inherit;
    display         : flex;
    flex-direction  : column;
    justify-content : space-between;
  }

  .sidebar__top__logo {
    display          : flex;
    justify-content  : center;
    padding-top      : 10px;
    padding-bottom   : 20px;
    background-color : $color_top_logo_bg;

    .logo__container {
      img {
        width : 50px;
      }
    }
  }


  .sidebar__nav {

    padding : 10px;

    .nav__ul {
      padding    : 0;
      margin     : 0;
      list-style : none;

      > li {
        margin-bottom : 20px;
      }

    }


    .nav__root-button {
      display          : flex;
      justify-content  : space-between;
      width            : 100%;
      padding          : 5px;
      border           : none;
      border-radius    : 5px;
      color            : $color_button_text;
      background-color : $color_button;
      cursor           : pointer;

      i:before {
        transform  : rotate(0deg);
        transition : transform 500ms;
      }
    }

    .nav__root-button:hover {
      background-color : $color_button_hover;
    }

    .nav__root-button-active {
      background-color : $color_button_active;

      > i:before {
        transform  : rotate(180deg);
        transition : transform 500ms;
      }
    }
    /* nav__root-button */


    .submenu {
      overflow    : hidden;
      max-height  : 0;
      transition  : max-height 200ms ease-in-out;

      border-left : solid 1px white;
      margin-left : 10px;

      ul {
        list-style : none;
        padding    : 0;
        margin     : 0 0 0 10px;

        li {
          margin : 10px 0;
        }

        li:last-child {
          margin-bottom : 0 !important;
        }
      }

      a {
        border-radius   : 5px;
        display         : flex;
        width           : 100%;
        padding         : 5px;
        text-decoration : none;
        color           : $color_submenu;
      }

      a:hover {
        background-color : $color_button_hover;
      }

      .router-link-exact-active {
        background-color : $color_button_active;
      }
    }
    /* submenu */

  }
  /* sidebar__nav */


  .sidebar__contents__bottom {
    background-color : black;
  }

  .sidebar__user {
    display         : flex;
    gap             : 10px;
    justify-content : space-between;
    align-items     : center;
    padding         : 10px;

    .sidebar__user__left {
      display     : flex;
      gap         : 5px;
      align-items : center;

      img {
        object-fit : cover;
        width      : 24px;
        height     : 24px;
      }
    }

    .sidebar__user__right {
      button {
        display          : flex;
        justify-content  : center;
        align-items      : center;
        background-color : $color_button_active;
        border           : none;
        border-radius    : 5px;
        color            : $color_text;
        height           : 24px;
      }

      button:hover {
        background-color : #357ebd;
      }
    }
  }
  /* sidebar__user */

}
/* sidebar */

</style>
