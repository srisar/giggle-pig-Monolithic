import Home from "../../views/pages/Home";
import BsDialogBoxesView from "../../views/pages/BsDialogBoxesView";
import ModalWindowView from "../../views/pages/ModalWindowView";

export const pagesRoutes = [

    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/bs-dialogs',
        name: 'bs-dialogs',
        component: BsDialogBoxesView,
    },
    {
        path: "/modals",
        name: "modals",
        component: ModalWindowView
    }
]
