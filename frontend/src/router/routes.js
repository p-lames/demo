
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'users', name:"users", component: () => import('pages/IndexPage.vue') },
      { path: "users/new", name:"NewUser", component: () => import("pages/NewUserPage.vue") },
      { path: "users/:id/edit", name:"EditUser", component: () => import("pages/EditUserPage.vue") },
      { path: "roles", name:"roles", component: () => import("pages/RolesOverviewPage.vue") },
      { path: "roles/new", name:"NewRole", component: () => import("pages/NewRolePage.vue") },
      { path: "roles/:id/edit", name:"EditRole", component: () => import("pages/EditRolePage.vue") },
      { path: "roles/:id", name:"DetailRole", component: () => import("pages/DetailRolePage.vue") },
      { path: "roles/:id/add-user", name:"AddRoleUser", component: () => import("pages/AddRoleUserPage.vue") },
      { path: "roles/:id/add-privilege", name:"AddRolePrivilege", component: () => import("pages/AddRolePrivilegePage.vue") },
      { path: "privileges", name:"privileges", component: () => import("pages/PrivilegesOverviewPage.vue") },
      { path: "privileges/new", name:"NewPrivilege", component: () => import("pages/NewPrivilegePage.vue") },
      { path: "privileges/:id/edit", name:"EditPrivilege", component: () => import("pages/EditPrivilegePage.vue") },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
