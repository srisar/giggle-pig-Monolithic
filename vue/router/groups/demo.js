import BootloksDemoView from "../../views/demo/BootloksDemoView";
import ModalWindowDemoView from "../../views/demo/ModalWindowDemoView";
import FileUploadDemoView from "../../views/demo/FileUploadDemoView";

export const demoRoutes = [
    {
        path: "/demo/bootloks",
        name: "demoBootloks",
        component: BootloksDemoView
    },
    {
        path: "/demo/modals",
        name: "demoModals",
        component: ModalWindowDemoView
    },
    {
        path: "/demo/uploads",
        name: "demoFileUploads",
        component: FileUploadDemoView
    },
];
