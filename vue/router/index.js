import Vue from 'vue'
import VueRouter from "vue-router"
import Login from "../views/Login";

import store from '../store/index'

import UsersRoutesGroup from './groups/users'
import PagesRoutesGroup from './groups/pages'
import EditUser from "../views/users/EditUser";

Vue.use(VueRouter)


const routes = [

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    ...PagesRoutesGroup,
    ...UsersRoutesGroup,
]


const router = new VueRouter({
    routes: routes,
})


/**
 * To make sure only authenticated pages can be viewed if logged in
 * otherwise redirect to login page
 */
router.beforeEach((to, from, next) => {
    const userType = store.getters.getUserType
    const isLoggedIn = store.getters.getLoginStatus


    if (to.matched.some(record => record.meta.requiresAuth)) {

        if (to.meta.adminOnly) {
            if (userType !== 'ADMIN') {
                next('/login')
            }
        }

        if (isLoggedIn) {
            next()
        } else {
            next('/login')
        }

    } else {
        next()
    }
})


export default router
