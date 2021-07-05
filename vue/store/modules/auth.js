import axios from "axios";

const LOGIN_STATUS = "login-status"
const AUTH_KEY = "auth-key"
const USER = "user-details"

export const authStore = {

    state: {

        _storeLoginStatus: localStorage.getItem( LOGIN_STATUS ) || "false",
        _storeAuthKey: localStorage.getItem( AUTH_KEY ) || "",
        _storeUser: localStorage.getItem( USER ) || "{}"

    },

    getters: {

        getLoginStatus( state ) {
            return state._storeLoginStatus === "true";
        },

        getLoggedInUser( state ) {
            return JSON.parse( state._storeUser );
        },

        getAuthKey( state ) {
            return state._storeAuthKey;
        },

        getUserType( state ) {
            return JSON.parse( state._storeUser )[ "role" ] || "NONE";
        },

    },

    mutations: {

        loginSuccess( state ) {
            state._storeLoginStatus = localStorage.getItem( LOGIN_STATUS ) || "";
            state._storeUser = localStorage.getItem( USER ) || "{}";
            state._storeAuthKey = localStorage.getItem( AUTH_KEY ) || "";
        },

        logoutSuccess( state ) {
            state._storeLoginStatus = "false";
            state._storeAuthKey = "";
            state._storeUser = "{}";
        },

    },

    actions: {

        async auth_login( context, userParams ) {

            let response = await axios.post( "auth/login.php", userParams );

            const key = response.data.payload.auth_key;
            const user = response.data.payload.user;

            localStorage.setItem( AUTH_KEY, key );
            localStorage.setItem( LOGIN_STATUS, "true" );
            localStorage.setItem( USER, JSON.stringify( user ) );

            axios.defaults.headers[ "auth" ] = key;

            context.commit( "loginSuccess" );


        }, /* login */

        async auth_logout( context ) {

            localStorage.setItem( AUTH_KEY, "" );
            localStorage.setItem( LOGIN_STATUS, "false" );
            localStorage.setItem( USER, "{}" );

            context.commit( "logoutSuccess" );

        }, /* logout */

    },

}
