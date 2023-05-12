const Roles = require("../models").roles;
const Privileges = require('../models').privileges;

const createPrivilegeController = async (req, res) => {
    try {
        const newPrivilege = req.body;
        const privilege = await Privileges.create(newPrivilege)

        res.status(201).json({
            status: "success",
            privilege,
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
};
const findPrivilegeController = async (req, res) => {
    try {
        const privilege = await Privileges.findByPk(req.params.privilegeId);

        if (!privilege) {
            return res.status(404).json({
                status: "fail",
                message: "Privilege with that ID not found",
            });
        }

        res.status(200).json({
            status: "success",
            privilege,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const updatePrivilegeController = async (
    req, res
) => {
    try {
        const result = await Privileges.update(
            {
                ...req.body,
                id: req.params.privilegeId,
                updatedAt: Date.now(),
            },
            {
                where: {
                    id: req.params.privilegeId,
                },
            }
        );

        if (result[0] === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Privilege with that ID not found",
            });
        }

        const privilege = await Privileges.findByPk(req.params.privilegeId);

        res.status(200).json({
            status: "success",
            privilege,

        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const findAllPrivilegesController = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        const privilege = await Privileges.findAll({limit, offset: skip});
        res.status(200).json({
            status: "success",
            results: privilege.length,
            privilege,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
        });
    }
};

const deletePrivilegeController = async (req, res) => {
    try {
        const result = await Privileges.destroy({
            where: {id: req.params.privilegeId},
            force: true,
        });

        if (result === 0) {
            return res.status(404).json({
                status: "fail",
                message: "Privilege with that ID not found",
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
    createPrivilegeController,
    updatePrivilegeController,
    findPrivilegeController,
    findAllPrivilegesController,
    deletePrivilegeController,
}