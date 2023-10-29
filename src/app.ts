import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { createConnection } from 'typeorm';
import productRoutes from './routes/Product'; 
import { swaggerOptions } from './config/swagger'; 
import './data-source'; 
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

createConnection().then(async connection => {
  app.use('/products', productRoutes);

  const specs = swaggerJsdoc(swaggerOptions);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.get('/', (req, res) => res.send('Product API'));

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}).catch(error => console.log(error));