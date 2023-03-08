import Ad from "../models/Ad";
import cloudinary from "../libs/configDinary";

export const createAd = async (req, res, next) => {
  try {
    const { titulo, descripcion, tipo } = req.body;
    const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
      upload_preset: "williamImages",
    });
    const ad = new Ad({
      titulo,
      descripcion,
      tipo,
      image: uploadedResponse.secure_url,
    });
    await ad.save();
    res.status(201).json(ad);
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
    const updatedAdFields = req.body;
    const { adId } = req.params;

    const ad = await Ad.findById(adId);
    if (!ad) {
      const error = new Error("Ad not found");
      error.status = 404;
      throw error;
    }

    // Actualiza solo las propiedades que se proporcionan en el cuerpo de la solicitud
    Object.keys(updatedAdFields).forEach(key => {
      ad[key] = updatedAdFields[key];
    });

    // Actualiza la imagen si se proporciona una nueva imagen
    if (req.file) {
      const uploadedResponse = await cloudinary.uploader.upload(req.file.path, {
        upload_preset: "williamImages",
      });
      ad.image = uploadedResponse.secure_url;
    }

    const updatedAd = await ad.save();

    res.status(200).json(updatedAd);
  } catch (error) {
    next(error);
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

