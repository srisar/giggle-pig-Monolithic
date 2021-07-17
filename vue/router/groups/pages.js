import Home from "../../views/pages/Home";
import ModalWindowView from "../../views/pages/ModalWindowView";
import BootloksView from "../../views/pages/BootloksView";
import FileUploadView from "../../views/pages/FileUploadView";

export const pagesRoutes = [

    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/bootloks",
        name: "bootloksDemo",
        component: BootloksView,
    },
    {
        path: "/modals",
        name: "modalsDemo",
        component: ModalWindowView
    },
    {
        path: "/uploads",
        name: "fileUploadDemo",
        component: FileUploadView
    },
]
