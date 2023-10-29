import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entity/Product'; // Ajuste este caminho para o local correto da sua entidade Product

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
  // Your code to retrieve all products here
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID
 *     responses:
 *       200:
 *         description: A single product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/:id', async (req, res) => {
  const productId = Number(req.params.id);
  if (isNaN(productId)) {
    return res.status(400).json({ message: 'Invalid product ID' });
  }
  try {
    const product = await getRepository(Product).findOne(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.json({ product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while fetching the product' });
  }
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The product was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', async (req, res) => {
  const { description, price, quantity } = req.body;
  if (!description || !price || !quantity) {
    return res.status(400).json({ message: 'Invalid inputs' });
  }
  const product = new Product();
  product.description = description;
  product.price = price;
  product.quantity = quantity;
  await getRepository(Product).save(product);
  return res.status(201).json({ message: 'Product created', product });
});

export default router;