import __dirname from "../../utils.js";

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "EVOLUCION VERDE API",
        description: "Documentation of Evolución Verde API",
      },
    },
    apis: [__dirname + "/src/docs/*.yaml"],
  };
  
  export default options;