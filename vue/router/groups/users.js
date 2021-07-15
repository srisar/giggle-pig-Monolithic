import ManageUsers from "../../views/users/ManageUsers";
import EditUser from "../../views/users/EditUser";
import CreateUser from "../../views/users/CreateUser";

export const userRoutes = [

    {
        path: "users",
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "users/edit/:id",
        component: EditUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "users/create",
        component: CreateUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

];
