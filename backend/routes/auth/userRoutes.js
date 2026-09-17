const express = require("express");
const userRoutes = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../../controllers/auth/userController");

userRoutes.post("/", createUser);
userRoutes.get("/", getUsers);
userRoutes.get("/:id", getUserById);
userRoutes.put("/:id", updateUser);
userRoutes.delete("/:id", deleteUser);

module.exports = userRoutes;
