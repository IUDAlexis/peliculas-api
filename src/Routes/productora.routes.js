const express = require("express");
const Productora = require("../models/productora");
const router = express.Router();

// GET todas las productoras
router.get("/", async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por id
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

// POST crear
router.post("/", async (req, res) => {
  try {
    const nuevaProductora = new Productora(req.body);
    await nuevaProductora.save();
    res.status(201).json(nuevaProductora);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT actualizar
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

// DELETE eliminar
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
