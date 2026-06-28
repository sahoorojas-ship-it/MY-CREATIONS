import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// Place order
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { addressId, items, paymentMethod, couponCode, notes } = req.body;
    const userId = req.user!.id;

    // Calculate totals
    let subtotal = 0;
    const orderItems: any[] = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `${product?.name || 'Product'} out of stock` });
      }
      const price = Number(product.discountPrice || product.basePrice);
      const total = price * item.quantity;
      subtotal += total;
      orderItems.push({ productId: item.productId, quantity: item.quantity, weight: item.weight, price, total });
    }

    // Apply coupon
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findFirst({
        where: { code: couponCode, isActive: true, expiresAt: { gt: new Date() } },
      });
      if (coupon) {
        if (coupon.discountType === 'PERCENT') {
          discount = (subtotal * Number(coupon.discountValue)) / 100;
          if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
        } else {
          discount = Number(coupon.discountValue);
        }
        await prisma.coupon.update({ where: { id: coupon.id }, data: { usedCount: { increment: 1 } } });
      }
    }

    const deliveryCharge = subtotal >= 499 ? 0 : 40;
    const total = subtotal - discount + deliveryCharge;

    // Create order
    const order = await prisma.order.create({
      data: {
        userId, addressId, paymentMethod, couponCode, notes,
        subtotal, discount, deliveryCharge, total,
        items: { create: orderItems },
      },
      include: { items: { include: { product: true } }, address: true },
    });

    // Update stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Clear cart
    await prisma.cartItem.deleteMany({ where: { userId } });

    // Create notification
    await prisma.notification.create({
      data: { userId, title: 'Order Placed!', message: `Your order #${order.id.slice(-8).toUpperCase()} has been placed successfully.`, type: 'ORDER' },
    });

    res.status(201).json({ success: true, data: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to place order' });
  }
});

// Get user orders
router.get('/my', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user!.id },
      include: { items: { include: { product: { select: { name: true, images: true } } } }, address: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: orders });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  }
});

// Get single order
router.get('/:id', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const order = await prisma.order.findFirst({
      where: { id: req.params.id, userId: req.user!.id },
      include: {
        items: { include: { product: true } },
        address: true,
        payment: true,
      },
    });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  }
});

// Cancel order
router.patch('/:id/cancel', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const order = await prisma.order.findFirst({ where: { id: req.params.id, userId: req.user!.id } });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      return res.status(400).json({ success: false, message: 'Order cannot be cancelled' });
    }

    await prisma.order.update({ where: { id: req.params.id }, data: { status: 'CANCELLED' } });
    res.json({ success: true, message: 'Order cancelled successfully' });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to cancel order' });
  }
});

export default router;
