import jwt from "jsonwebtoken";
import User from "../Database/models/User.js";
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const actualToken = token.split(" ")[1];
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || user.role !== "admin") {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
