const express = require("express");
const Productora = require("../models/productora");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Productoras
 *   description: API para gestionar productoras de medios audiovisuales
 */

/**
 * @swagger
 * /productoras:
 *   get:
 *     summary: Obtener todas las productoras
 *     tags: [Productoras]
 *     responses:
 *       200:
 *         description: Lista de productoras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Productora'
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productoras/{id}:
 *   get:
 *     summary: Obtener una productora por ID
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la productora
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Productora encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productora'
 *       404:
 *         description: Productora no encontrada
 *       500:
 *         description: Error del servidor
 */
router.get("/:id", async (req, res) => {
  try {
    const productora = await Productora.findById(req.params.id);
    if (!productora) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }
    res.json(productora);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productoras:
 *   post:
 *     summary: Crear una nueva productora
 *     tags: [Productoras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoraInput'
 *     responses:
 *       201:
 *         description: Productora creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productora'
 *       400:
 *         description: Error en los datos de entrada
 */
router.post("/", async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body);
    await nuevaProductora.save();
    res.status(201).json(nuevaProductora);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productoras/{id}:
 *   put:
 *     summary: Actualizar una productora existente
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la productora a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductoraInput'
 *     responses:
 *       200:
 *         description: Productora actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Productora'
 *       404:
 *         description: Productora no encontrada
 *       400:
 *         description: Error en los datos de entrada
 */
router.put("/:id", async (req, res) => {
  try {
    const productora = await Productora.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productora) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }
    res.json(productora);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /productoras/{id}:
 *   delete:
 *     summary: Eliminar una productora
 *     tags: [Productoras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la productora a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Productora eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Eliminada correctamente"
 *       404:
 *         description: Productora no encontrada
 *       500:
 *         description: Error del servidor
 */
router.delete("/:id", async (req, res) => {
  try {
    const productora = await Productora.findByIdAndDelete(req.params.id);
    if (!productora) {
      return res.status(404).json({ message: "Productora no encontrada" });
    }
    res.json({ message: "Eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
