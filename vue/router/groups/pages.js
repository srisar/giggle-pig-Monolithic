import Home from "../../views/pages/Home";
import ModalWindowView from "../../views/pages/ModalWindowView";
import BootloksView from "../../views/pages/BootloksView";
import FileUploadView from "../../views/pages/FileUploadView";

export const pagesRoutes = [

    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/bootloks',
        component: BootloksView,
    },
    {
        path: "/modals",
        name: "modals",
        component: ModalWindowView
    },
    {
        path: "/uploads",
        name: "file-uploads",
        component: FileUploadView
    },
]
