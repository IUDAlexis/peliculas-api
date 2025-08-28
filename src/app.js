const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Rutas
const mediaRoutes = require("./Routes/media.routes");
const generoRoutes = require("./Routes/genero.routes");
const directorRoutes = require("./Routes/director.routes");
const productoraRoutes = require("./Routes/productora.routes");
const tipoRoutes = require("./Routes/tipo.routes");

// Swagger
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Inicializar aplicación
const app = express();

// Conectar a MongoDB Atlas
require("./database");

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger configuración
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Películas",
      version: "1.0.0",
      description: "CRUD de Media, Géneros, Directores, Productoras y Tipos",
    },
    servers: [
      { url: "http://localhost:4001/api/v1" }
    ],
  },
  apis: ["./Routes/*.js"], // 👈 apunta a tus rutas
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
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
