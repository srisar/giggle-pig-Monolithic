import Home from "../../views/pages/Home";
import BsDialogBoxes from "../../views/pages/BsDialogBoxes";

export const pagesRoutes = [

    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/bs-dialogs',
        name: 'bs-dialogs',
        component: BsDialogBoxes,
        meta: {
            requiresAuth: true,
        }
    },
]
