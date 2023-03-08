import User from "../models/User";
import { uploadImageUsers } from "../libs/configDinary";
import fs from "fs-extra";

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

    // Verificar si se cargó una imagen en la solicitud
    if (req.files && req.files.profileImage) {
      // Subir la imagen a Cloudinary y obtener la URL segura y el public_id
      const uploadedResponse = await uploadImageUsers(req.files.profileImage.tempFilePath)
      const image = {
        url: uploadedResponse.secure_url,
        public_id: uploadedResponse.public_id,
      };

      // Extraer los campos del modelo que se enviarán en el cuerpo de la solicitud
      const fieldsToUpdate = Object.keys(User.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // Agregar la imagen al objeto de los campos a actualizar
      fieldsToUpdate.profileImage = JSON.stringify(image);

      // Actualizar los campos del usuario
      updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        fieldsToUpdate,
        { new: true }
      );

      await fs.remove(req.files.profileImage.tempFilePath);
    } else {
      // Si no se cargó una imagen, actualizar solo los campos del modelo
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

