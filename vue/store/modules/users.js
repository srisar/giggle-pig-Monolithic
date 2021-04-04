import axios from "axios";


export default {

    state: {

        user: {},

    },
    /* *** STATE *** */

    getters: {

        getUser: function (state) {
            return state.user
        }

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

                        console.log(response.data.payload)

                        resolve()

                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        },
        /* update user details */


    },
    /* *** ACTIONS *** */

}
