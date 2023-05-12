const privileges = require("../models").privileges;
const Roles = require("../models").roles;
const Users = require('../models').users;

const createUserController = async (req, res) => {
    try {
        const newUser = req.body;
        const user = await Users.create(newUser)

        res.status(201).json({
            status: "success",
            user,
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
};
const findUserController = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.userId);

        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            });
        }

        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const updateUserController = async (
    req, res
) => {
    try {
        const result = await Users.update(
            {
                ...req.body,
                id: req.params.userId,
                updatedAt: Date.now()
            },
            {
                where: {
                    id: req.params.userId,
                },
            }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            });
        }

        const user = await Users.findByPk(req.params.userId);

        res.status(200).json({
            status: "success",
            user
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findAllUsersController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        // const user = await users.findAll();
        const user = await Users.findAll({limit, offset: skip});

        res.status(200).json({
            status: "success",
            results: user.length,
            user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const result = await Users.destroy({
            where: {id: req.params.userId},
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
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

const findUserRoleController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const users = await Users.findAll({include: Roles, limit, offset: skip, where: {id: req.params.userId}});
        res.status(200).json({
            status: "success",
            results: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
}

const createUserRoleController = async (req, res) => {
    try {
        const roleName = req.body;

        const role = await Roles.findByPk(roleName.id)
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        const user = await Users.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            });
        }

        const usersRes = await user.addRoles(role)
        res.status(201).json({
            status: "success",
            data: {
                roles: usersRes,
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

const deleteUserRoleController = async (req, res) => {
    try {
        const roleName = req.body;
        const role = await Roles.findByPk(roleName.id)
        if (!role) {
            return res.status(404).json({
                status: "fail",
                message: "Role with that ID not found",
            });
        }

        const user = await Users.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
            });
        }

        const result = await user.removeRole(role)

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "User with that ID not found",
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
    createUserController,
    findUserController,
    updateUserController,
    findAllUsersController,
    deleteUserController,
    findUserRoleController,
    createUserRoleController,
    deleteUserRoleController
}