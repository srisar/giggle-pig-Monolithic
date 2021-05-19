import Vue from "vue"
import Vuex from "vuex"

import Auth from "./modules/auth"
import Users from "./modules/users"

Vue.use(Vuex)

export default new Vuex.Store({

    state: {},
    mutations: {},
    actions: {},
    modules: {
        auth: Auth,
        users: Users,
    }

})
