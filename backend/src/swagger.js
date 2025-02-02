const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mobile App API",
      description: "API endpoints for mobile app on swagger",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js", "./src/routes/**/*.js"],
  requestInterceptor: function (request) {
    request.headers.Origin = `http://localhost:8000`;
    return request;
  },
  url: `http://localhost:8000/api-docs`,
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = swaggerDocs;
