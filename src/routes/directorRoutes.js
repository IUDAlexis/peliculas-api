const express = require("express");
const Director = require("../models/director");
const { verifyToken, requireRole } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Directores
 *   description: API para gestionar directores de medios audiovisuales
 */

/**
 * @swagger
 * /directores:
 *   get:
 *     summary: Obtener todos los directores
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Listar directores (rol administrador o docente)
 *     responses:
 *       200:
 *         description: Lista de directores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Director'
 */
router.get("/", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const directores = await Director.find();
  res.json(directores);
});

/**
 * @swagger
 * /directores/{id}:
 *   get:
 *     summary: Obtener un director por ID
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Obtener director por ID (rol administrador o docente)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del director
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 */
router.get("/:id", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const director = await Director.findById(req.params.id);
  if (!director) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  res.json(director);
});

/**
 * @swagger
 * /directores:
 *   post:
 *     summary: Crear un nuevo director
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Crear director (rol administrador)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DirectorInput'
 *     responses:
 *       201:
 *         description: Director creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       500:
 *         description: Error al crear director
 */
router.post("/", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const nuevoDirector = new Director(req.body);
    await nuevoDirector.save();
    res.json(nuevoDirector);
  } catch (error) {
    console.error("Error al crear director:", error);
    res.status(500).json({ message: "Error al crear director" });
  }
});

/**
 * @swagger
 * /directores/{id}:
 *   put:
 *     summary: Actualizar un director existente
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Actualizar director (rol administrador)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del director a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DirectorInput'
 *     responses:
 *       200:
 *         description: Director actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 */
router.put("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!director) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  res.json(director);
});

/**
 * @swagger
 * /directores/{id}:
 *   delete:
 *     summary: Eliminación lógica de un director
 *     tags: [Directores]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Eliminar director (rol administrador). Tipo - Eliminación lógica (marca Inactivo)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del director a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director marcado como Inactivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Director'
 *       404:
 *         description: Director no encontrado
 */
router.delete("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  const director = await Director.findByIdAndUpdate(
    req.params.id,
    { estado: "Inactivo" },
    { new: true }
  );
  if (!director) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  res.json(director);
});



module.exports = router;
