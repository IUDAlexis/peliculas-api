const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: String,
  url_pelicula: { type: String, required: true, unique: true },
  imagen_portada: String,
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  anio_estreno: Number,
  genero: { type: mongoose.Schema.Types.ObjectId, ref: "Genero", required: true },
  director: { type: mongoose.Schema.Types.ObjectId, ref: "Director", required: true },
  productora: { type: mongoose.Schema.Types.ObjectId, ref: "Productora", required: true },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true }
});

MediaSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Media", MediaSchema);
