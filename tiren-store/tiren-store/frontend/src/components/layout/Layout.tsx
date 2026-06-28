import Header from './Header';
import Footer from './Footer';
import CartSidebar from '../cart/CartSidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />
      <CartSidebar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
