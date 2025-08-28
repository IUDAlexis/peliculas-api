const express = require("express");
const Media = require("../models/Media");
const router = express.Router();

// GET todas
router.get("/", async (req, res) => {
  const media = await Media.find().populate("genero director productora tipo");
  res.json(media);
});

// GET por id
router.get("/:id", async (req, res) => {
  const media = await Media.findById(req.params.id).populate("genero director productora tipo");
  res.json(media);
});

// POST crear
router.post("/", async (req, res) => {
  const nuevaMedia = new Media(req.body);
  await nuevaMedia.save();
  res.json(nuevaMedia);
});

// PUT actualizar
router.put("/:id", async (req, res) => {
  const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(media);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Media.findByIdAndDelete(req.params.id);
  res.json({ message: "Eliminado correctamente" });
});

module.exports = router;
