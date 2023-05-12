const express = require('express');
const router = express.Router();
const {
    findAllPrivilegesController,
    createPrivilegeController,
    findPrivilegeController,
    updatePrivilegeController,
    deletePrivilegeController
} = require("../controller/privilege.controller");
router
    .route("/")
    .get(findAllPrivilegesController)
    .post(createPrivilegeController)
router
    .route("/:privilegeId")
    .get(findPrivilegeController)
    .put(updatePrivilegeController)
    .delete(deletePrivilegeController);


module.exports = router;