import { Schema, model } from "mongoose";

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
    },
    set: {
      type: String,
      required: true,
      enum: ["activo", "inactivo"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);


export default model("Anuncios", adSchema);
