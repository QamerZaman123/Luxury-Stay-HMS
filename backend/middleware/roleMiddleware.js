const requireRole = (...allowedRoles) => {
  const flattenedRoles = allowedRoles.flat();

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required before checking permissions.",
      });
    }

    const currentRoleName =
      typeof req.user.role === "object" && req.user.role !== null
        ? req.user.role.name
        : req.user.role;

    if (!currentRoleName || !flattenedRoles.includes(currentRoleName)) {
      return res.status(403).json({
        success: false,
        message: "Access denied: insufficient permissions.",
      });
    }

    next();
  };
};

module.exports = {
  requireRole,
  authorizeRoles: requireRole,
};
