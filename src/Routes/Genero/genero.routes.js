const express = require("express");
const Genero = require("../models/Genero");
const router = express.Router();

// GET todos
router.get("/", async (req, res) => {
  const generos = await Genero.find();
  res.json(generos);
});

// GET por id
router.get("/:id", async (req, res) => {
  const genero = await Genero.findById(req.params.id);
  res.json(genero);
});

// POST crear
router.post("/", async (req, res) => {
  const nuevoGenero = new Genero(req.body);
  await nuevoGenero.save();
  res.json(nuevoGenero);
});

// PUT actualizar
router.put("/:id", async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(genero);
});

// DELETE lógico
router.delete("/:id", async (req, res) => {
  const genero = await Genero.findByIdAndUpdate(req.params.id, { estado: "Inactivo" }, { new: true });
  res.json(genero);
});

module.exports = router;
