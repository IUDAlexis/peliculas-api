const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const { verifyToken, requireRole } = require("../middlewares/auth");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Autenticación y manejo de usuarios
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     description: No requiere autenticación. Retorna JWT token (login público)
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login exitoso. Retorna token JWT
 *       400:
 *         description: Datos faltantes
 *       401:
 *         description: Credenciales inválidas
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("[LOGIN] Intento con email:", email ? email.trim().toLowerCase() : "NO ENVIADO");
    if (!email || !password) return res.status(400).json({ message: "Email y contraseña son requeridos" });

    const normalizedEmail = email.trim().toLowerCase();
    console.log("[LOGIN] Buscando usuario:", normalizedEmail);
    const user = await Usuario.findOne({ email: normalizedEmail });
    if (!user) {
      console.log("[LOGIN] Usuario NO encontrado:", normalizedEmail);
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    console.log("[LOGIN] Usuario encontrado:", user.email, "| Rol:", user.rol, "| Estado:", user.estado);
    if (user.estado === "Inactivo") return res.status(403).json({ message: "Usuario inactivo" });

    const ok = await bcrypt.compare(password, user.password);
    console.log("[LOGIN] Contraseña correcta:", ok);
    if (!ok) return res.status(401).json({ message: "Credenciales inválidas" });

    if (!process.env.JWT_SECRET) {
      console.error("Falta JWT_SECRET");
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    const payload = { uid: user._id.toString(), email: user.email, rol: user.rol, nombre: user.nombre };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "8h"} );

    return res.json({ token, user: payload });
  } catch (err) {
    console.error("Error /login:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

/**
 * @swagger
 * /auth/usuarios:
 *   post:
 *     summary: Crear usuario (administrador)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     description: Requiere autenticación. Permisos - Crear usuarios (rol administrador)
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password, rol]
 *             properties:
 *               nombre: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *               rol: 
 *                 type: string
 *                 enum: ["administrador", "docente"]
 *               estado: 
 *                 type: string
 *                 enum: ["Activo", "Inactivo"]
 *                 default: "Activo"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos o campos requeridos
 *       409:
 *         description: Email ya registrado
 */
router.post("/usuarios", verifyToken, requireRole("administrador"), async (req, res) => {
  try {
    const { nombre, email, password, rol, estado } = req.body;
    if (!nombre || !email || !password || !rol) return res.status(400).json({ message: "Campos requeridos: nombre, email, password, rol" });

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

    return res.status(201).json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol, estado: usuario.estado });
  } catch (err) {
    console.error("Error /usuarios:", err);
    return res.status(500).json({ message: "Error interno del servidor", error: err.message });
  }
});

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Obtener usuario logueado
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Datos del usuario autenticado
 */
router.get("/me", verifyToken, (req, res) => {
  return res.json({ user: req.user });
});

module.exports = router;
