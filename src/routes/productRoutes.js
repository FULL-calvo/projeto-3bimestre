
import express from 'express';
import prisma from '../db.js';
const router = express.Router();

// Criar produto
router.post('/', async (req, res) => {
  try {
    const { name, price, storeId } = req.body;
    const product = await prisma.product.create({
      data: { name, price, storeId }
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// Buscar todos produtos (com loja e usuário)
router.get('/', async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        store: {
          include: {
            user: true
          }
        }
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
});

// Atualizar produto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price }
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
});

// Remover produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Produto removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover produto' });
  }
});

export default router;
