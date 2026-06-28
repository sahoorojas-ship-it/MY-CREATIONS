# 🛒 TIREN STORE — Full-Stack Grocery eCommerce App

> "Freshness You Can Trust" — Online Grocery & Ration Store

A complete, production-ready full-stack eCommerce application for selling grocery and household essentials (atta, rice, dal, oil, spices, snacks, soaps, detergents, etc.)

---

## 📁 Project Structure

```
tiren-store/
├── frontend/                 # Next.js 14 + React + TypeScript
│   ├── src/
│   │   ├── pages/            # Routes (Home, Products, Checkout, Dashboard, Admin)
│   │   ├── components/       # Layout, Product, Cart, Admin components
│   │   ├── store/            # Redux Toolkit slices (auth, cart, products, ui)
│   │   ├── utils/            # API client
│   │   └── data/             # Mock data (demo mode)
│   ├── Dockerfile
│   └── package.json
│
├── backend/                  # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── routes/           # auth, products, orders, cart, admin, coupons...
│   │   └── middleware/       # JWT authentication
│   ├── prisma/
│   │   ├── schema.prisma     # Full DB schema (10 tables)
│   │   └── seed.ts           # Sample data seeder
│   ├── Dockerfile
│   └── package.json
│
└── docker-compose.yml         # One-command full-stack deployment
```

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
cd tiren-store
docker-compose up -d
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: localhost:5432

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
npm install
cp .env.example .env       # Edit DATABASE_URL etc.
npx prisma migrate dev     # Creates tables
npm run db:seed            # Adds sample data + admin user
npm run dev                # Starts on :5000
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev                # Starts on :3000
```

---

## 🔑 Demo Credentials

| Role | Login |
|------|-------|
| **Admin** | Click "Demo: Login as Admin" on the login page, or use `admin@tirenstore.com` / `Admin@123` after seeding |
| **Customer** | Any email/password or mobile OTP (use `123456` as demo OTP) |

---

## 🎨 Features Implemented

### Customer-Facing
- ✅ Home page: banners, categories, featured/best-seller/new-arrival sections
- ✅ Product search, category/brand/price filters
- ✅ Product detail pages with weight options, reviews, ratings
- ✅ Cart sidebar (persisted to localStorage)
- ✅ Checkout: address form, coupon codes, COD/UPI/Card payment selection
- ✅ Customer dashboard: order history, order tracking timeline
- ✅ Auth: Email/password login, Mobile OTP login, Register
- ✅ Dark mode toggle (persisted)
- ✅ Fully responsive (mobile, tablet, desktop)

### Admin Panel
- ✅ Dashboard: revenue, orders, customers, pending orders, low-stock alerts
- ✅ Product management table (search, filter, edit, delete, stock toggle)
- ✅ Recent orders table with status badges
- ✅ Order status pipeline visualization

### Backend API (Production-Ready Structure)
- ✅ JWT authentication with bcrypt password hashing
- ✅ RESTful endpoints: `/auth`, `/products`, `/categories`, `/cart`, `/orders`, `/users`, `/admin`, `/coupons`, `/payments`, `/reviews`
- ✅ Prisma ORM with full PostgreSQL schema (Users, Products, Categories, Orders, OrderItems, Addresses, Coupons, Payments, Reviews, Wishlist, CartItem, Notifications)
- ✅ Rate limiting, Helmet security headers, CORS
- ✅ Zod input validation
- ✅ Stock management on order placement
- ✅ Coupon validation logic

---

## 🗄️ Database Schema (Prisma)

10 core tables: `users`, `categories`, `products`, `addresses`, `orders`, `order_items`, `payments`, `coupons`, `reviews`, `wishlists`, `cart_items`, `notifications`

Run `npx prisma studio` from `/backend` to visually browse the database.

---

## 📡 API Documentation (Summary)

| Method | Endpoint | Description | Auth |
|--------|----------|--------------|------|
| POST | `/api/auth/register` | Register with email/password | No |
| POST | `/api/auth/login` | Login | No |
| POST | `/api/auth/send-otp` | Send mobile OTP | No |
| POST | `/api/auth/verify-otp` | Verify OTP & login | No |
| GET | `/api/products` | List products (filters: category, brand, search, price) | No |
| GET | `/api/products/:slug` | Product detail | No |
| POST | `/api/products` | Create product | Admin |
| GET | `/api/categories` | List categories | No |
| GET | `/api/cart` | Get cart | Yes |
| POST | `/api/cart` | Add to cart | Yes |
| POST | `/api/orders` | Place order | Yes |
| GET | `/api/orders/my` | My orders | Yes |
| PATCH | `/api/orders/:id/cancel` | Cancel order | Yes |
| GET | `/api/admin/stats` | Dashboard stats | Admin |
| GET | `/api/admin/orders` | All orders | Admin |
| PATCH | `/api/admin/orders/:id/status` | Update order status | Admin |
| POST | `/api/coupons/validate` | Validate coupon | Yes |
| POST | `/api/payments/razorpay/create` | Create Razorpay order | Yes |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Next.js 14, TypeScript, Tailwind CSS, Redux Toolkit |
| Backend | Node.js, Express.js, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| Auth | JWT, bcrypt, Mobile OTP |
| Payments | Razorpay, UPI, COD |
| Deployment | Docker, Docker Compose |

---

## 🚢 Production Deployment Guide

1. **Database**: Provision managed PostgreSQL (e.g. Supabase, Neon, RDS, Railway)
2. **Backend**: Deploy to Railway/Render/Fly.io or your own VM via Docker. Set all `.env` vars from `.env.example`.
3. **Frontend**: Deploy to Vercel (recommended for Next.js) — set `NEXT_PUBLIC_API_URL` to your backend's public URL.
4. **Payments**: Replace mock Razorpay calls in `backend/src/routes/users.ts` with real Razorpay SDK calls using your live keys.
5. **SMS OTP**: Integrate Twilio or MSG91 in `backend/src/routes/auth.ts` (currently mocked with console.log).
6. **File uploads**: Configure cloud storage (S3/Cloudinary) for product images instead of local `/uploads`.
7. **SSL**: Use a reverse proxy (Nginx/Caddy) or your hosting provider's built-in HTTPS.

---

## 📝 Notes on This Build

The frontend currently runs in **demo mode** using mock data (`src/data/mockData.ts`) and local Redux state so you can explore the full UI/UX immediately without running the backend. The `api.ts` utility and all backend routes are fully built and ready — swap the mock data calls for `productsAPI`, `ordersAPI`, etc. calls to go fully live with the database.

---

Built with ❤️ for **TIREN STORE** — Freshness You Can Trust 🌿
