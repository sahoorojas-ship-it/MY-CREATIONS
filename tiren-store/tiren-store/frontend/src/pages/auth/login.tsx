import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { setUser } from '../../store/slices/authSlice';
import toast from 'react-hot-toast';

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mode, setMode] = useState<'password'|'otp'>('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePasswordLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return toast.error('Please fill all fields');
    setLoading(true);
    setTimeout(() => {
      const user = { id: 'demo-user', name: email.split('@')[0], email, role: 'CUSTOMER' as const };
      dispatch(setUser(user));
      localStorage.setItem('tiren_token', 'demo-token');
      localStorage.setItem('tiren_user', JSON.stringify(user));
      setLoading(false);
      toast.success('Logged in successfully!');
      router.push('/');
    }, 1000);
  };

  const sendOtp = () => {
    if (phone.length < 10) return toast.error('Enter a valid phone number');
    setOtpSent(true);
    toast.success('OTP sent! (Demo: use 123456)');
  };

  const verifyOtp = () => {
    if (otp !== '123456' && otp.length !== 6) return toast.error('Invalid OTP');
    setLoading(true);
    setTimeout(() => {
      const user = { id: 'demo-user', name: 'Customer', phone, role: 'CUSTOMER' as const };
      dispatch(setUser(user));
      localStorage.setItem('tiren_token', 'demo-token');
      localStorage.setItem('tiren_user', JSON.stringify(user));
      setLoading(false);
      toast.success('Logged in successfully!');
      router.push('/');
    }, 800);
  };

  const adminLogin = () => {
    const user = { id: 'admin-1', name: 'Admin', email: 'admin@tirenstore.com', role: 'ADMIN' as const };
    dispatch(setUser(user));
    localStorage.setItem('tiren_token', 'demo-admin-token');
    localStorage.setItem('tiren_user', JSON.stringify(user));
    toast.success('Logged in as Admin!');
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center text-white font-bold">TS</div>
          <div>
            <div className="font-bold text-green-800 dark:text-green-400 text-xl leading-none">TIREN</div>
            <div className="text-orange-500 font-semibold text-sm leading-none">STORE</div>
          </div>
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-1">Welcome Back!</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">Login to continue shopping</p>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
            <button onClick={() => setMode('password')} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'password' ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-white shadow-sm' : 'text-gray-500'}`}>Email & Password</button>
            <button onClick={() => setMode('otp')} className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${mode === 'otp' ? 'bg-white dark:bg-gray-600 text-green-700 dark:text-white shadow-sm' : 'text-gray-500'}`}>Mobile OTP</button>
          </div>

          {mode === 'password' ? (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
              <button type="submit" disabled={loading} className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-colors disabled:opacity-60">
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <input type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} disabled={otpSent}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600 disabled:bg-gray-50" />
              {!otpSent ? (
                <button onClick={sendOtp} className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-colors">Send OTP</button>
              ) : (
                <>
                  <input type="text" maxLength={6} placeholder="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600 text-center text-lg tracking-widest" />
                  <button onClick={verifyOtp} disabled={loading} className="w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-lg font-bold transition-colors disabled:opacity-60">
                    {loading ? 'Verifying...' : 'Verify & Login'}
                  </button>
                  <button onClick={() => setOtpSent(false)} className="w-full text-sm text-green-700 dark:text-green-400 hover:underline">Change Number</button>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" /><span className="text-xs text-gray-400">OR</span><div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
              🔍 Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
               Apple
            </button>
          </div>

          <button onClick={adminLogin} className="w-full mt-4 py-2 text-xs text-orange-600 hover:underline">
            Demo: Login as Admin →
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account? <Link href="/auth/register" className="text-green-700 dark:text-green-400 font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
