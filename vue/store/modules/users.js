import axios from "axios";


export const usersStore = {

    state: {

        user: {},
        users: {},
        roles: {
            "ADMIN": "Administrator",
            "MANAGER": "Manager",
            "USER": "User"
        },

    },

    getters: {

        getUser( state ) {
            return state.user;
        },
        getUsers( state ) {
            return state.users;
        },
        getUserRoles( state ) {
            return state.roles;
        },

    },

    actions: {

        async users_fetchAll( context ) {
            try {
                const response = await axios.get( "users/all.php" );
                context.state.users = response.data.payload;
            } catch ( e ) {
                throw e;
            }
        },

        async users_fetch( context, id ) {

            try {
                const response = await axios.get( `users/get.php?id=${ id }` );
                context.state.user = response.data.payload.user;
                return true;
            } catch ( e ) {
                throw e;
            }

        },
        /* fetch user */

        async users_updateUser( context, user ) {

            try {
                await axios.post( "users/update.php", user );
                return true;
            } catch ( e ) {
                throw e;
            }
        },
        /* update user details */

        async users_updatePassword( context, params ) {

            /* params: {id, current_password, new_password} */

            try {
                await axios.post( "users/update-password.php", params );
                return true;
            } catch ( e ) {
                throw e;
            }
        },
        /* update user password */


        async users_createUser( context, user ) {

            try {
                await axios.post( "users/create.php", user );
                return true;
            } catch ( e ) {
                throw e;
            }
        },

        async users_uploadProfilePic( context, params = { profilePicFile: null, id: null } ) {
            try {

                let formData = new FormData();
                formData.append( "profile_pic", params.profilePicFile );
                formData.append( "id", params.id );

                const response = await axios.post( "users/upload-profile-pic.php", formData, {
                    "Content-Type": "multipart/form-data"
                } );

                return response.data.payload.data;

            } catch ( e ) {
                throw e;
            }
        }

    },
    /* *** ACTIONS *** */

}
