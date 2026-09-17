const express = require("express");
const roleRoutes = express.Router();
const { createRole, getRoles, getRoleById, updateRole, deleteRole } = require("../../controllers/auth/roleController");

roleRoutes.post("/", createRole);
roleRoutes.get("/", getRoles);
roleRoutes.get("/:id", getRoleById);
roleRoutes.put("/:id", updateRole);
roleRoutes.delete("/:id", deleteRole);

module.exports = roleRoutes;
