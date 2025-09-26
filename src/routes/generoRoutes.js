const express = require("express");
const Genero = require("../models/genero");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Géneros
 *   description: API para gestionar géneros de medios
 */

/**
 * @swagger
 * /generos:
 *   get:
 *     summary: Obtener todos los géneros
 *     tags: [Géneros]
 *     responses:
 *       200:
 *         description: Lista de géneros
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genero'
 */
router.get("/", async (   req, res) => {
  const generos = await Genero.find();
  res.json(generos);
});

/**
 * @swagger
 * /generos/{id}:
 *   get:
 *     summary: Obtener un género por ID
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       404:
 *         description: Género no encontrado
 */
router.get("/:id", async (req, res) => {
  const genero = await Genero.findById(req.params.id);
  res.json(genero);
});

/**
 * @swagger
 * /generos:
 *   post:
 *     summary: Crear un nuevo género
 *     tags: [Géneros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       201:
 *         description: Género creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       400:
 *         description: Error en los datos de entrada
 */
router.post("/", async (req, res) => {
  const nuevoGenero = new Genero(req.body);
  await nuevoGenero.save();
  res.json(nuevoGenero);
});

/**
 * @swagger
 * /generos/{id}:
 *   put:
 *     summary: Actualizar un género existente
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GeneroInput'
 *     responses:
 *       200:
 *         description: Género actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       404:
 *         description: Género no encontrado
 *       400:
 *         description: Error en los datos de entrada
 */
router.put("/:id", async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(genero);
});

/**
 * @swagger
 * /generos/{id}:
 *   delete:
 *     summary: Eliminación lógica de un género
 *     tags: [Géneros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del género a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Género marcado como Inactivo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genero'
 *       404:
 *         description: Género no encontrado
 */
router.delete("/:id", async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(
    req.params.id,
    { estado: "Inactivo" },
    { new: true }
  );
  res.json(genero);
});

module.exports = router;
