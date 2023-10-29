import express from 'express';
import { createConnection } from 'typeorm';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import productRoutes from './routes/Product';

const app = express();
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product API',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.ts', './src/swagger/*.yml'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

createConnection().then(async connection => {
  app.use('/products', productRoutes);

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}).catch(error => console.log(error));