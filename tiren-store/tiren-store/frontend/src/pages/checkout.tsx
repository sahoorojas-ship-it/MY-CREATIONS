import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { COUPONS } from '../data/mockData';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Checkout() {
  const { items } = useSelector((s: RootState) => s.cart);
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const [step, setStep] = useState<'address'|'payment'>('address');
  const [address, setAddress] = useState({ name: user?.name || '', phone: user?.phone || '', line1: '', line2: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState<'COD'|'UPI'|'CARD'>('COD');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [placing, setPlacing] = useState(false);

  const subtotal = items.reduce((a, i) => a + (i.discountPrice || i.price) * i.quantity, 0);
  const deliveryCharge = subtotal >= 499 ? 0 : 40;
  const discount = appliedCoupon?.discount || 0;
  const total = subtotal - discount + deliveryCharge;

  const applyCoupon = () => {
    const coupon = COUPONS.find(c => c.code === couponCode.toUpperCase());
    if (!coupon) return toast.error('Invalid coupon code');
    let disc = 0;
    if (coupon.discount.includes('%')) disc = (subtotal * parseInt(coupon.discount)) / 100;
    else disc = parseInt(coupon.discount.replace('₹', ''));
    setAppliedCoupon({ code: coupon.code, discount: disc });
    toast.success(`Coupon ${coupon.code} applied!`);
  };

  const placeOrder = () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      return toast.error('Please fill all required address fields');
    }
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      dispatch(clearCart());
      toast.success('Order placed successfully! 🎉');
      router.push('/dashboard?ordered=true');
    }, 1500);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-32 text-gray-400">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-2">Your cart is empty</h2>
          <Link href="/products" className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg font-medium">Shop Now</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-8">
          {['address','payment'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s ? 'bg-green-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'}`}>{i+1}</div>
              <span className={`text-sm font-medium capitalize ${step === s ? 'text-green-700 dark:text-green-400' : 'text-gray-500'}`}>{s}</span>
              {i === 0 && <div className="w-12 h-0.5 bg-gray-200 dark:bg-gray-700 mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'address' ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">📍 Delivery Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input placeholder="Full Name *" value={address.name} onChange={e => setAddress({...address, name: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
                  <input placeholder="Phone Number *" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
                  <input placeholder="Address Line 1 *" value={address.line1} onChange={e => setAddress({...address, line1: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600 md:col-span-2" />
                  <input placeholder="Address Line 2 (Optional)" value={address.line2} onChange={e => setAddress({...address, line2: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600 md:col-span-2" />
                  <input placeholder="City *" value={address.city} onChange={e => setAddress({...address, city: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
                  <input placeholder="State *" value={address.state} onChange={e => setAddress({...address, state: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
                  <input placeholder="Pincode *" value={address.pincode} onChange={e => setAddress({...address, pincode: e.target.value})}
                    className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg outline-none focus:border-green-600" />
                </div>
                <button onClick={() => {
                  if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) return toast.error('Fill all required fields');
                  setStep('payment');
                }} className="mt-6 w-full py-3 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold transition-colors">
                  Continue to Payment →
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">💳 Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'COD', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                    { id: 'UPI', label: 'UPI Payment', icon: '📱', desc: 'Google Pay, PhonePe, Paytm & more' },
                    { id: 'CARD', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                  ].map(method => (
                    <label key={method.id} className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${paymentMethod === method.id ? 'border-green-600 bg-green-50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'}`}>
                      <input type="radio" checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id as any)} className="accent-green-700" />
                      <span className="text-2xl">{method.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{method.label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep('address')} className="flex-1 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-white">
                    ← Back
                  </button>
                  <button onClick={placeOrder} disabled={placing}
                    className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-colors disabled:opacity-60">
                    {placing ? 'Placing Order...' : `Place Order — ₹${total.toFixed(0)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-6 sticky top-28">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map(item => (
                  <div key={`${item.productId}-${item.weight}`} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300 flex-1">{item.name} {item.weight && `(${item.weight})`} × {item.quantity}</span>
                    <span className="font-medium text-gray-900 dark:text-white">₹{((item.discountPrice || item.price) * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <input placeholder="Enter coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm outline-none" />
                <button onClick={applyCoupon} className="px-4 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">Apply</button>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-lg mb-4 text-sm">
                  <span className="text-green-700 dark:text-green-400 font-medium">✓ {appliedCoupon.code} applied</span>
                  <button onClick={() => setAppliedCoupon(null)} className="text-red-500 text-xs">Remove</button>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm dark:text-gray-300"><span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span></div>
                {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Discount</span><span>-₹{discount.toFixed(0)}</span></div>}
                <div className="flex justify-between text-sm dark:text-gray-300"><span>Delivery</span><span className={deliveryCharge === 0 ? 'text-green-600 font-medium' : ''}>{deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}</span></div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-700 dark:text-white">
                  <span>Total</span><span className="text-green-700 dark:text-green-400">₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
