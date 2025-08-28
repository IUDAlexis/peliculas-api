const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Inicializar aplicación
const app = express();

// Conectar a MongoDB Atlas
require("./database");

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta raíz (prueba de conexión)
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀 con MongoDB Atlas" });
});

// Rutas de la API
// app.use("/api/v1/generos", require("./routes/genero.routes"));
// app.use("/api/v1/directores", require("./routes/director.routes"));
// app.use("/api/v1/productoras", require("./routes/productora.routes"));
// app.use("/api/v1/tipos", require("./routes/tipo.routes"));
app.use("/api/v1/media", require("./Routes/media.routes"));

// Configuración del puerto y arranque del servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
