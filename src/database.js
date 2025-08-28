const mongoose = require("mongoose");

const connectDB = async () => {
  try {
<<<<<<< HEAD
    await mongoose.connect("mongodb://localhost:27017/peliculas_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error en la conexión:", err);
=======
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (err) {
    console.error("❌ Error de conexión:", err.message);
    process.exit(1);
>>>>>>> e0300e1 (Add .gitignore to exclude node_modules directory)
  }
};

module.exports = connectDB;
