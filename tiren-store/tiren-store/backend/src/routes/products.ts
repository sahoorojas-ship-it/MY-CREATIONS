import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, requireAdmin, AuthRequest } from '../middleware/auth';

const router = Router();
const prisma = new PrismaClient();

// GET all products with filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const {
      category, brand, search, minPrice, maxPrice,
      featured, bestSeller, newArrival, page = '1', limit = '20', sort = 'createdAt'
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const where: any = { isActive: true };

    if (category) where.category = { slug: category };
    if (brand) where.brand = { contains: brand, mode: 'insensitive' };
    if (featured === 'true') where.isFeatured = true;
    if (bestSeller === 'true') where.isBestSeller = true;
    if (newArrival === 'true') where.isNewArrival = true;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }
    if (minPrice || maxPrice) {
      where.basePrice = {};
      if (minPrice) where.basePrice.gte = parseFloat(minPrice as string);
      if (maxPrice) where.basePrice.lte = parseFloat(maxPrice as string);
    }

    const orderBy: any = sort === 'price_asc' ? { basePrice: 'asc' }
      : sort === 'price_desc' ? { basePrice: 'desc' }
      : { createdAt: 'desc' };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where, skip, take: parseInt(limit as string), orderBy,
        include: { category: { select: { name: true, slug: true } }, reviews: { select: { rating: true } } },
      }),
      prisma.product.count({ where }),
    ]);

    const productsWithRating = products.map(p => ({
      ...p,
      avgRating: p.reviews.length ? p.reviews.reduce((a, r) => a + r.rating, 0) / p.reviews.length : 0,
      reviewCount: p.reviews.length,
      reviews: undefined,
    }));

    res.json({ success: true, data: productsWithRating, total, page: parseInt(page as string), limit: parseInt(limit as string) });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch products' });
  }
});

// GET single product
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug: req.params.slug },
      include: {
        category: true,
        reviews: { include: { user: { select: { name: true, avatar: true } } }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    const avgRating = product.reviews.length
      ? product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length : 0;

    res.json({ success: true, data: { ...product, avgRating, reviewCount: product.reviews.length } });
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch product' });
  }
});

// POST create product (admin)
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, brand, description, categoryId, images, basePrice, discountPrice,
      discountPercent, stock, unit, weightOptions, tags, isFeatured, isBestSeller, isNewArrival } = req.body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const product = await prisma.product.create({
      data: { name, slug, brand, description, categoryId, images: images || [], basePrice, discountPrice,
        discountPercent, stock: stock || 0, unit: unit || 'kg', weightOptions, tags: tags || [],
        isFeatured: isFeatured || false, isBestSeller: isBestSeller || false, isNewArrival: isNewArrival || false },
    });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Failed to create product' });
  }
});

// PUT update product (admin)
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const product = await prisma.product.update({
      where: { id: req.params.id }, data: req.body,
    });
    res.json({ success: true, data: product });
  } catch {
    res.status(400).json({ success: false, message: 'Failed to update product' });
  }
});

// DELETE product (admin)
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    await prisma.product.update({ where: { id: req.params.id }, data: { isActive: false } });
    res.json({ success: true, message: 'Product deleted' });
  } catch {
    res.status(400).json({ success: false, message: 'Failed to delete product' });
  }
});

export default router;
