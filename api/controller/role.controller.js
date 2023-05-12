const {users: Users} = require("../models");
const Roles = require('../models').roles;
const Privileges = require('../models').privileges;
const createRoleController = async (req, res) => {
    try {
        console.log(req.body)
        const roleName = req.body;
        const role = await Roles.create(
            roleName
        )
        res.status(201).json({
            status: "success",
            role: role,
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "Role already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const updateRoleController = async (
    req, res
) => {
    try {
        const result = await Roles.update(
            {
                ...req.body,
                id: req.params.roleId,
                updatedAt: Date.now()
            },
            {
                where: {
                    id: req.params.roleId,
                },
            }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        const role = await Roles.findByPk(req.params.roleId);

        res.status(200).json({
            status: "success",
            role,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findRoleController = async (req, res) => {
    try {
        const role = await Roles.findByPk(req.params.roleId);
        console.log(role.id + " " + role.roleName)
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        res.status(200).json({
            status: "success",
            role,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const findAllRolesController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        console.log("findAllRoles" + limit)
        const roles = await Roles.findAll({limit, offset: skip});

        res.status(200).json({
            status: "success",
            results: roles.length,
            roles,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteRoleController = async (req, res) => {
    try {
        const result = await Roles.destroy({
            where: {id: req.params.roleId},
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findRolePrivilegesController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const roles = await Roles.findAll({include: Privileges, limit, offset: skip, where: {id: req.params.roleId}});

        res.status(200).json({
            status: "success",
            results: roles.length,
            roles,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createRolePrivilegeController = async (req, res) => {
    try {
        const privilegeName = req.body;

        const privilege = await Privileges.findByPk(privilegeName.id)
        if (!privilege) {
            return res.status(404).json({
                status: "fail",
                message: "Privilege with that ID not found",
            });
        }

        const role = await Roles.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        const privilegeRes = await role.addPrivileges(privilege)
        res.status(201).json({
            status: "success",
            data: {
                privilege: privilegeRes,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "Privilege already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const deleteRolePrivilegeController = async (req, res) => {
    try {
        const privilege = await Privileges.findByPk(req.params.privilegeId)
        if (!privilege) {
            return res.status(404).json({
                status: "fail",
                message: "Privilege with that ID not found",
            })
        }
        const role = await Roles.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }
        const result = await role.removePrivilege(privilege);

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};
const findRoleUsersController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const roles = await Roles.findAll({include: Users, limit, offset: skip, where: {id: req.params.roleId}});

        res.status(200).json({
            status: "success",
            results: roles.length,
            roles,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createRoleUserController = async (req, res) => {
    try {
        const userName = req.body;
        console.log(userName.id)
        const user = await Users.findByPk(userName.id)
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            });
        }

        const role = await Roles.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        const userRes = await role.addUsers(user)
        res.status(201).json({
            status: "success",
            data: {
                user: userRes,
            },
        });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(409).json({
                status: "failed",
                message: "User already exists",
            });
        }
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}
const deleteRoleUserController = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.userId)
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            })
        }
        const role = await Roles.findByPk(req.params.roleId);
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }
        const result = await role.removeUser(user);

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};


module.exports = {
    createRoleController,
    updateRoleController,
    findRoleController,
    findAllRolesController,
    deleteRoleController,
    findRolePrivilegesController,
    createRolePrivilegeController,
    deleteRolePrivilegeController,
    findRoleUsersController,
    createRoleUserController,
    deleteRoleUserController
}