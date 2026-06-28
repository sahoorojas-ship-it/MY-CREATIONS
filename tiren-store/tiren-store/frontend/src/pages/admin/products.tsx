import { useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '../../store';
import { PRODUCTS, CATEGORIES } from '../../data/mockData';
import toast from 'react-hot-toast';

export default function AdminProducts() {
  const { user } = useSelector((s: RootState) => s.auth);
  const [products, setProducts] = useState(PRODUCTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  if (!user || user.role !== 'ADMIN') {
    return <div className="min-h-screen flex items-center justify-center"><Link href="/auth/login" className="px-6 py-2 bg-green-700 text-white rounded-lg">Login as Admin</Link></div>;
  }

  const filtered = products.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!categoryFilter || p.category.slug === categoryFilter)
  );

  const handleDelete = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast.success('Product deleted');
  };

  const toggleStock = (id: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock === 0 ? 50 : 0 } : p));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-green-900 text-white p-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-800 font-bold text-sm">TS</div>
          <span className="font-bold">← Back to Dashboard</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Product Management</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{filtered.length} products</p>
          </div>
          <button onClick={() => toast.success('Add product form would open here')} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">+ Add New Product</button>
        </div>

        <div className="flex gap-3 mb-6">
          <input placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg outline-none" />
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg outline-none">
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr className="text-left text-gray-500 dark:text-gray-400">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Stock</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-t border-gray-100 dark:border-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{p.category.name}</td>
                  <td className="px-4 py-3">
                    <span className="font-medium text-green-700 dark:text-green-400">₹{p.discountPrice || p.basePrice}</span>
                    {p.discountPrice && <span className="text-xs text-gray-400 line-through ml-1">₹{p.basePrice}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleStock(p.id)} className={`font-medium ${p.stock === 0 ? 'text-red-500' : p.stock <= 50 ? 'text-orange-500' : 'text-green-600'}`}>
                      {p.stock} units
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {p.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toast.success('Edit form opened')} className="text-blue-600 hover:underline text-xs font-medium mr-3">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline text-xs font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
