import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { setUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function Register() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.password) return toast.error('Please fill all fields');
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');

    setLoading(true);
    setTimeout(() => {
      const user = { id: 'demo-user', name: form.name, email: form.email, phone: form.phone, role: 'CUSTOMER' as const };
      dispatch(setUser(user));
      localStorage.setItem('tiren_token', 'demo-token');
      localStorage.setItem('tiren_user', JSON.stringify(user));
      setLoading(false);
      toast.success('Account created successfully!');
      router.push('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white font-bold">TS</div>
          <div>
            <div className="font-bold text-green-800 dark:text-green-400 text-xl leading-none">TIREN</div>
            <div className="text-orange-500 font-semibold text-sm leading-none">STORE</div>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Join TIREN STORE for fresh groceries</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
            <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
            <input type="tel" placeholder="Mobile Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
            <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
            <input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
            <button type="submit" disabled={loading} className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-colors disabled:opacity-60">
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account? <Link href="/auth/login" className="text-green-700 dark:text-green-400 font-medium hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
