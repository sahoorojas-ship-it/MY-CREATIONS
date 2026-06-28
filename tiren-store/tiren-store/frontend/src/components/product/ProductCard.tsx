import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store';
import toast from 'react-hot-toast';

interface Product {
  id: string; name: string; slug: string; brand: string;
  images: string[]; basePrice: number; discountPrice?: number; discountPercent?: number;
  stock: number; unit: string; weightOptions?: string[]; isFeatured?: boolean;
  isBestSeller?: boolean; isNewArrival?: boolean; avgRating: number; reviewCount: number;
  category: { name: string; slug: string };
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const { user } = useSelector((s: RootState) => s.auth);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0) return toast.error('Out of stock');
    dispatch(addToCart({
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.images[0] || '',
      price: product.basePrice,
      discountPrice: product.discountPrice,
      quantity: 1,
      weight: product.weightOptions?.[0],
      stock: product.stock,
      category: product.category.name,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  const price = product.discountPrice || product.basePrice;
  const stars = Math.round(product.avgRating);

  return (
    <Link href={`/product/${product.slug}`} className="block">
      <div className="product-card bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md group">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 dark:bg-gray-700 overflow-hidden">
          {product.images[0] ? (
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🛍️</div>
          )}
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discountPercent && product.discountPercent > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{product.discountPercent}% OFF</span>
            )}
            {product.isBestSeller && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Best Seller</span>}
            {product.isNewArrival && <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">New</span>}
          </div>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="bg-white text-gray-800 font-bold text-sm px-3 py-1 rounded-full">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm mt-0.5 line-clamp-2 leading-tight">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <span key={s} className={`text-xs ${s <= stars ? 'star-filled' : 'star-empty'}`}>★</span>
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Weight options */}
          {product.weightOptions && product.weightOptions.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {product.weightOptions.slice(0, 3).map(w => (
                <span key={w} className="text-xs px-2 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400">{w}</span>
              ))}
            </div>
          )}

          {/* Price + Add to cart */}
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="font-bold text-green-700 dark:text-green-400 text-base">₹{price}</span>
              {product.discountPrice && (
                <span className="text-xs text-gray-400 line-through ml-1">₹{product.basePrice}</span>
              )}
            </div>
            <button onClick={handleAddToCart} disabled={product.stock === 0}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                product.stock === 0
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-800 text-white'
              }`}>
              {product.stock === 0 ? 'OOS' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
