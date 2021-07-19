import {errorDialog} from "../assets/libs/bootloks";

export let usersMixins = {

    computed: {

        isLoggedIn() {
            return this.$store.getters.getLoginStatus;
        },

        loggedInUser() {
            return this.$store.getters.getLoggedInUser;
        },

        userType() {
            return this.$store.getters.getUserType;
        },

        isAdmin() {
            return this.userType === "ADMIN";
        },

        profilePicUrl() {

            if ( _.isEmpty( this.loggedInUser.profile_pic ) ) {
                return "images/user.svg";
            }
            return `uploads/${ this.loggedInUser.profile_pic }`;
        },

    },
    /* -- computed -- */

    methods: {

        /* logout current user */
        async logout() {

            try {
                await this.$store.dispatch( "auth_logout" );
                await this.$router.push( "/login" );
            } catch ( e ) {
                errorDialog( { message: "Login attempt failed." } );
            }
        },

    }
    /* -- methods -- */

};
