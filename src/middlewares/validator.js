import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.status(400).json({ message: "user already exist" });

  const email = await User.findOne({ email: req.body.email });

  if (email) return res.status(400).json({ message: "email already exist" });

  next();
};

export const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }
  next();
};

export const checkEmailDomain = (req, res, next) => {
  const dominio = "udi.edu.co";
  const regex = new RegExp(`^[a-zA-Z0-9._%+-]+@${dominio}$`);
  const { email } = req.body;
  // Utilizar la función test() para comprobar si el correo electrónico es válido
  if (regex.test(email)) {
    console.log("El correo electrónico es válido");
    res.json({
      message: `Email ${req.body.email} does valid`,
    });
    next();
  } else {
    console.log("El correo electrónico no es válido");
    return res.status(400).json({
      message: `Email ${req.body.email} does not valid`,
    });
  }
};
