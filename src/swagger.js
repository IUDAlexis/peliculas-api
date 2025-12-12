const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Películas",
      version: "1.0.0",
      description: "API de ejemplo con autenticación JWT y Swagger"
    },
    servers: [
      { url: process.env.SWAGGER_SERVER_URL || "http://localhost:4000/api/v1" },
      { url: "http://localhost:4000" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"] // apunta a tus rutas y modelos
};

const swaggerSpec = swaggerJSDoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
