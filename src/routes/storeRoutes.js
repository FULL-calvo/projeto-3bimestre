import express from 'express';
import prisma from '../db.js';
const router = express.Router();

// Criar loja
router.post('/', async (req, res) => {
  try {
    const { name, userId } = req.body;
    const store = await prisma.store.create({
      data: { name, userId }
    });
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar loja' });
  }
});

// Buscar loja por ID (com usuário e produtos)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const store = await prisma.store.findUnique({
      where: { id: Number(id) },
      include: {
        user: true,
        products: true
      }
    });
    if (!store) return res.status(404).json({ error: 'Loja não encontrada' });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar loja' });
  }
});

// Atualizar loja
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const store = await prisma.store.update({
      where: { id: Number(id) },
      data: { name }
    });
    res.json(store);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar loja' });
  }
});

// Remover loja
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.store.delete({
      where: { id: Number(id) }
    });
    res.json({ message: 'Loja removida com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover loja' });
  }
});

export default router;
