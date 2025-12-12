const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  try {
    const header = req.headers["authorization"];
    if (!header) return res.status(401).json({ message: "Token requerido" });

    const parts = header.split(" ");
    const token = parts.length === 2 && parts[0] === "Bearer" ? parts[1] : header;

    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    if (!process.env.JWT_SECRET) {
      console.error("Falta JWT_SECRET");
      return res.status(500).json({ message: "Error interno de configuración" });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "No autenticado" });
    if (!roles.includes(req.user.rol)) return res.status(403).json({ message: "Acceso denegado" });
    next();
  };
}

module.exports = { verifyToken, requireRole };
