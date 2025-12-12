const express = require("express");
const Media = require("../models/media");
const { verifyToken, requireRole } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Medios
 *   description: API para gestionar medios audiovisuales (películas, series, etc.)
 */

/**
 * @swagger
 * /media:
 *   get:
 *     summary: Obtener todos los medios
 *     tags: [Medios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Listar medios (rol administrador o docente)
 *     responses:
 *       200:
 *         description: Lista de medios con información poblada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MediaPopulated'
 */
router.get("/", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const media = await Media.find().populate("genero director productora tipo");
  res.json(media);
});

/**
 * @swagger
 * /media/{id}:
 *   get:
 *     summary: Obtener un medio por ID
 *     tags: [Medios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Obtener medio por ID (rol administrador o docente)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del medio
 *         schema:
 *           type: string
 *         example: "507f1f77bcf86cd799439015"
 *     responses:
 *       200:
 *         description: Medio encontrado con información poblada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MediaPopulated'
 *       404:
 *         description: Medio no encontrado
 */
router.get("/:id", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const media = await Media.findById(req.params.id).populate(
    "genero director productora tipo"
  );
  res.json(media);
});

/**
 * @swagger
 * /media:
 *   post:
 *     summary: Crear un nuevo medio
 *     tags: [Medios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Crear medio (rol administrador)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaInput'
 *     responses:
 *       201:
 *         description: Medio creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       400:
 *         description: Error en los datos de entrada
 */
router.post("/", verifyToken, requireRole("administrador"), async (req, res) => {
  const nuevaMedia = new Media(req.body);
  await nuevaMedia.save();
  res.json(nuevaMedia);
});

/**
 * @swagger
 * /media/{id}:
 *   put:
 *     summary: Actualizar un medio existente
 *     tags: [Medios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Actualizar medio (rol administrador)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del medio a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MediaInput'
 *     responses:
 *       200:
 *         description: Medio actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       404:
 *         description: Medio no encontrado
 *       400:
 *         description: Error en los datos de entrada
 */
router.put("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  const media = await Media.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(media);
});

/**
 * @swagger
 * /media/{id}:
 *   delete:
 *     summary: Eliminar un medio
 *     tags: [Medios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Eliminar medio (rol administrador). Tipo - Eliminación física
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del medio a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medio eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eliminado correctamente"
 *       404:
 *         description: Medio no encontrado
 */
router.delete("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado correctamente" });
});



module.exports = router;
