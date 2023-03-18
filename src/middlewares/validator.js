import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).json({ message: "Este usuario ya existe" });

  const email = await User.findOne({ email: req.body.email });

  if (email) return res.status(400).json({ message: "Este email ya existe" });

  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Este role no existe`,
        });
      }
    }
  }
  next();
};

export const checkEmailDomain = (req, res, next) => {
  const dominio = "gmail.com";
  const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${dominio}$`);
  const { email } = req.body;
  // Utilizar la función test() para comprobar si el correo electrónico es válido
  if (regex.test(email)) {
    next();
  } else {
    return res.status(400).json({
      message: `Email no valido`,
    });
  }
};
