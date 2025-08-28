const express = require("express");
const Tipo = require("../models/tipo"); // corregido
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
 *     responses:
 *       200:
 *         description: Lista de tipos
 */
router.get("/", async (req, res) => {
  const tipos = await Tipo.find();
  res.json(tipos);
});

/**
 * @swagger
 * /tipos/{id}:
 *   get:
 *     summary: Obtener un tipo por ID
 *     tags: [Tipos]
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
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  try {
    const tipo = await Tipo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tipo) {
      return res.status(404).json({ message: "Tipo no encontrado" });
    }
    res.json(tipo);
  } catch (error) {
    console.error("Error al actualizar tipo:", error);
    res.status(500).json({ message: "Error al actualizar tipo" });
  }
});

/**
 * @swagger
 * /tipos/{id}:
 *   delete:
 *     summary: Eliminación lógica de un tipo
 *     tags: [Tipos]
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
router.delete("/:id", async (req, res) => {
  const tipo = await Tipo.findByIdAndUpdate(
    req.params.id,
    { estado: "Inactivo" },
    { new: true }
  );
  if (!tipo) {
    return res.status(404).json({ message: "Tipo no encontrado" });
  }
  res.json(tipo);
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Tipo:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del tipo
 *         estado:
 *           type: string
 *           enum: [Activo, Inactivo]
 *           description: Estado del tipo
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *         fecha_actualizacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de actualización
 */

module.exports = router;
