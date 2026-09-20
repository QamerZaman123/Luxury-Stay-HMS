const express = require("express");
const roleRoutes = express.Router();
const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../../controllers/auth/roleController");
const { protect } = require("../../middleware/authMiddleware");
const { requireRole } = require("../../middleware/roleMiddleware");

// All role routes require authentication
roleRoutes.use(protect);

roleRoutes.post("/", requireRole("admin"), createRole);
roleRoutes.get("/", requireRole("admin", "manager"), getRoles);
roleRoutes.get("/:id", requireRole("admin", "manager"), getRoleById);
roleRoutes.put("/:id", requireRole("admin"), updateRole);
roleRoutes.delete("/:id", requireRole("admin"), deleteRole);

module.exports = roleRoutes;
