import ManageUsers from "../../views/users/ManageUsers";
import EditUser from "../../views/users/EditUser";
import CreateUser from "../../views/users/CreateUser";

export const userRoutes = [

    {
        path: "/admin/users",
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "/admin/users/edit/:id",
        component: EditUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "/admin/users/create",
        component: CreateUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

];
