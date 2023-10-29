import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Product } from '../entity/Product';

const router = Router();

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
  return res.status(201).json({ message: 'Product registered' });
});

router.get('/:id', async (req, res) => {
  const product = await getRepository(Product).findOne(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.json({ product });
});

router.get('/description/:description', async (req, res) => {
  const products = await getRepository(Product)
    .createQueryBuilder('product')
    .where('product.description LIKE :description', { description: `%${req.params.description}%` })
    .getMany();
  return res.json({ products });
});

export default router;