import fs from 'fs';
import yaml from 'js-yaml';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts'], // path to the API docs
};

const specs = swaggerJsdoc(swaggerOptions);

// Save the generated Swagger spec to a YML file
fs.writeFileSync('./swagger.yml', yaml.dump(specs));