import axios from "axios";

const LOGIN_STATUS = "login-status"
const AUTH_KEY = "auth-key"
const USER = "user-details"

export default {

    state: {

        _storeLoginStatus: localStorage.getItem(LOGIN_STATUS) || "false",
        _storeAuthKey: localStorage.getItem(AUTH_KEY) || "",
        _storeUser: localStorage.getItem(USER) || "{}"

    },
    /* *** STATE *** */

    getters: {

        getLoginStatus: function (state) {
            return state._storeLoginStatus === "true"
        },

        getLoggedInUser: function (state) {
            return JSON.parse(state._storeUser)
        },

        getAuthKey: function (state) {
            return state._storeAuthKey
        },

        getUserType: function (state) {
            return JSON.parse(state._storeUser)["role"] || "NONE"
        },

    },
    /* *** GETTERS *** */

    mutations: {

        loginSuccess: function (state) {
            state._storeLoginStatus = localStorage.getItem(LOGIN_STATUS) || ""
            state._storeUser = localStorage.getItem(USER) || "{}"
            state._storeAuthKey = localStorage.getItem(AUTH_KEY) || ""

        },

        logoutSuccess: function (state) {
            state._storeLoginStatus = "false"
            state._storeAuthKey = ""
            state._storeUser = "{}"


        },
    },
    /* *** MUTATIONS *** */

    actions: {

        async auth_login({commit}, userParams) {

            let response = await axios.post("auth/login.php", userParams);

            const key = response.data.payload.auth_key;
            const user = response.data.payload.user;

            localStorage.setItem(AUTH_KEY, key);
            localStorage.setItem(LOGIN_STATUS, "true");
            localStorage.setItem(USER, JSON.stringify(user));

            axios.defaults.headers["auth"] = key;

            commit("loginSuccess");


        }, /* login */

        async auth_logout({commit}) {

            localStorage.setItem(AUTH_KEY, "")
            localStorage.setItem(LOGIN_STATUS, "false")
            localStorage.setItem(USER, "{}")

            commit("logoutSuccess")

        }, /* logout */

    },
    /* *** ACTIONS *** */

}
