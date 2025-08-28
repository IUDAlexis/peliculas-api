const mongoose = require("mongoose");

const GeneroSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: { type: String }
});

GeneroSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Genero", GeneroSchema);
