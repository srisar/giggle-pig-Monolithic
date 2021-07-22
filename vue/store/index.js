import {createStore} from "vuex";

import {authStore} from "./modules/auth";
import {usersStore} from "./modules/users";

export const store = createStore( {

    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: authStore,
        users: usersStore,
    }
} );
