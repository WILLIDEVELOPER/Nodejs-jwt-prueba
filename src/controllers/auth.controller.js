import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Role";

export const signUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
    });

    if (roles && roles.length > 0) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "egresado" });
      newUser.roles = [role._id];
    }

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const signIn = async (req, res) => {
  let token;
  let isAdmin = false;

  const userFound = await User.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword)
    return res.status(401).json({ token: null, message: "Contraseña Incorrecta" });

  for (let i = 0; i < userFound.roles.length; i++) {
    if (
      userFound.roles[i] == "admin" ||
      userFound.roles[i] == "lider universitario"
    ) {
      isAdmin = true;
      break;
    }
  }

  if (isAdmin) {
    token = jwt.sign({ id: userFound._id }, config.SECRET);
  } else {
    token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });
  }

  res.json({ userFound, token });
};
