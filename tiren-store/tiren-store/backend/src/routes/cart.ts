// cart.ts
import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  const items = await prisma.cartItem.findMany({
    where: { userId: req.user!.id },
    include: { product: { include: { category: { select: { name: true } } } } },
  });
  res.json({ success: true, data: items });
});

router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { productId, quantity = 1, weight } = req.body;
  const existing = await prisma.cartItem.findFirst({ where: { userId: req.user!.id, productId, weight } });
  if (existing) {
    const item = await prisma.cartItem.update({ where: { id: existing.id }, data: { quantity: existing.quantity + quantity } });
    return res.json({ success: true, data: item });
  }
  const item = await prisma.cartItem.create({ data: { userId: req.user!.id, productId, quantity, weight } });
  res.status(201).json({ success: true, data: item });
});

router.put('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    await prisma.cartItem.delete({ where: { id: req.params.id } });
    return res.json({ success: true, message: 'Item removed' });
  }
  const item = await prisma.cartItem.update({ where: { id: req.params.id }, data: { quantity } });
  res.json({ success: true, data: item });
});

router.delete('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  await prisma.cartItem.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Item removed' });
});

router.delete('/', authenticate, async (req: AuthRequest, res: Response) => {
  await prisma.cartItem.deleteMany({ where: { userId: req.user!.id } });
  res.json({ success: true, message: 'Cart cleared' });
});

export default router;
