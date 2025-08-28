const mongoose = require("mongoose");

const DirectorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Director", DirectorSchema);
