import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import Link from 'next/link';
import { PRODUCTS, CATEGORIES, BANNERS, COUPONS } from '../data/mockData';

export default function Home() {
  const [bannerIdx, setBannerIdx] = useState(0);
  const featured = PRODUCTS.filter(p => p.isFeatured);
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller);
  const newArrivals = PRODUCTS.filter(p => p.isNewArrival);

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const banner = BANNERS[bannerIdx];

  return (
    <Layout>
      {/* Hero Banner */}
      <section className={`bg-gradient-to-r ${banner.bg} text-white py-12 px-4 transition-all duration-700`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="animate-fade-in">
            <p className="text-green-200 font-medium text-sm mb-1">🏪 TIREN STORE — Freshness You Can Trust</p>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-2">{banner.title}</h1>
            <p className="text-lg text-white/90 mb-1">{banner.subtitle}</p>
            <div className="inline-block bg-white/20 backdrop-blur rounded-full px-4 py-1 text-sm font-bold mb-6">{banner.discount}</div>
            <div className="flex gap-3">
              <Link href="/products" className="px-6 py-3 bg-white text-green-800 font-bold rounded-xl hover:bg-gray-100 transition-colors">
                Shop Now →
              </Link>
              <Link href="/products?featured=true" className="px-6 py-3 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
                View Offers
              </Link>
            </div>
          </div>
          <div className="text-8xl hidden md:block">{banner.image}</div>
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {BANNERS.map((_, i) => (
            <button key={i} onClick={() => setBannerIdx(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === bannerIdx ? 'bg-white w-6' : 'bg-white/40'}`} />
          ))}
        </div>
      </section>

      {/* Info Strip */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🚚', title: 'Free Delivery', sub: 'On orders above ₹499' },
            { icon: '✅', title: 'Quality Assured', sub: 'Branded products only' },
            { icon: '💳', title: 'Secure Payments', sub: 'UPI, Cards, COD' },
            { icon: '🔄', title: 'Easy Returns', sub: '7-day return policy' },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-sm text-gray-900 dark:text-white">{item.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">

        {/* Categories */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shop by Category</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Find your daily essentials</p>
            </div>
            <Link href="/products" className="text-green-700 dark:text-green-400 font-medium text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
            {CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/products?category=${cat.slug}`}
                className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-green-400 hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center leading-tight">{cat.name}</span>
                <span className="text-xs text-gray-400">{cat.count} items</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Coupons */}
        <section className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🏷️ Available Coupons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COUPONS.map(c => (
              <div key={c.code} className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-dashed border-orange-300 dark:border-orange-700 flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-xl">🎟️</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <code className="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-400 font-bold text-sm px-2 py-0.5 rounded">{c.code}</code>
                    <span className="font-bold text-green-700 dark:text-green-400">{c.discount} OFF</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.description} • Min: {c.minOrder}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Featured Products</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Handpicked for you</p>
            </div>
            <Link href="/products?featured=true" className="text-green-700 dark:text-green-400 font-medium text-sm hover:underline">See All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featured.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Best Sellers */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 Best Sellers</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Most ordered by customers</p>
            </div>
            <Link href="/products?bestSeller=true" className="text-green-700 dark:text-green-400 font-medium text-sm hover:underline">See All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bestSellers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Promo Banner */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-8 text-white flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium mb-1">Special Offer</p>
              <h3 className="text-2xl font-bold mb-2">Buy 2 Kg Atta</h3>
              <p className="text-green-200 text-sm mb-4">Get 500g free with Aashirvaad & Fortune</p>
              <Link href="/products?category=atta-flour" className="px-5 py-2 bg-white text-green-800 font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors inline-block">
                Shop Atta →
              </Link>
            </div>
            <span className="text-7xl">🌾</span>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-8 text-white flex items-center justify-between">
            <div>
              <p className="text-orange-200 text-sm font-medium mb-1">Weekend Deal</p>
              <h3 className="text-2xl font-bold mb-2">Snacks Combo</h3>
              <p className="text-orange-100 text-sm mb-4">Chips + Biscuits + Noodles bundle</p>
              <Link href="/products?category=snacks-chips" className="px-5 py-2 bg-white text-orange-700 font-bold rounded-lg text-sm hover:bg-gray-100 transition-colors inline-block">
                Shop Snacks →
              </Link>
            </div>
            <span className="text-7xl">🍪</span>
          </div>
        </section>

        {/* New Arrivals */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">✨ New Arrivals</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Just stocked in our store</p>
            </div>
            <Link href="/products?newArrival=true" className="text-green-700 dark:text-green-400 font-medium text-sm hover:underline">See All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newArrivals.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* All Products */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🛒 All Products</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your complete grocery store</p>
            </div>
            <Link href="/products" className="text-green-700 dark:text-green-400 font-medium text-sm hover:underline">View All {PRODUCTS.length} →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">Why Choose TIREN STORE?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏷️', title: 'Best Prices', desc: 'Competitive pricing on all branded products' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Same-day & next-day delivery available' },
              { icon: '🔒', title: '100% Secure', desc: 'Safe payments & encrypted data' },
              { icon: '⭐', title: 'Quality Products', desc: 'Only trusted brands and products' },
            ].map(item => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
