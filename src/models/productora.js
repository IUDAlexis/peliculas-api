const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Productora:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único de la productora generado automáticamente
 *           example: "507f1f77bcf86cd799439013"
 *         nombre:
 *           type: string
 *           description: Nombre único de la productora
 *           example: "Warner Bros"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado de la productora
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
 *         slogan:
 *           type: string
 *           description: Slogan o lema de la productora
 *           example: "Entertainment for All"
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la productora
 *           example: "Una de las productoras más grandes de Hollywood"
 *       example:
 *         _id: "507f1f77bcf86cd799439013"
 *         nombre: "Warner Bros"
 *         estado: "Activo"
 *         fecha_creacion: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion: "2023-12-01T10:30:00.000Z"
 *         slogan: "Entertainment for All"
 *         descripcion: "Una de las productoras más grandes de Hollywood"
 *     ProductoraInput:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre único de la productora
 *           example: "Universal Pictures"
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           default: Activo
 *           description: Estado de la productora
 *           example: "Activo"
 *         slogan:
 *           type: string
 *           description: Slogan o lema de la productora
 *           example: "Movies for Everyone"
 *         descripcion:
 *           type: string
 *           description: Descripción detallada de la productora
 *           example: "Productora cinematográfica estadounidense"
 *       example:
 *         nombre: "Universal Pictures"
 *         estado: "Activo"
 *         slogan: "Movies for Everyone"
 *         descripcion: "Productora cinematográfica estadounidense"
 */

const ProductoraSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  estado: { type: String, enum: ["Activo", "Inactivo"], default: "Activo" },
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  slogan: String,
  descripcion: String,
});

ProductoraSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Productora", ProductoraSchema);
