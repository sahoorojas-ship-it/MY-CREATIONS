import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import ProductCard from '../components/product/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

export default function ProductsPage() {
  const router = useRouter();
  const { category, search, featured, bestSeller, newArrival } = router.query;

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  const allBrands = [...new Set(PRODUCTS.map(p => p.brand))];

  const filtered = useMemo(() => {
    let result = [...PRODUCTS];
    if (category) result = result.filter(p => p.category.slug === category);
    if (search) result = result.filter(p => p.name.toLowerCase().includes((search as string).toLowerCase()) || p.brand.toLowerCase().includes((search as string).toLowerCase()));
    if (featured === 'true') result = result.filter(p => p.isFeatured);
    if (bestSeller === 'true') result = result.filter(p => p.isBestSeller);
    if (newArrival === 'true') result = result.filter(p => p.isNewArrival);
    if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
    result = result.filter(p => {
      const price = p.discountPrice || p.basePrice;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    if (sortBy === 'price_asc') result.sort((a, b) => (a.discountPrice || a.basePrice) - (b.discountPrice || b.basePrice));
    else if (sortBy === 'price_desc') result.sort((a, b) => (b.discountPrice || b.basePrice) - (a.discountPrice || a.basePrice));
    else if (sortBy === 'rating') result.sort((a, b) => b.avgRating - a.avgRating);
    return result;
  }, [category, search, featured, bestSeller, newArrival, selectedBrands, priceRange, sortBy]);

  const pageTitle = search ? `Results for "${search}"` : category ? CATEGORIES.find(c => c.slug === category)?.name || 'Products' : featured === 'true' ? 'Featured Products' : bestSeller === 'true' ? 'Best Sellers' : 'All Products';

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageTitle}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{filtered.length} products found</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium dark:text-white">
              🔧 Filters
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg text-sm font-medium outline-none">
              <option value="default">Sort: Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 space-y-6 sticky top-28">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button onClick={() => router.push('/products')}
                      className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!category ? 'bg-green-700 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                      All Products
                    </button>
                  </li>
                  {CATEGORIES.map(cat => (
                    <li key={cat.id}>
                      <button onClick={() => router.push(`/products?category=${cat.slug}`)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${category === cat.slug ? 'bg-green-700 text-white' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                        <span>{cat.icon}</span>{cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Price Range</h3>
                <input type="range" min="0" max="1000" value={priceRange[1]}
                  onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-green-700" />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>₹0</span><span>₹{priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Brand</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {allBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={selectedBrands.includes(brand)}
                        onChange={e => setSelectedBrands(e.target.checked ? [...selectedBrands, brand] : selectedBrands.filter(b => b !== brand))}
                        className="accent-green-700" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(selectedBrands.length > 0 || priceRange[1] < 1000) && (
                <button onClick={() => { setSelectedBrands([]); setPriceRange([0, 1000]); }}
                  className="w-full py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400 mb-2">No products found</h3>
                <p className="text-sm">Try adjusting your filters or search terms</p>
                <button onClick={() => router.push('/products')}
                  className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">
                  View All Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
