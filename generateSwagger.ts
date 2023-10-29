import fs from 'fs';
import yaml from 'js-yaml';
import swaggerJsdoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

const specs = swaggerJsdoc(swaggerOptions);

// Save the generated Swagger spec to a YML file
fs.writeFileSync('./swagger.yml', yaml.dump(specs));