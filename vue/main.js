import Vue from "vue";
import router from "./router/index";
import store from "./store/index";

import App from "./App";

/* axios*/
import axios from "axios";

/* bootstrap 5 */
import "@popperjs/core";
import "bootstrap-icons/font/bootstrap-icons.css";
/* local common scss */
import "./assets/scss/common.scss";
/* daterangepicker */
import "./assets/libs/daterangepicker/daterangepicker.css";
import "./assets/libs/daterangepicker/daterangepicker";

window.bootstrap = require( "bootstrap/dist/js/bootstrap.bundle.min" );
window.moment = require( "moment" );


/* Axios configurations */
axios.defaults.baseURL = "http://localhost/api";
axios.defaults.headers[ "auth" ] = store.getters.getAuthKey;

/*
* Axios intercepting incoming responses, to check if it is 401,
* then route to login page, because auth token is expired, or
* not logged in
* */

axios.interceptors.response.use( undefined, ( error => {
    if ( error.response.status === 401 ) {
        store.dispatch( "auth_logout" ).then( () => {
            router.push( "/login" ).then();
        } );
    }
    return Promise.reject( error );
} ) )


/* Vue initialization */
new Vue( {
    store: store,
    router: router,
    render: h => h( App )
} ).$mount( "#app" );
