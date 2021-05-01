import axios from "axios";


export default {

    state: {

        user: {},
        roles: {
            'ADMIN': 'Administrator',
            'MANAGER': 'Manager',
            'USER': 'User'
        },

    },
    /* *** STATE *** */

    getters: {

        getUser: function (state) {
            return state.user
        },

        getUserRoles: function (state) {
            return state.roles
        },

    },
    /* *** GETTERS *** */

    mutations: {

        setUser: function (state, user) {
            state.user = user
        }

    },
    /* *** MUTATIONS *** */

    actions: {


        async users_fetchUser(context, id) {

            try {
                const response = await axios.get(`users/get.php?id=${id}`);
                context.commit("setUser", response.data.payload.user);
                return true;
            } catch (e) {
                throw e;
            }

        },
        /* fetch user */

        async users_updateUser(context, user) {

            try {
                await axios.post("users/update.php", user);
                return true;
            } catch (e) {
                throw e;
            }
        },
        /* update user details */

        async users_updatePassword(context, params) {

            /* params: {id, current_password, new_password} */

            try {
                await axios.post('users/update-password.php', params);
                return true;
            } catch (e) {
                throw e;
            }
        },
        /* update user password */


        async users_createUser(context, user) {

            try {
                await axios.post("users/create.php", user);
                return true;
            } catch (e) {
                throw e;
            }

        }

    },
    /* *** ACTIONS *** */

}
