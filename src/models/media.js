const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       required:
 *         - serial
 *         - titulo
 *         - url_pelicula
 *         - genero
 *         - director
 *         - productora
 *         - tipo
 *       properties:
 *         _id:
 *           type: string
 *           description: ID único del medio generado automáticamente
 *           example: "507f1f77bcf86cd799439015"
 *         serial:
 *           type: string
 *           description: Serial único del medio para identificación
 *           example: "MOV-2023-001"
 *         titulo:
 *           type: string
 *           description: Título del medio audiovisual
 *           example: "El Padrino"
 *         sinopsis:
 *           type: string
 *           description: Sinopsis o descripción del contenido
 *           example: "La historia de una familia de la mafia italiana en Nueva York"
 *         url_pelicula:
 *           type: string
 *           description: URL única de acceso al medio
 *           example: "https://streaming.com/el-padrino"
 *         imagen_portada:
 *           type: string
 *           description: URL de la imagen de portada
 *           example: "https://images.com/el-padrino-poster.jpg"
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
 *         anio_estreno:
 *           type: number
 *           description: Año de estreno del medio
 *           example: 1972
 *         genero:
 *           type: string
 *           description: ID del género (referencia al modelo Genero)
 *           example: "507f1f77bcf86cd799439011"
 *         director:
 *           type: string
 *           description: ID del director (referencia al modelo Director)
 *           example: "507f1f77bcf86cd799439012"
 *         productora:
 *           type: string
 *           description: ID de la productora (referencia al modelo Productora)
 *           example: "507f1f77bcf86cd799439013"
 *         tipo:
 *           type: string
 *           description: ID del tipo (referencia al modelo Tipo)
 *           example: "507f1f77bcf86cd799439014"
 *       example:
 *         _id: "507f1f77bcf86cd799439015"
 *         serial: "MOV-2023-001"
 *         titulo: "El Padrino"
 *         sinopsis: "La historia de una familia de la mafia italiana en Nueva York"
 *         url_pelicula: "https://streaming.com/el-padrino"
 *         imagen_portada: "https://images.com/el-padrino-poster.jpg"
 *         fecha_creacion: "2023-12-01T10:30:00.000Z"
 *         fecha_actualizacion: "2023-12-01T10:30:00.000Z"
 *         anio_estreno: 1972
 *         genero: "507f1f77bcf86cd799439011"
 *         director: "507f1f77bcf86cd799439012"
 *         productora: "507f1f77bcf86cd799439013"
 *         tipo: "507f1f77bcf86cd799439014"
 *     MediaInput:
 *       type: object
 *       required:
 *         - serial
 *         - titulo
 *         - url_pelicula
 *         - genero
 *         - director
 *         - productora
 *         - tipo
 *       properties:
 *         serial:
 *           type: string
 *           description: Serial único del medio para identificación
 *           example: "MOV-2024-002"
 *         titulo:
 *           type: string
 *           description: Título del medio audiovisual
 *           example: "Inception"
 *         sinopsis:
 *           type: string
 *           description: Sinopsis o descripción del contenido
 *           example: "Un ladrón que roba secretos corporativos a través de la tecnología de compartir sueños"
 *         url_pelicula:
 *           type: string
 *           description: URL única de acceso al medio
 *           example: "https://streaming.com/inception"
 *         imagen_portada:
 *           type: string
 *           description: URL de la imagen de portada
 *           example: "https://images.com/inception-poster.jpg"
 *         anio_estreno:
 *           type: number
 *           description: Año de estreno del medio
 *           example: 2010
 *         genero:
 *           type: string
 *           description: ID del género (referencia al modelo Genero)
 *           example: "507f1f77bcf86cd799439011"
 *         director:
 *           type: string
 *           description: ID del director (referencia al modelo Director)
 *           example: "507f1f77bcf86cd799439012"
 *         productora:
 *           type: string
 *           description: ID de la productora (referencia al modelo Productora)
 *           example: "507f1f77bcf86cd799439013"
 *         tipo:
 *           type: string
 *           description: ID del tipo (referencia al modelo Tipo)
 *           example: "507f1f77bcf86cd799439014"
 *       example:
 *         serial: "MOV-2024-002"
 *         titulo: "Inception"
 *         sinopsis: "Un ladrón que roba secretos corporativos a través de la tecnología de compartir sueños"
 *         url_pelicula: "https://streaming.com/inception"
 *         imagen_portada: "https://images.com/inception-poster.jpg"
 *         anio_estreno: 2010
 *         genero: "507f1f77bcf86cd799439011"
 *         director: "507f1f77bcf86cd799439012"
 *         productora: "507f1f77bcf86cd799439013"
 *         tipo: "507f1f77bcf86cd799439014"
 *     MediaPopulated:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "507f1f77bcf86cd799439015"
 *         serial:
 *           type: string
 *           example: "MOV-2023-001"
 *         titulo:
 *           type: string
 *           example: "El Padrino"
 *         sinopsis:
 *           type: string
 *           example: "La historia de una familia de la mafia italiana"
 *         url_pelicula:
 *           type: string
 *           example: "https://streaming.com/el-padrino"
 *         imagen_portada:
 *           type: string
 *           example: "https://images.com/el-padrino-poster.jpg"
 *         anio_estreno:
 *           type: number
 *           example: 1972
 *         genero:
 *           $ref: '#/components/schemas/Genero'
 *         director:
 *           $ref: '#/components/schemas/Director'
 *         productora:
 *           $ref: '#/components/schemas/Productora'
 *         tipo:
 *           $ref: '#/components/schemas/Tipo'
 */

const MediaSchema = new mongoose.Schema({
  serial: { type: String, required: true, unique: true },
  titulo: { type: String, required: true },
  sinopsis: String,
  url_pelicula: { type: String, required: true, unique: true },
  imagen_portada: String,
  fecha_creacion: { type: Date, default: Date.now },
  fecha_actualizacion: { type: Date, default: Date.now },
  anio_estreno: Number,
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
    required: true,
  },
  productora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productora",
    required: true,
  },
  tipo: { type: mongoose.Schema.Types.ObjectId, ref: "Tipo", required: true },
});

MediaSchema.pre("save", function (next) {
  this.fecha_actualizacion = Date.now();
  next();
});

module.exports = mongoose.model("Media", MediaSchema);
