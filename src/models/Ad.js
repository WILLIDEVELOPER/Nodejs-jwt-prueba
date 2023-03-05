import { Schema, model } from "mongoose";
import cloudinary from "../libs/configDinary"

const adSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["eventos", "noticias", "cursos", "empleo"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

adSchema.pre("save", async function (next) {
  if (this.isModified("image")) {
    try {
      const uploadedResponse = await cloudinary.uploader.upload(this.image, {
        upload_preset: "williamImages",
      });
      this.image = uploadedResponse.secure_url;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

export default model("Anuncios", adSchema);
