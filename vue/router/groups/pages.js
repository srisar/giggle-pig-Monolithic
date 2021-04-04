import Home from "../../views/pages/Home";
import About from "../../views/pages/About";

export default [

    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            requiresAuth: true,
        }
    },
]
