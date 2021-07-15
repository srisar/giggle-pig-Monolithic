import AdminIndexView from "../../views/admin/AdminIndexView";
import AdminApp from "../../views/admin/AdminApp";
import {userRoutes} from "./users";

export const adminRoutes = [
    {
        path: "/admin",
        component: AdminApp,
        children: [
            {
                path: "/",
                component: AdminIndexView
            },
            ...userRoutes,
        ],
    }
];
