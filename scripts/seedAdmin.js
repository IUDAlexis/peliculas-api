require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Usuario = require("../src/models/usuario");

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Falta MONGO_URI en .env");
    process.exit(1);
  }
  await mongoose.connect(uri);

  const usuarios = [
    {
      nombre: "Administrador",
      email: "admin@demo.com",
      password: "Admin123!",
      rol: "administrador",
      estado: "Activo",
    },
    {
      nombre: "Docente Test",
      email: "docente@test.com",
      password: "Docente123!",
      rol: "docente",
      estado: "Activo",
    },
  ];

  for (const userData of usuarios) {
    const existing = await Usuario.findOne({ email: userData.email });
    const samePass = existing ? await bcrypt.compare(userData.password, existing.password) : false;

    if (existing && samePass) {
      console.log(`✓ ${userData.email} ya existe con contraseña correcta`);
    } else if (existing && !samePass) {
      // Actualizar contraseña
      existing.password = await bcrypt.hash(userData.password, 10);
      existing.estado = userData.estado;
      existing.rol = userData.rol;
      await existing.save();
      console.log(`✓ ${userData.email} actualizado`, { password: userData.password });
    } else {
      // Crear nuevo
      const hashed = await bcrypt.hash(userData.password, 10);
      const usuario = new Usuario({
        nombre: userData.nombre,
        email: userData.email,
        password: hashed,
        rol: userData.rol,
        estado: userData.estado,
      });
      await usuario.save();
      console.log(`✓ ${userData.email} creado`, { password: userData.password });
    }
  }

  console.log("\n✅ Seed completado!");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
