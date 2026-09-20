const jwt = require("jsonwebtoken");
const User = require("../models/identity/User");

const protect = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in to proceed.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "luxurystay_hms_jwt_secure_key_super_secret_2026"
    );

    const user = await User.findById(decoded.userId || decoded.id)
      .populate("role")
      .select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Token is invalid or expired.",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        success: false,
        message: `Account is ${user.status}. Access restricted.`,
      });
    }

    if (!user.role || user.role.isActive === false) {
      return res.status(403).json({
        success: false,
        message: "User role is inactive or unavailable.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid authentication token.",
    });
  }
};

module.exports = {
  protect,
  authenticate: protect,
};
