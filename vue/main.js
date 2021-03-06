import {createApp} from "vue";
import {router} from "./router/index";
import {store} from "./store/index";

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
import {errorDialog} from "./assets/libs/bootloks";


window.bootstrap = require( "bootstrap/dist/js/bootstrap.bundle.min" );
window.moment = require( "moment" );


/* datatables */
require( "datatables.net-bs5" );
/* css file for datatable is loaded with main scss file under assets/scss/datatables.css */

/* Axios configurations */
const currentDomain = window.location.origin;
axios.defaults.baseURL = `${ currentDomain }/api`;
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
            errorDialog( { message: "Authentication failed. Please login with proper credentials.", id: "auth-failed" } );
        } );
    }
    return Promise.reject( error );
} ) )


/* set document title */
document.title = "Giggle Pig: The Framework";

/* Vue initialization */
createApp( App ).use( router).use(store).mount( "#app" );
