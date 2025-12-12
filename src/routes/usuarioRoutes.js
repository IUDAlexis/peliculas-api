const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuario");
const { verifyToken, requireRole } = require("../middlewares/auth");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gestión de usuarios con roles
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Listar usuarios (rol cualquier usuario autenticado)
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", verifyToken, async (req, res) => {
  const usuarios = await Usuario.find().select("nombre email estado rol createdAt updatedAt");
  res.json(usuarios);
});

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Obtener usuario por ID (rol cualquier usuario autenticado)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/:id", verifyToken, async (req, res) => {
  const usuario = await Usuario.findById(req.params.id).select("nombre email estado rol createdAt updatedAt");
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(usuario);
});

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear usuario (solo administrador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Crear usuarios (rol administrador)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password, rol]
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [administrador, docente]
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos inválidos
 */
router.post("/", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const { nombre, email, password, rol, estado } = req.body;
    if (!nombre || !email || !password || !rol) {
      return res.status(400).json({ message: "Campos requeridos: nombre, email, password, rol" });
    }

    // Validar estado si se proporciona
    if (estado && !["Activo", "Inactivo"].includes(estado)) {
      return res.status(400).json({ message: "Estado debe ser 'Activo' o 'Inactivo'" });
    }

    // Validar rol
    if (!["administrador", "docente"].includes(rol)) {
      return res.status(400).json({ message: "Rol debe ser 'administrador' o 'docente'" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const exists = await Usuario.findOne({ email: normalizedEmail });
    if (exists) return res.status(409).json({ message: "Email ya registrado" });
    const hashed = await bcrypt.hash(password, 10);
    const usuario = new Usuario({ nombre, email: normalizedEmail, password: hashed, rol, estado: estado || "Activo" });
    await usuario.save();
    res.status(201).json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado });
  } catch (err) {
    console.error("Error creando usuario:", err);
    res.status(500).json({ message: "Error al crear usuario", error: err.message });
  }
});

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Editar usuario (solo administrador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *                 enum: [administrador, docente]
 *               estado:
 *                 type: string
 *                 enum: [Activo, Inactivo]
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */
router.put("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  const { nombre, email, rol, estado, password } = req.body;
  const update = { nombre, rol, estado };
  if (email) update.email = email.trim().toLowerCase();
  if (password) {
    update.password = await bcrypt.hash(password, 10);
  }
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, update, { new: true });
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado });
});

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Marcar usuario como Inactivo (solo administrador)
 *     tags: [Usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario inactivado
 *       404:
 *         description: Usuario no encontrado
 */
router.delete("/:id", verifyToken, requireRole("administrador"), async (req, res) => {
  const usuario = await Usuario.findByIdAndUpdate(req.params.id, { estado: "Inactivo" }, { new: true });
  if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json({ id: usuario._id, estado: usuario.estado });
});

module.exports = router;
