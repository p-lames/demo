const express = require('express');
const router = express.Router();
const {
    findAllRolesController, createRoleController, findRoleController, updateRoleController, deleteRoleController,
    findRolePrivilegesController, createRolePrivilegeController, deleteRolePrivilegeController, findRoleUsersController,
    createRoleUserController, deleteRoleUserController
} = require("../controller/role.controller");
router
    .route("/")
    .get(findAllRolesController)
    .post(createRoleController)
router
    .route("/:roleId")
    .get(findRoleController)
    .put(updateRoleController)
    .delete(deleteRoleController);

router
    .route("/:roleId/privileges")
    .get(findRolePrivilegesController)
    .post(createRolePrivilegeController)
    .delete(deleteRolePrivilegeController)
;
router
    .route("/:roleId/privileges/:privilegeId")
    .delete(deleteRolePrivilegeController)
;

router
    .route("/:roleId/users")
    .get(findRoleUsersController)
    .post(createRoleUserController)
;
router
    .route("/:roleId/users/:userId")
    .delete(deleteRoleUserController)
;

module.exports = router;