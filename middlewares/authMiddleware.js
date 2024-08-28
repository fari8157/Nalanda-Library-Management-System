const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).json({ message: "You are not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user)
    if (!roles.includes(req.user.role)) {

      return res
        .status(403)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};

module.exports = {
  restrictTo,
  protect,
};