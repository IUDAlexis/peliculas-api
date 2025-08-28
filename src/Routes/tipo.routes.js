const express = require("express");
const Director = require("../models/director");
const router = express.Router();

// GET todos
router.get("/", async (req, res) => {
  const tipos = await Tipo.find();
  res.json(tipos);
});

// GET por id
router.get("/:id", async (req, res) => {
  const tipo = await Tipo.findById(req.params.id);
  if (!tipo) {
    return res.status(404).json({ message: "Tipo no encontrado" });
  }
  res.json(tipo);
});

// POST crear
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

// PUT actualizar
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

// DELETE lógico
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


module.exports = router;
