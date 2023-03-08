import Ad from "../models/Ad";
import { uploadImageAds } from "../libs/configDinary";
import fs from "fs-extra";

export const createAd = async (req, res, next) => {
  try {

    if (req.files && req.files.image) {
      // Subir la imagen a Cloudinary y obtener la URL segura y el public_id
      const createdResponse = await uploadImageAds(req.files.image.tempFilePath)
      const imagen = {
        url: createdResponse.secure_url,
        public_id: createdResponse.public_id,
      };

      // Extraer los campos del modelo que se enviarán en el cuerpo de la solicitud
      const fieldsToCreate = Object.keys(Ad.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // Agregar la imagen al objeto de los campos a actualizar
      fieldsToCreate.image = imagen;

      const ad = new Ad({
        fieldsToCreate
      });
      await ad.save();
      await fs.remove(req.files.image.tempFilePath);
      res.status(201).json(ad);
    } else {
      // Si no se cargó una imagen, actualizar solo los campos del modelo
      const fieldsToCreate = Object.keys(Ad.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // crear los campos del usuario
      const ad = new Ad({
        fieldsToCreate
      });
      await ad.save();
      res.status(201).json(ad);
    }
  } catch (error) {
    next(error);
  }
};

export const getAds = async (req, res, next) => {
  try {
    const ads = await Ad.find();
    res.json(ads);
  } catch (error) {
    next(error);
  }
};

export const getAdById = async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.adId);
    if (!ad) {
      const error = new Error("Ad not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json(ad);
  } catch (error) {
    next(error);
  }
};

export const updateAdById = async (req, res, next) => {
  try {
    let updatedAd;

    // Verificar si se cargó una imagen en la solicitud
    if (req.files && req.files.image) {
      // Subir la imagen a Cloudinary y obtener la URL segura y el public_id
      const uploadedResponse = await uploadImageAds(req.files.image.tempFilePath)
      const imagen = {
        url: uploadedResponse.secure_url,
        public_id: uploadedResponse.public_id,
      };

      // Extraer los campos del modelo que se enviarán en el cuerpo de la solicitud
      const fieldsToUpdate = Object.keys(Ad.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // Agregar la imagen al objeto de los campos a actualizar
      fieldsToUpdate.image = imagen;

      // Actualizar los campos del usuario
      updatedAd = await Ad.findByIdAndUpdate(
        req.params.adId,
        fieldsToUpdate,
        { new: true }
      );

      await fs.remove(req.files.image.tempFilePath);
    } else {
      // Si no se cargó una imagen, actualizar solo los campos del modelo
      const fieldsToUpdate = Object.keys(Ad.schema.paths).reduce((acc, key) => {
        if (key !== '__v' && key !== '_id') {
          if (req.body[key] !== undefined) {
            acc[key] = req.body[key];
          }
        }
        return acc;
      }, {});

      // Actualizar los campos del usuario
      updatedAd = await Ad.findByIdAndUpdate(
        req.params.adId,
        fieldsToUpdate,
        { new: true }
      );
    }

    if (updatedAd) {
      res.status(200).json(updatedAd);
    } else {
      res.status(404).json({ message: "ad not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



export const deleteAdById = async (req, res, next) => {
  try {
    const { adId } = req.params;
    await Ad.findByIdAndDelete(adId);
    res.status(200).json("Ad Deleted");
  } catch (error) {
    next(error);
  }
};

