const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Tipo:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del tipo generado automáticamente
 *           example: "507f1f77bcf86cd799439014"
 *         nombre:
 *           type: string
 *           description: Nombre único del tipo de medio
 *           example: "Película"
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
 *           description: Descripción del tipo de medio
 *           example: "Contenido cinematográfico de larga duración"
 *       example:
 *         _id: "507f1f77bcf86cd799439014"
 *         nombre: "Película"
 *         fecha_creacion: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion: "2023-12-01T10:30:00.000Z"
 *         descripcion: "Contenido cinematográfico de larga duración"
 */

const TipoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  descripcion: String,
});

TipoSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Tipo", TipoSchema);
