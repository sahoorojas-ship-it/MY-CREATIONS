import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const categories = [
  { name: 'Atta & Flour', slug: 'atta-flour', icon: '🌾' },
  { name: 'Rice', slug: 'rice', icon: '🍚' },
  { name: 'Dal & Pulses', slug: 'dal-pulses', icon: '🫘' },
  { name: 'Oil & Ghee', slug: 'oil-ghee', icon: '🫙' },
  { name: 'Salt & Sugar', slug: 'salt-sugar', icon: '🧂' },
  { name: 'Masala & Spices', slug: 'masala-spices', icon: '🌶️' },
  { name: 'Tea & Coffee', slug: 'tea-coffee', icon: '☕' },
  { name: 'Snacks & Chips', slug: 'snacks-chips', icon: '🥨' },
  { name: 'Biscuits & Cookies', slug: 'biscuits', icon: '🍪' },
  { name: 'Noodles & Pasta', slug: 'noodles-pasta', icon: '🍜' },
  { name: 'Soap & Bath', slug: 'soap-bath', icon: '🧼' },
  { name: 'Shampoo & Hair Care', slug: 'shampoo-hair', icon: '🧴' },
  { name: 'Detergents', slug: 'detergents', icon: '🫧' },
];

async function main() {
  console.log('🌱 Seeding TIREN STORE database...');

  // Admin user
  const adminPass = await bcrypt.hash('Admin@123', 12);
  await prisma.user.upsert({
    where: { email: 'admin@tirenstore.com' },
    update: {},
    create: { name: 'Store Admin', email: 'admin@tirenstore.com', passwordHash: adminPass, role: 'ADMIN', isVerified: true },
  });

  // Categories
  for (const cat of categories) {
    await prisma.category.upsert({ where: { slug: cat.slug }, update: {}, create: cat });
  }

  // Sample products
  const attaCategory = await prisma.category.findUnique({ where: { slug: 'atta-flour' } });
  const riceCategory = await prisma.category.findUnique({ where: { slug: 'rice' } });

  if (attaCategory) {
    await prisma.product.upsert({
      where: { slug: 'aashirvaad-atta-5kg' },
      update: {},
      create: {
        name: 'Aashirvaad Atta', slug: 'aashirvaad-atta-5kg', brand: 'Aashirvaad',
        description: 'Premium chakki fresh atta made from 100% whole wheat grains.',
        categoryId: attaCategory.id, images: ['/images/atta.jpg'],
        basePrice: 340, discountPrice: 280, discountPercent: 18, stock: 50, unit: 'kg',
        weightOptions: ['5kg', '10kg', '20kg'], tags: ['atta', 'flour'], isFeatured: true, isBestSeller: true,
      },
    });
  }

  if (riceCategory) {
    await prisma.product.upsert({
      where: { slug: 'india-gate-basmati-rice' },
      update: {},
      create: {
        name: 'India Gate Basmati Rice', slug: 'india-gate-basmati-rice', brand: 'India Gate',
        description: 'Premium long grain basmati rice with rich aroma.',
        categoryId: riceCategory.id, images: ['/images/rice.jpg'],
        basePrice: 450, discountPrice: 390, discountPercent: 13, stock: 30, unit: 'kg',
        weightOptions: ['1kg', '5kg', '10kg'], tags: ['rice', 'basmati'], isFeatured: true, isBestSeller: true,
      },
    });
  }

  // Coupons
  await prisma.coupon.upsert({
    where: { code: 'FIRST50' }, update: {},
    create: { code: 'FIRST50', description: '50% off on first order', discountType: 'PERCENT', discountValue: 50, minOrderAmount: 200, maxDiscount: 150, expiresAt: new Date('2026-12-31') },
  });
  await prisma.coupon.upsert({
    where: { code: 'TIREN10' }, update: {},
    create: { code: 'TIREN10', description: '10% off on all orders', discountType: 'PERCENT', discountValue: 10, minOrderAmount: 300, maxDiscount: 100, expiresAt: new Date('2026-12-31') },
  });

  console.log('✅ Seed completed!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
