const mongoose = require("mongoose");

const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: String
});

TipoSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Tipo", TipoSchema);
