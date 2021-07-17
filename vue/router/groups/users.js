import ManageUsers from "../../views/admin/users/ManageUsers";
import EditUser from "../../views/admin/users/EditUser";
import CreateUser from "../../views/admin/users/CreateUser";

export const userRoutes = [

    {
        path: "users",
        name: "manageUsers",
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "users/edit/:id",
        name: "editUser",
        component: EditUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

    {
        path: "users/create",
        name: "createUser",
        component: CreateUser,
        meta: {
            requiresAuth: true,
            hasAccess: ["ADMIN"],
        }
    },

];
