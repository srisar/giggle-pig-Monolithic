import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../views/Login";
import {store} from "../store/index";

import {pagesRoutes} from "./groups/pages";
import {adminRoutes} from "./groups/admin";
import {demoRoutes} from "./groups/demo"; /* demo routes: this can be removed */
import Page404 from "../views/pages/Page404";


const routes = [

    {
        path: "/login",
        name: "Login",
        component: Login
    },

    ...pagesRoutes,
    ...adminRoutes,
    ...demoRoutes, /* demo routes, can be removed */
    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: Page404
    }
];


export const router = createRouter( {
    history: createWebHashHistory(),
    routes: routes,
} );


/**
 * To make sure only authenticated pages can be viewed if logged in
 * otherwise redirect to login page
 */
router.beforeEach( ( to, from, next ) => {
    const userType = store.getters.getUserType;
    const isLoggedIn = store.getters.getLoginStatus;

    if ( to.matched.some( record => record.meta.requiresAuth ) ) {

        if ( to.meta.hasOwnProperty( "hasAccess" ) ) {
            if ( !to.meta.hasAccess.includes( userType ) ) {
                next( "/login" );
            }
        }

        if ( isLoggedIn ) {
            next();
        } else {
            next( "/login" );
        }

    } else {
        next();
    }
} )


// export default router;
