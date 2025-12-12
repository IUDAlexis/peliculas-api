const express = require("express");
const Tipo = require("../models/tipo"); // corregido
const { verifyToken, requireRole } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tipos
 *   description: API para gestionar tipos de medios
 */

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Obtener todos los tipos
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Listar tipos (rol administrador o docente)
 *     responses:
 *       200:
 *         description: Lista de tipos
 */
router.get("/", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const tipos = await Tipo.find();
  res.json(tipos);
});

/**
 * @swagger
 * /tipos/{id}:
 *   get:
 *     summary: Obtener un tipo por ID
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Obtener tipo por ID (rol administrador o docente)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo encontrado
 *       404:
 *         description: Tipo no encontrado
 */
router.get("/:id", verifyToken, requireRole("administrador", "docente"), async (req, res) => {
  const tipo = await Tipo.findById(req.params.id);
  if (!tipo) {
    return res.status(404).json({ message: "Tipo no encontrado" });
  }
  res.json(tipo);
});

/**
 * @swagger
 * /tipos:
 *   post:
 *     summary: Crear un nuevo tipo
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Crear tipo (rol administrador)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tipo'
 *     responses:
 *       201:
 *         description: Tipo creado
 *       500:
 *         description: Error al crear tipo
 */
router.post("/", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const nuevoTipo = new Tipo(req.body);
    await nuevoTipo.save();
    res.json(nuevoTipo);
  } catch (error) {
    console.error("Error al crear tipo:", error);
    res.status(500).json({ message: "Error al crear tipo" });
  }
});

/**
 * @swagger
 * /tipos/{id}:
 *   put:
 *     summary: Actualizar un tipo existente
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Actualizar tipo (rol administrador)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tipo'
 *     responses:
 *       200:
 *         description: Tipo actualizado
 *       404:
 *         description: Tipo no encontrado
 *       500:
 *         description: Error al actualizar tipo
 */
router.put("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!tipo) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.status(200).json(tipo);
  } catch (error) {
    console.error("Error al actualizar tipo:", error);
    res.status(500).json({ message: "Error al actualizar tipo", error: error.message });
  }
});

/**
 * @swagger
 * /tipos/{id}:
 *   delete:
 *     summary: Eliminación lógica de un tipo
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Eliminar tipo (rol administrador). Tipo - Eliminación física
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo marcado como Inactivo
 *       404:
 *         description: Tipo no encontrado
 */
router.delete("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndDelete(req.params.id);
    if (!tipo) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.json({ message: "Tipo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar tipo:", error);
    res.status(500).json({ message: "Error al eliminar tipo" });
  }
});

module.exports = router;
