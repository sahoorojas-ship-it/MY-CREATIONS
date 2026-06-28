import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setCartOpen, updateQuantity, removeFromCart } from '../../store/slices/cartSlice';
import Link from 'next/link';

export default function CartSidebar() {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((s: RootState) => s.cart);

  const subtotal = items.reduce((a, i) => a + (i.discountPrice || i.price) * i.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 40;
  const total = subtotal + delivery;

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={() => dispatch(setCartOpen(false))} />
      <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 z-50 flex flex-col shadow-2xl animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-green-800 text-white">
          <h2 className="font-bold text-lg">🛒 My Cart ({items.length} items)</h2>
          <button onClick={() => dispatch(setCartOpen(false))} className="text-white hover:text-gray-200 text-2xl">&times;</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="text-6xl mb-4">🛒</div>
              <p className="font-medium">Your cart is empty</p>
              <p className="text-sm mt-1">Add some fresh groceries!</p>
              <button onClick={() => dispatch(setCartOpen(false))}
                className="mt-4 px-6 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800">
                Continue Shopping
              </button>
            </div>
          ) : items.map(item => (
            <div key={`${item.productId}-${item.weight}`} className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cart-item-enter">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                🛍️
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-gray-900 dark:text-white line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.brand} {item.weight && `• ${item.weight}`}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-green-700 dark:text-green-400">
                    ₹{((item.discountPrice || item.price) * item.quantity).toFixed(0)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button onClick={() => dispatch(updateQuantity({ productId: item.productId, weight: item.weight, quantity: item.quantity - 1 }))}
                      className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center font-bold text-gray-700 dark:text-white hover:bg-gray-300">-</button>
                    <span className="text-sm font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ productId: item.productId, weight: item.weight, quantity: item.quantity + 1 }))}
                      className="w-7 h-7 bg-green-700 rounded flex items-center justify-center font-bold text-white hover:bg-green-800">+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart({ productId: item.productId, weight: item.weight }))}
                className="text-red-400 hover:text-red-600 text-sm self-start">✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm dark:text-gray-300">
                <span>Subtotal</span><span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm dark:text-gray-300">
                <span>Delivery</span>
                <span className={delivery === 0 ? 'text-green-600 font-medium' : ''}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
              </div>
              {delivery > 0 && <p className="text-xs text-gray-500">Add ₹{499 - subtotal} more for free delivery</p>}
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 dark:border-gray-600 dark:text-white">
                <span>Total</span><span className="text-green-700 dark:text-green-400">₹{total.toFixed(0)}</span>
              </div>
            </div>
            <Link href="/checkout" onClick={() => dispatch(setCartOpen(false))}
              className="block w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg text-center transition-colors">
              Proceed to Checkout →
            </Link>
            <button onClick={() => dispatch(setCartOpen(false))}
              className="block w-full py-2 mt-2 text-green-700 dark:text-green-400 text-sm font-medium text-center hover:underline">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
