const express = require("express");
const Director = require("../models/director");
const router = express.Router();

// GET todos
router.get("/", async (req, res) => {
  const directores = await Director.find();
  res.json(directores);
});

// GET por id
router.get("/:id", async (req, res) => {
  const director = await Director.findById(req.params.id);
  if (!director) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  res.json(director);
});

// POST crear
router.post("/", async (req, res) => {
  try {
    const nuevoDirector = new Director(req.body);
    await nuevoDirector.save();
    res.json(nuevoDirector);
  } catch (error) {
    console.error("Error al crear director:", error);
    res.status(500).json({ message: "Error al crear director" });
  }
});

// PUT actualizar
router.put("/:id", async (req, res) => {
  const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!director) {
    return res.status(404).json({ message: "Director no encontrado" });
  }
  res.json(director);
});

// DELETE lógico
router.delete("/:id", async (req, res) => {
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
