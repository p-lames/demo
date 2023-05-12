const express = require('express');
const {
    createUserController, findAllUsersController, findUserController, updateUserController, deleteUserController,
    createUserRoleController, findUserRoleController, deleteUserRoleController
} = require("../controller/user.controller");
const {
    findRoleController, updateRoleController, deleteRoleController,
    findRolePrivilegesController,
    createRolePrivilegeController
} = require("../controller/role.controller");
const User = require('../models').User;
const router = express.Router();


router
    .route("/")
    .get(findAllUsersController)
    .post(createUserController)

router
    .route("/:userId")
    .get(findUserController)
    .put(updateUserController)
    .delete(deleteUserController);

router
    .route("/:userId/roles")
    .get(findUserRoleController)
    .post(createUserRoleController)
    .delete(deleteUserRoleController)


module.exports = router;