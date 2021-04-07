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


        FETCH_USER: function ({commit}, id) {

            return new Promise((resolve, reject) => {

                axios.get(`users/get.php?id=${id}`)
                    .then(response => {

                        commit('setUser', response.data.payload.user)

                    })
                    .catch(error => {
                        reject(error)
                    })
            })

        },
        /* fetch user */

        UPDATE_USER: function ({commit}, user) {

            return new Promise((resolve, reject) => {

                axios.post('users/update.php', user)
                    .then(response => {

                        resolve()

                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        },
        /* update user details */

        UPDATE_USER_PASSWORD: function ({commit}, params) {

            /*
            * params: {id, current_password, new_password}
            * */

            return new Promise((resolve, reject) => {

                axios.post('users/update-password.php', params)
                    .then(response => {

                        resolve(response.data.payload.data)

                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        },
        /* update user password */


    },
    /* *** ACTIONS *** */

}
