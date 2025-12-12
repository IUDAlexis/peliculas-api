const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del género generado automáticamente
 *           example: "507f1f77bcf86cd799439011"
 *         nombre:
 *           type: string
 *           description: Nombre único del género
 *           example: "Acción"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado del género
 *           example: "Activo"
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro
 *           example: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           example: "2023-12-01T10:30:00.000Z"
 *         descripcion:
 *           type: string
 *           description: Descripción opcional del género
 *           example: "Películas y series con mucha acción y aventura"
 *       example:
 *         _id: "507f1f77bcf86cd799439011"
 *         nombre: "Acción"
 *         estado: "Activo"
 *         fecha_creacion: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion: "2023-12-01T10:30:00.000Z"
 *         descripcion: "Películas y series con mucha acción y aventura"
 *     GeneroInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre único del género
 *           example: "Comedia"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado del género
 *           example: "Activo"
 *         descripcion:
 *           type: string
 *           description: Descripción opcional del género
 *           example: "Películas y series de humor"
 *       example:
 *         nombre: "Comedia"
 *         estado: "Activo"
 *         descripcion: "Películas y series de humor"
 */

const GeneroSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: { type: String },
});

GeneroSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Genero", GeneroSchema);
