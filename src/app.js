const express = require("express");
const cors = require("cors");
require("dotenv").config();

const swaggerDocs = require("./swagger");

// Rutas
const mediaRoutes = require("./routes/mediaRoutes");
const generoRoutes = require("./routes/generoRoutes");
const directorRoutes = require("./routes/directorRoutes");
const productoraRoutes = require("./routes/productoraRoutes");
const tipoRoutes = require("./routes/tipoRoutes");
const authRoutes = require("./routes/authRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

// Inicializar aplicación
const app = express();

// Conectar a MongoDB Atlas
require("./database");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());

// Swagger configuración
swaggerDocs(app);

// Ruta raíz (prueba de conexión)
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀 con MongoDB Atlas" });
});

// Rutas de la API
app.use("/api/v1/generos", generoRoutes);
app.use("/api/v1/directores", directorRoutes);
app.use("/api/v1/productoras", productoraRoutes);
app.use("/api/v1/tipos", tipoRoutes);
app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/usuarios", usuarioRoutes);

// Alias sin versión para compatibilidad (requiere token igualmente)
app.use("/generos", generoRoutes);
app.use("/directores", directorRoutes);
app.use("/productoras", productoraRoutes);
app.use("/tipos", tipoRoutes);
app.use("/media", mediaRoutes);
app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
