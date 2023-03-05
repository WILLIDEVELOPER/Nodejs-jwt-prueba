import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";
import Role from "../models/Role";

export const errorHandler = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "Unauthorized" });
  } else if (err.name === "ForbiddenError") {
    return res.status(403).json({ message: "Forbidden" });
  }
  return res.status(500).json({ message: err.message });
};

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (!token) throw new jwt.UnauthorizedError("No token provider");
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) throw new jwt.UnauthorizedError("No user found");
    next();
  } catch (error) {
    next(error);
  }
};

export const isUniLeader = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    let isLeader = false;
    roles.forEach((role) => {
      if (role.name === "lider universitario") {
        isLeader = true;
      }
    });
    if (isLeader) {
      next();
    } else {
      throw new jwt.ForbiddenError("Requires lider universitario role");
    }
  } catch (error) {
    next(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    let isAdmin = false;
    roles.forEach((role) => {
      if (role.name === "admin") {
        isAdmin = true;
      }
    });
    if (isAdmin) {
      next();
    } else {
      throw new jwt.ForbiddenError("Requires admin role");
    }
  } catch (error) {
    next(error);
  }
};

export const isAdminOrUniLeader = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: user.roles } });
    let isAdminOrLeader = false;
    roles.forEach((role) => {
      if (role.name === "admin" || role.name === "lider universitario") {
        isAdminOrLeader = true;
      }
    });
    if (isAdminOrLeader) {
      next();
    } else {
      throw new jwt.ForbiddenError("Requires admin or lider universitario role");
    }
  } catch (error) {
    next(error);
  }
};


