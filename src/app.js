const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/v1/generos", require("./Routes/genero.routes"));
app.use("/api/v1/directores", require("./Routes/director.routes"));
app.use("/api/v1/productoras", require("./Routes/productora.routes"));
app.use("/api/v1/tipos", require("./Routes/tipo.routes"));
app.use("/api/v1/media", require("./Routes/media.routes"));


app.listen(4000, () => console.log("🚀 Servidor en http://localhost:4000"));
