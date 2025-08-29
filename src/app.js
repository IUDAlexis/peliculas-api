const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { swaggerUi, swaggerSpec } = require("./swagger");

// Rutas
const mediaRoutes = require("./routes/media.routes");
const generoRoutes = require("./routes/genero.routes");
const directorRoutes = require("./routes/director.routes");
const productoraRoutes = require("./routes/productora.routes");
const tipoRoutes = require("./routes/tipo.routes");

// Inicializar aplicación
const app = express();

// Conectar a MongoDB Atlas
require("./database");

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger configuración

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📄 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
