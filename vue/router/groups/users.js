import ManageUsers from "../../views/users/ManageUsers";
import EditUser from "../../views/users/EditUser";
import CreateUser from "../../views/users/CreateUser";

export const userRoutes = [

    {
        path: "/users",
        name: "ManageUser",
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "/users/edit/:id",
        name: "EditUser",
        component: EditUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "/users/create",
        name: "CreateUser",
        component: CreateUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

];
