import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || 'tiren-store-secret-key';
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(6),
});

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const data = registerSchema.parse(req.body);
    if (!data.email && !data.phone) {
      return res.status(400).json({ success: false, message: 'Email or phone required' });
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] },
    });
    if (existing) return res.status(409).json({ success: false, message: 'User already exists' });

    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: { name: data.name, email: data.email, phone: data.phone, passwordHash, isVerified: true },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.status(201).json({ success: true, data: { user, token } });
  } catch (err) {
    res.status(400).json({ success: false, message: err instanceof z.ZodError ? err.errors : 'Registration failed' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findFirst({
      where: { OR: [{ email: data.email }, { phone: data.phone }] },
    });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
        token,
      },
    });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Login failed' });
  }
});

// Send OTP (mock)
router.post('/send-otp', async (req: Request, res: Response) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ success: false, message: 'Phone required' });
  // In production, use Twilio or MSG91 here
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP for ${phone}: ${otp}`); // Store in Redis in production
  res.json({ success: true, message: 'OTP sent', devOtp: otp });
});

// Verify OTP (mock)
router.post('/verify-otp', async (req: Request, res: Response) => {
  const { phone, otp, name } = req.body;
  if (!phone || !otp) return res.status(400).json({ success: false, message: 'Phone and OTP required' });
  // In production, verify against Redis stored OTP
  // Mock: accept any 6-digit OTP

  let user = await prisma.user.findUnique({ where: { phone } });
  if (!user) {
    user = await prisma.user.create({
      data: { name: name || 'User', phone, isVerified: true },
    });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  res.json({ success: true, data: { user: { id: user.id, name: user.name, phone: user.phone, role: user.role }, token } });
});

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, phone: true, role: true, avatar: true, createdAt: true },
    });
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

export default router;
