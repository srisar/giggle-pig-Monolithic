import Vue from "vue";
import Vuex from "vuex";

import {authStore} from "./modules/auth";
import {usersStore} from "./modules/users";

Vue.use( Vuex );

export default new Vuex.Store( {

    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: authStore,
        users: usersStore,
    }

} );
