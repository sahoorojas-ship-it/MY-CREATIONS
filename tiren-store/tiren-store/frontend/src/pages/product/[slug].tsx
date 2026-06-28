import { useRouter } from 'next/router';
import { useState } from 'react';
import Layout from '../../components/layout/Layout';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { PRODUCTS } from '../../data/mockData';
import toast from 'react-hot-toast';
import Link from 'next/link';
import ProductCard from '../../components/product/ProductCard';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();

  const product = PRODUCTS.find(p => p.slug === slug);
  const [selectedWeight, setSelectedWeight] = useState(product?.weightOptions?.[0] || '');
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc'|'reviews'>('desc');

  if (!product) return (
    <Layout><div className="flex items-center justify-center py-40 text-gray-400">
      <div className="text-center"><div className="text-6xl mb-4">😕</div><p className="text-xl font-medium">Product not found</p>
        <Link href="/products" className="mt-4 inline-block px-6 py-2 bg-green-700 text-white rounded-lg">Browse Products</Link></div>
    </div></Layout>
  );

  const price = product.discountPrice || product.basePrice;
  const stars = Math.round(product.avgRating);
  const related = PRODUCTS.filter(p => p.category.slug === product.category.slug && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (product.stock === 0) return toast.error('Out of stock');
    dispatch(addToCart({ id: `${product.id}-${Date.now()}`, productId: product.id, name: product.name, brand: product.brand, image: product.images[0] || '', price: product.basePrice, discountPrice: product.discountPrice, quantity: qty, weight: selectedWeight, stock: product.stock, category: product.category.name }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-green-700">Home</Link> /
          <Link href="/products" className="hover:text-green-700">Products</Link> /
          <Link href={`/products?category=${product.category.slug}`} className="hover:text-green-700">{product.category.name}</Link> /
          <span className="text-gray-900 dark:text-white">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-700 mb-4">
              {product.images[imgIdx] ? (
                <img src={product.images[imgIdx]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🛍️</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${i === imgIdx ? 'border-green-600' : 'border-gray-200 dark:border-gray-600'}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex gap-2 mb-3">
              {product.isBestSeller && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Best Seller</span>}
              {product.isNewArrival && <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New Arrival</span>}
              {product.stock === 0 && <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Out of Stock</span>}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">{product.brand}</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">
                {[1,2,3,4,5].map(s => <span key={s} className={`text-lg ${s <= stars ? 'star-filled' : 'star-empty'}`}>★</span>)}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.avgRating.toFixed(1)}</span>
              <span className="text-sm text-gray-500">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-green-700 dark:text-green-400">₹{price}</span>
              {product.discountPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.basePrice}</span>
                  <span className="bg-red-100 text-red-600 font-bold text-sm px-2 py-0.5 rounded">{product.discountPercent}% OFF</span>
                </>
              )}
            </div>

            {/* Weight Options */}
            {product.weightOptions && product.weightOptions.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Select Size/Weight:</p>
                <div className="flex gap-2 flex-wrap">
                  {product.weightOptions.map(w => (
                    <button key={w} onClick={() => setSelectedWeight(w)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${selectedWeight === w ? 'border-green-600 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-green-400'}`}>
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Quantity:</p>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 bg-white dark:bg-gray-600 rounded-md font-bold text-gray-700 dark:text-white hover:bg-gray-50 transition-colors">-</button>
                <span className="w-8 text-center font-bold text-gray-900 dark:text-white">{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="w-8 h-8 bg-white dark:bg-gray-600 rounded-md font-bold text-gray-700 dark:text-white hover:bg-gray-50 transition-colors">+</button>
              </div>
              <span className="text-xs text-gray-500">{product.stock} in stock</span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button onClick={handleAddToCart} disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-xl font-bold text-base transition-colors ${product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800 text-white'}`}>
                🛒 Add to Cart
              </button>
              <Link href="/checkout" onClick={handleAddToCart}
                className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-base transition-colors text-center">
                ⚡ Buy Now
              </Link>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { icon: '🚚', label: 'Free delivery', sub: 'On orders ₹499+' },
                { icon: '🔄', label: '7-day return', sub: 'Easy return policy' },
                { icon: '✅', label: 'Genuine product', sub: 'Brand verified' },
                { icon: '🔒', label: 'Secure payment', sub: 'Encrypted checkout' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {(['desc','reviews'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 font-medium text-sm transition-colors ${activeTab === tab ? 'border-b-2 border-green-700 text-green-700 dark:text-green-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}>
                {tab === 'desc' ? 'Description' : `Reviews (${product.reviewCount})`}
              </button>
            ))}
          </div>
          <div className="p-6">
            {activeTab === 'desc' ? (
              <div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{product.description}</p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex gap-2"><span className="font-medium dark:text-white">Brand:</span><span className="text-gray-600 dark:text-gray-400">{product.brand}</span></div>
                  <div className="flex gap-2"><span className="font-medium dark:text-white">Category:</span><span className="text-gray-600 dark:text-gray-400">{product.category.name}</span></div>
                  <div className="flex gap-2"><span className="font-medium dark:text-white">Unit:</span><span className="text-gray-600 dark:text-gray-400">{product.unit}</span></div>
                  <div className="flex gap-2"><span className="font-medium dark:text-white">Stock:</span><span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>{product.stock > 0 ? `${product.stock} available` : 'Out of stock'}</span></div>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {product.tags.map(t => <span key={t} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-xs">#{t}</span>)}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-700 dark:text-green-400">{product.avgRating.toFixed(1)}</div>
                    <div className="flex justify-center mt-1">{[1,2,3,4,5].map(s => <span key={s} className={s <= stars ? 'star-filled' : 'star-empty'}>★</span>)}</div>
                    <div className="text-xs text-gray-500 mt-1">{product.reviewCount} reviews</div>
                  </div>
                </div>
                {[5,4,3,2,1].map(s => (
                  <div key={s} className="flex items-center gap-3 text-sm">
                    <span className="text-gray-600 dark:text-gray-400 w-4">{s}</span>
                    <span className="star-filled">★</span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${s === stars ? 60 : s === stars - 1 ? 25 : 10}%` }} />
                    </div>
                  </div>
                ))}
                <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">Login to write a review.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
