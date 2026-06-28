import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req: Request, res: Response) => {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: { _count: { select: { products: true } } },
  });
  res.json({ success: true, data: categories });
});

router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  const { name, icon, image, description } = req.body;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const cat = await prisma.category.create({ data: { name, slug, icon, image, description } });
  res.status(201).json({ success: true, data: cat });
});

router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  const cat = await prisma.category.update({ where: { id: req.params.id }, data: req.body });
  res.json({ success: true, data: cat });
});

router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  await prisma.category.update({ where: { id: req.params.id }, data: { isActive: false } });
  res.json({ success: true, message: 'Category deleted' });
});

export default router;
