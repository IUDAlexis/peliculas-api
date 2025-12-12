const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  rol: { type: String, required: true, enum: ["administrador", "docente", "usuario"], default: "usuario" },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
}, { timestamps: true });

module.exports = mongoose.model("Usuario", UsuarioSchema);
