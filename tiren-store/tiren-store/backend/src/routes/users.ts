import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, AuthRequest } from '../middleware/auth';

export const usersRouter = Router();
export const couponsRouter = Router();
export const paymentsRouter = Router();
export const reviewsRouter = Router();

const prisma = new PrismaClient();

// Users
usersRouter.get('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, name: true, email: true, phone: true, avatar: true, createdAt: true },
  });
  res.json({ success: true, data: user });
});

usersRouter.put('/profile', authenticate, async (req: AuthRequest, res: Response) => {
  const { name, avatar } = req.body;
  const user = await prisma.user.update({ where: { id: req.user!.id }, data: { name, avatar }, select: { id: true, name: true, email: true, phone: true, avatar: true } });
  res.json({ success: true, data: user });
});

usersRouter.get('/addresses', authenticate, async (req: AuthRequest, res: Response) => {
  const addresses = await prisma.address.findMany({ where: { userId: req.user!.id } });
  res.json({ success: true, data: addresses });
});

usersRouter.post('/addresses', authenticate, async (req: AuthRequest, res: Response) => {
  const { name, phone, line1, line2, city, state, pincode, isDefault } = req.body;
  if (isDefault) await prisma.address.updateMany({ where: { userId: req.user!.id }, data: { isDefault: false } });
  const address = await prisma.address.create({ data: { userId: req.user!.id, name, phone, line1, line2, city, state, pincode, isDefault: isDefault || false } });
  res.status(201).json({ success: true, data: address });
});

usersRouter.delete('/addresses/:id', authenticate, async (req: AuthRequest, res: Response) => {
  await prisma.address.delete({ where: { id: req.params.id } });
  res.json({ success: true, message: 'Address deleted' });
});

usersRouter.get('/wishlist', authenticate, async (req: AuthRequest, res: Response) => {
  const wishlist = await prisma.wishlist.findMany({
    where: { userId: req.user!.id },
    include: { product: { include: { category: { select: { name: true } } } } },
  });
  res.json({ success: true, data: wishlist });
});

usersRouter.post('/wishlist/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  const existing = await prisma.wishlist.findFirst({ where: { userId: req.user!.id, productId: req.params.productId } });
  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    return res.json({ success: true, message: 'Removed from wishlist', inWishlist: false });
  }
  await prisma.wishlist.create({ data: { userId: req.user!.id, productId: req.params.productId } });
  res.json({ success: true, message: 'Added to wishlist', inWishlist: true });
});

usersRouter.get('/notifications', authenticate, async (req: AuthRequest, res: Response) => {
  const notifications = await prisma.notification.findMany({ where: { userId: req.user!.id }, orderBy: { createdAt: 'desc' }, take: 20 });
  res.json({ success: true, data: notifications });
});

// Coupons
couponsRouter.post('/validate', authenticate, async (req: AuthRequest, res: Response) => {
  const { code, orderAmount } = req.body;
  const coupon = await prisma.coupon.findFirst({ where: { code, isActive: true } });
  if (!coupon) return res.status(404).json({ success: false, message: 'Invalid coupon code' });
  if (coupon.expiresAt && coupon.expiresAt < new Date()) return res.status(400).json({ success: false, message: 'Coupon expired' });
  if (coupon.minOrderAmount && orderAmount < Number(coupon.minOrderAmount)) {
    return res.status(400).json({ success: false, message: `Minimum order ₹${coupon.minOrderAmount} required` });
  }
  let discount = coupon.discountType === 'PERCENT' ? (orderAmount * Number(coupon.discountValue)) / 100 : Number(coupon.discountValue);
  if (coupon.maxDiscount) discount = Math.min(discount, Number(coupon.maxDiscount));
  res.json({ success: true, data: { coupon, discount } });
});

couponsRouter.get('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Admin only' });
  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ success: true, data: coupons });
});

couponsRouter.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  if (req.user?.role !== 'ADMIN') return res.status(403).json({ success: false, message: 'Admin only' });
  const coupon = await prisma.coupon.create({ data: req.body });
  res.status(201).json({ success: true, data: coupon });
});

// Reviews
reviewsRouter.post('/:productId', authenticate, async (req: AuthRequest, res: Response) => {
  const { rating, title, body } = req.body;
  const review = await prisma.review.create({ data: { userId: req.user!.id, productId: req.params.productId, rating, title, body } });
  res.status(201).json({ success: true, data: review });
});

// Payments
paymentsRouter.post('/razorpay/create', authenticate, async (req: AuthRequest, res: Response) => {
  const { amount } = req.body;
  // In production, use Razorpay SDK to create order
  const mockOrder = { id: `rzp_order_${Date.now()}`, amount: amount * 100, currency: 'INR' };
  res.json({ success: true, data: mockOrder });
});

paymentsRouter.post('/razorpay/verify', authenticate, async (req: AuthRequest, res: Response) => {
  const { orderId, razorpayPaymentId, razorpaySignature } = req.body;
  // In production, verify signature using Razorpay secret
  await prisma.order.update({ where: { id: orderId }, data: { paymentStatus: 'PAID', razorpayPayId: razorpayPaymentId } });
  res.json({ success: true, message: 'Payment verified' });
});
