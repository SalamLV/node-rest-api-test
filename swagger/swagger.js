const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Receipt API",
    description: "API created for Node.js learning purpose",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger/swagger-output.json";
const endpointsFiles = ["app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
