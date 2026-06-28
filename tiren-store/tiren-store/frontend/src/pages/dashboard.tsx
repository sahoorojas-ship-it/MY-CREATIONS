import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/layout/Layout';
import { RootState } from '../store';

const MOCK_ORDERS = [
  { id: 'ORD7F3A91', date: '2026-06-15', status: 'DELIVERED', total: 845, items: 5 },
  { id: 'ORD9C2B44', date: '2026-06-10', status: 'OUT_FOR_DELIVERY', total: 520, items: 3 },
  { id: 'ORD1D8E22', date: '2026-06-05', status: 'PROCESSING', total: 1240, items: 8 },
];

const statusColors: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700', CONFIRMED: 'bg-blue-100 text-blue-700',
  PROCESSING: 'bg-yellow-100 text-yellow-700', OUT_FOR_DELIVERY: 'bg-orange-100 text-orange-700',
  DELIVERED: 'bg-green-100 text-green-700', CANCELLED: 'bg-red-100 text-red-700',
};

export default function Dashboard() {
  const { user } = useSelector((s: RootState) => s.auth);
  const router = useRouter();
  const { ordered } = router.query;
  const [tab, setTab] = useState<'orders'|'profile'>('orders');

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-gray-500 mb-4">Please login to view your dashboard</p>
          <Link href="/auth/login" className="px-6 py-2 bg-green-700 text-white rounded-lg font-medium">Login</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {ordered === 'true' && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-bold text-green-800 dark:text-green-400">Order placed successfully!</p>
              <p className="text-sm text-green-600 dark:text-green-300">You'll receive a confirmation shortly. Track it below.</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white font-bold text-2xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || user.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Orders', value: MOCK_ORDERS.length, icon: '📦', href: '/dashboard' },
            { label: 'Wishlist', value: 4, icon: '❤️', href: '/dashboard/wishlist' },
            { label: 'Addresses', value: 2, icon: '📍', href: '/dashboard/addresses' },
            { label: 'Profile', value: '', icon: '👤', href: '/dashboard/profile' },
          ].map(stat => (
            <Link key={stat.label} href={stat.href} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 text-center hover:shadow-md transition-shadow">
              <div className="text-2xl mb-1">{stat.icon}</div>
              {stat.value !== '' && <div className="font-bold text-lg text-gray-900 dark:text-white">{stat.value}</div>}
              <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">My Orders</h2>
        <div className="space-y-3">
          {MOCK_ORDERS.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900 dark:text-white">#{order.id}</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Placed on {order.date} • {order.items} items</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-green-700 dark:text-green-400">₹{order.total}</span>
                  <button className="px-4 py-1.5 border border-green-700 text-green-700 dark:text-green-400 dark:border-green-400 rounded-lg text-sm font-medium hover:bg-green-50 dark:hover:bg-green-900/30">
                    View Details
                  </button>
                  {order.status === 'DELIVERED' && (
                    <button className="px-4 py-1.5 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">
                      Download Invoice
                    </button>
                  )}
                  {['PENDING','CONFIRMED'].includes(order.status) && (
                    <button className="px-4 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {/* Tracking */}
              {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    {['Confirmed','Processing','Out for Delivery','Delivered'].map((step, i) => {
                      const stepStatus = ['CONFIRMED','PROCESSING','OUT_FOR_DELIVERY','DELIVERED'][i];
                      const currentIdx = ['CONFIRMED','PROCESSING','OUT_FOR_DELIVERY','DELIVERED'].indexOf(order.status);
                      const isActive = i <= currentIdx;
                      return (
                        <div key={step} className="flex flex-col items-center flex-1">
                          <div className={`w-3 h-3 rounded-full mb-1 ${isActive ? 'bg-green-600' : 'bg-gray-200 dark:bg-gray-600'}`} />
                          <span className={isActive ? 'text-green-700 dark:text-green-400 font-medium' : ''}>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
