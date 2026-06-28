import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Admin dashboard stats
router.get('/stats', authenticate, requireAdmin, async (_req: AuthRequest, res: Response) => {
  const [totalOrders, totalCustomers, totalProducts, revenueResult, pendingOrders, lowStockProducts] = await Promise.all([
    prisma.order.count(),
    prisma.user.count({ where: { role: 'CUSTOMER' } }),
    prisma.product.count({ where: { isActive: true } }),
    prisma.order.aggregate({ _sum: { total: true }, where: { paymentStatus: 'PAID' } }),
    prisma.order.count({ where: { status: 'PENDING' } }),
    prisma.product.count({ where: { stock: { lte: 10 }, isActive: true } }),
  ]);

  const recentOrders = await prisma.order.findMany({
    take: 10, orderBy: { createdAt: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

  const topProducts = await prisma.orderItem.groupBy({
    by: ['productId'], _sum: { quantity: true }, orderBy: { _sum: { quantity: 'desc' } }, take: 5,
  });

  const topProductDetails = await prisma.product.findMany({
    where: { id: { in: topProducts.map(p => p.productId) } },
    select: { id: true, name: true, images: true, basePrice: true },
  });

  res.json({
    success: true,
    data: {
      totalOrders, totalCustomers, totalProducts, pendingOrders, lowStockProducts,
      totalRevenue: revenueResult._sum.total || 0,
      recentOrders,
      topProducts: topProducts.map(tp => ({
        ...tp, product: topProductDetails.find(p => p.id === tp.productId),
      })),
    },
  });
});

// Admin order management
router.get('/orders', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  const { status, page = '1', limit = '20' } = req.query;
  const where: any = {};
  if (status) where.status = status;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where, skip: (parseInt(page as string) - 1) * 20, take: parseInt(limit as string),
      include: { user: { select: { name: true, email: true, phone: true } }, address: true, items: { include: { product: { select: { name: true } } } } },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ]);
  res.json({ success: true, data: orders, total });
});

router.patch('/orders/:id/status', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const order = await prisma.order.update({
    where: { id: req.params.id }, data: { status },
    include: { user: { select: { id: true, name: true } } },
  });
  await prisma.notification.create({
    data: {
      userId: order.userId, type: 'ORDER',
      title: `Order ${status}`, message: `Your order #${order.id.slice(-8).toUpperCase()} is now ${status.toLowerCase().replace('_', ' ')}.`,
    },
  });
  res.json({ success: true, data: order });
});

// Admin customer management
router.get('/customers', authenticate, requireAdmin, async (_req: AuthRequest, res: Response) => {
  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    select: { id: true, name: true, email: true, phone: true, createdAt: true, _count: { select: { orders: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ success: true, data: customers });
});

export default router;
