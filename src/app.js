const express = require("express");
const cors = require("cors");
<<<<<<< HEAD
const connectDB = require("./database");

const app = express();
=======
require("dotenv").config();
const connectDB = require("./database");

const app = express();

// Conectar a MongoDB Atlas
>>>>>>> e0300e1 (Add .gitignore to exclude node_modules directory)
connectDB();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Rutas
app.use("/api/v1/generos", require("./Routes/genero.routes"));
app.use("/api/v1/directores", require("./Routes/director.routes"));
app.use("/api/v1/productoras", require("./Routes/productora.routes"));
app.use("/api/v1/tipos", require("./Routes/tipo.routes"));
app.use("/api/v1/media", require("./Routes/media.routes"));


app.listen(4000, () => console.log("🚀 Servidor en http://localhost:4000"));
=======
app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀 con MongoDB Atlas" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
>>>>>>> e0300e1 (Add .gitignore to exclude node_modules directory)
