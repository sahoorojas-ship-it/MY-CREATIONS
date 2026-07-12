import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../store';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { hydrateCart } from '../store/slices/cartSlice';
import { hydrateAuth } from '../store/slices/authSlice';
import { setDarkMode } from '../store/slices/uiSlice';

function HydrateFromStorage() {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('tiren_cart') || '[]');
      if (cart.length) dispatch(hydrateCart(cart));
    } catch {}
    try {
      const user = JSON.parse(localStorage.getItem('tiren_user') || 'null');
      const token = localStorage.getItem('tiren_token');
      if (user && token) dispatch(hydrateAuth({ user, token }));
    } catch {}
    const dark = localStorage.getItem('tiren_dark') === 'true';
    if (dark) dispatch(setDarkMode(true));
  }, [dispatch]);
  return null;
}

function DarkModeWrapper({ children }: { children: React.ReactNode }) {
  const darkMode = useSelector((s: RootState) => s.ui.darkMode);
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);
  return <>{children}</>;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DarkModeWrapper>
        <HydrateFromStorage />
        <Component {...pageProps} />
        <Toaster
          position="top-right"
          toastOptions={{ duration: 3000, style: { borderRadius: '8px', background: '#1a5c1a', color: '#fff' } }}
        />
      </DarkModeWrapper>
    </Provider>
  );
}
