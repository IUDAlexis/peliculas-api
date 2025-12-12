const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Director:
 *       type: object
 *       required:
 *         - nombres
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del director generado automáticamente
 *           example: "507f1f77bcf86cd799439012"
 *         nombres:
 *           type: string
 *           description: Nombres completos del director
 *           example: "Steven Spielberg"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado del director
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
 *       example:
 *         _id: "507f1f77bcf86cd799439012"
 *         nombres: "Steven Spielberg"
 *         estado: "Activo"
 *         fecha_creacion: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion: "2023-12-01T10:30:00.000Z"
 *     DirectorInput:
 *       type: object
 *       required:
 *         - nombres
 *       properties:
 *         nombres:
 *           type: string
 *           description: Nombres completos del director
 *           example: "Christopher Nolan"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado del director
 *           example: "Activo"
 *       example:
 *         nombres: "Christopher Nolan"
 *         estado: "Activo"
 */

const DirectorSchema = new mongoose.Schema({
  nombres: { type: String, required: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
});

DirectorSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Director", DirectorSchema);
