import User from "../models/User";
import cloudinary from "../libs/configDinary";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUserById = async (req, res) => {
  try {
    let updatedUser;

    // Verificar si se cargó un archivo en la solicitud
    if (req.file) {
      // Subir la imagen a Cloudinary y obtener la URL segura
      const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "williamImages",
      });
      const image = uploadedResponse.secure_url;

      // Actualizar la propiedad de la imagen de perfil del usuario
      updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        { profileImage: image },
        { new: true }
      );
    } else {
      // Extraer todos los campos del modelo y crear un objeto con los valores enviados en el cuerpo de la solicitud
      const fieldsToUpdate = Object.keys(User.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // Actualizar los campos del usuario
      updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        fieldsToUpdate,
        { new: true }
      );
    }

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const deleteUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

