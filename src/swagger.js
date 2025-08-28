// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Películas",
      version: "1.0.0",
      description: "CRUD de Media, Generos, Directores, Productoras y Tipos",
    },
    servers: [
      {
        url: "http://localhost:4000/api/v1",
      },
    ],
  },
  apis: ["./src/Routes/*.js", "./src/models/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
