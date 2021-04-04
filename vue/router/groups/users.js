import ManageUsers from "../../views/users/ManageUsers";
import EditUser from "../../views/users/EditUser";

export default [

    {
        path: '/users',
        name: 'users-manage',
        component: ManageUsers,
        meta: {
            requiresAuth: true,
            adminOnly: true,
        }
    },
    {
        path: '/user/:id',
        name: 'user-edit',
        component: EditUser,
        meta: {
            requiresAuth: true,
            adminOnly: true,
        }
    },

]
