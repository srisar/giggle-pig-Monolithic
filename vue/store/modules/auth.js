import axios from "axios";
import store from "../index";

const LOGIN_STATUS = 'login-status'
const AUTH_KEY = 'auth-key'
const USER = 'user-details'

export default {

    state: {

        _storeLoginStatus: localStorage.getItem(LOGIN_STATUS) || 'false',
        _storeAuthKey: localStorage.getItem(AUTH_KEY) || '',
        _storeUser: localStorage.getItem(USER) || '{}'

    },
    /* *** STATE *** */

    getters: {

        getLoginStatus: function (state) {
            return state._storeLoginStatus === 'true'
        },

        getLoggedInUser: function (state) {
            return JSON.parse(state._storeUser)
        },

        getAuthKey: function (state) {
            return state._storeAuthKey
        },

        getUserType: function (state) {
            return JSON.parse(state._storeUser)['role'] || 'NONE'
        },

    },
    /* *** GETTERS *** */

    mutations: {

        loginSuccess: function (state) {
            state._storeLoginStatus = localStorage.getItem(LOGIN_STATUS) || ''
            state._storeUser = localStorage.getItem(USER) || '{}'
            state._storeAuthKey = localStorage.getItem(AUTH_KEY) || ''

        },

        logoutSuccess: function (state) {
            state._storeLoginStatus = 'false'
            state._storeAuthKey = ''
            state._storeUser = '{}'


        },
    },
    /* *** MUTATIONS *** */

    actions: {

        LOGIN: function ({commit}, user) {

            return new Promise((resolve, reject) => {

                axios.post('auth/login.php', user)
                    .then(response => {

                        let key = response.data.payload.auth_key
                        let user = response.data.payload.user

                        // add auth data to local storage
                        localStorage.setItem(AUTH_KEY, key)
                        localStorage.setItem(LOGIN_STATUS, 'true')
                        localStorage.setItem(USER, JSON.stringify(user))

                        axios.defaults.headers['auth'] = key

                        commit('loginSuccess')

                        resolve()


                    })
                    .catch(error => {
                        reject(error)
                    })

            })

        }, /* login */

        LOGOUT: function ({commit}) {

            return new Promise((resolve) => {

                localStorage.setItem(AUTH_KEY, '')
                localStorage.setItem(LOGIN_STATUS, 'false')
                localStorage.setItem(USER, '{}')

                commit('logoutSuccess')

                resolve()

            })

        }, /* logout */

    },
    /* *** ACTIONS *** */

}
