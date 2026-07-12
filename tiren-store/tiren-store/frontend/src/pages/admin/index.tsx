import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { PRODUCTS } from '../../data/mockData';

const STATS = { totalSales: 284500, totalOrders: 1247, totalCustomers: 892, revenue: 284500, pendingOrders: 23, lowStock: 5 };

const RECENT_ORDERS = [
  { id: 'ORD7F3A91', customer: 'Rahul Sharma', total: 845, status: 'DELIVERED', date: '2026-06-19' },
  { id: 'ORD9C2B44', customer: 'Priya Patel', total: 520, status: 'OUT FOR DELIVERY', date: '2026-06-19' },
  { id: 'ORD1D8E22', customer: 'Amit Kumar', total: 1240, status: 'PROCESSING', date: '2026-06-18' },
  { id: 'ORD3A9F11', customer: 'Sneha Reddy', total: 380, status: 'PENDING', date: '2026-06-18' },
  { id: 'ORD5B7C88', customer: 'Vikram Singh', total: 960, status: 'CONFIRMED', date: '2026-06-17' },
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700', CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-yellow-100 text-yellow-700', OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const { user } = useSelector((s: RootState) => s.auth);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-gray-500 mb-4">Admin access required</p>
        <a href="/auth/login" className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium">Login as Admin</a>
      </div>
    );
  }

  const lowStockProducts = PRODUCTS.filter(p => p.stock <= 50).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white min-h-screen p-4 flex-shrink-0">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-800 font-bold">TS</div>
          <div>
            <div className="font-bold text-white leading-none">TIREN</div>
            <div className="text-orange-400 text-xs font-semibold">ADMIN PANEL</div>
          </div>
        </div>
        <nav className="space-y-1">
          {[
            { label: 'Dashboard', icon: '📊', href: '/admin', active: true },
            { label: 'Products', icon: '📦', href: '/admin/products' },
            { label: 'Orders', icon: '🛒', href: '/admin/orders' },
            { label: 'Customers', icon: '👥', href: '/admin/customers' },
            { label: 'Inventory', icon: '📋', href: '/admin/inventory' },
            { label: 'Coupons', icon: '🏷️', href: '/admin/coupons' },
            { label: 'Reports', icon: '📈', href: '/admin/reports' },
            { label: 'Settings', icon: '⚙️', href: '/admin/settings' },
          ].map(item => (
            <a key={item.label} href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-green-700 text-white' : 'text-green-200 hover:bg-green-800'}`}>
              <span>{item.icon}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="mt-8 pt-4 border-t border-green-800">
          <a href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-green-200 hover:bg-green-800">
            <span>🏠</span>Back to Store
          </a>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Welcome back, {user.name}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium dark:text-white">📥 Export</button>
            <a href="/admin/products/new" className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">+ Add Product</a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Revenue', value: `₹${STATS.totalSales.toLocaleString('en-IN')}`, icon: '💰', change: '+12.5%', color: 'green' },
            { label: 'Total Orders', value: STATS.totalOrders, icon: '🛒', change: '+8.2%', color: 'blue' },
            { label: 'Customers', value: STATS.totalCustomers, icon: '👥', change: '+15.3%', color: 'purple' },
            { label: 'Pending Orders', value: STATS.pendingOrders, icon: '⏳', change: 'Action needed', color: 'orange' },
          ].map(stat => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-xs font-medium ${stat.color === 'orange' ? 'text-orange-500' : 'text-green-600'}`}>{stat.change}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">Recent Orders</h2>
              <a href="/admin/orders" className="text-green-700 dark:text-green-400 text-sm font-medium hover:underline">View All →</a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    <th className="pb-2 font-medium">Order ID</th>
                    <th className="pb-2 font-medium">Customer</th>
                    <th className="pb-2 font-medium">Amount</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ORDERS.map(order => (
                    <tr key={order.id} className="border-b border-gray-50 dark:border-gray-700/50">
                      <td className="py-3 font-medium text-gray-900 dark:text-white">#{order.id}</td>
                      <td className="py-3 text-gray-600 dark:text-gray-300">{order.customer}</td>
                      <td className="py-3 font-medium text-green-700 dark:text-green-400">₹{order.total}</td>
                      <td className="py-3">
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 dark:text-white">⚠️ Low Stock Alert</h2>
            </div>
            <div className="space-y-3">
              {lowStockProducts.map(p => (
                <div key={p.id} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.brand}</p>
                  </div>
                  <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded-full whitespace-nowrap">{p.stock} left</span>
                </div>
              ))}
            </div>
            <a href="/admin/inventory" className="block text-center text-green-700 dark:text-green-400 text-sm font-medium mt-4 hover:underline">
              Manage Inventory →
            </a>
          </div>
        </div>

        {/* Order Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { label: 'Pending', value: 23, color: 'bg-gray-500' },
            { label: 'Confirmed', value: 18, color: 'bg-blue-500' },
            { label: 'Processing', value: 31, color: 'bg-yellow-500' },
            { label: 'Out for Delivery', value: 12, color: 'bg-orange-500' },
            { label: 'Delivered', value: 1163, color: 'bg-green-500' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className={`w-2 h-2 rounded-full ${s.color} mb-2`} />
              <div className="font-bold text-xl text-gray-900 dark:text-white">{s.value}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
