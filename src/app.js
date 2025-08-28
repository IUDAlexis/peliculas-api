const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Conectar a MongoDB Atlas
require("./database");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API funcionando 🚀 con MongoDB Atlas" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
