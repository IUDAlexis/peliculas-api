const mongoose = require("mongoose");

const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: String
});

module.exports = mongoose.model("Tipo", TipoSchema);
