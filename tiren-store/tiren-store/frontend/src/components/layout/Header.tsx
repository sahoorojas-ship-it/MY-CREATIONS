import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toggleCart } from '../../store/slices/cartSlice';
import { toggleDarkMode } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';
import { useRouter } from 'next/router';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((s: RootState) => s.cart);
  const { user } = useSelector((s: RootState) => s.auth);
  const { darkMode } = useSelector((s: RootState) => s.ui);
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const cartCount = items.reduce((a, i) => a + i.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) router.push(`/products?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="bg-green-800 text-white text-xs py-1 px-4 text-center">
        🚚 Free delivery on orders above ₹499 | 📞 Support: 1800-XXX-XXXX
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4">

          <Link href="/" className="flex-shrink-0">
            <img src="/logo.png" alt="TIREN STORE" className="h-12 w-auto object-contain" />
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="flex rounded-lg overflow-hidden border-2 border-green-700 dark:border-green-600">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search for atta, rice, oil, snacks..."
                className="flex-1 px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white outline-none"
              />
              <button type="submit" className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 text-sm font-medium transition-colors">
                🔍 Search
              </button>
            </div>
          </form>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {mounted ? (darkMode ? '☀️' : '🌙') : '🌙'}
            </button>

            {!mounted ? (
              <Link href="/auth/login" className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">
                Login
              </Link>
            ) : user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium dark:text-white hidden md:block">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block z-50">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">My Orders</Link>
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">Profile</Link>
                  <Link href="/dashboard/wishlist" className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white">Wishlist</Link>
                  {user.role === 'ADMIN' && (
                    <Link href="/admin" className="block px-4 py-2 text-sm text-orange-600 font-medium hover:bg-gray-50 dark:hover:bg-gray-700">Admin Panel</Link>
                  )}
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <button onClick={() => dispatch(logout())} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/auth/login" className="px-4 py-2 bg-green-700 text-white text-sm font-medium rounded-lg hover:bg-green-800 transition-colors">
                Login
              </Link>
            )}

            <button
              onClick={() => dispatch(toggleCart())}
              className="relative flex items-center gap-1 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
            >
              <span className="text-lg">🛒</span>
              <span className="text-sm font-medium hidden md:block">Cart</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav className="flex gap-1 mt-3 overflow-x-auto scrollbar-hide">
          {['Atta & Flour','Rice','Dal & Pulses','Oil & Ghee','Masala & Spices','Tea & Coffee','Snacks','Biscuits','Noodles','Soap & Bath','Shampoo','Detergents'].map(cat => (
            <Link key={cat} href={`/products?category=${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700 hover:bg-green-700 hover:text-white hover:border-green-700 dark:text-gray-300 transition-all">
              {cat}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
