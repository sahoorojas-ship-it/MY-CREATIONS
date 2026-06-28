export default function Footer() {
  return (
    <footer className="bg-green-900 dark:bg-gray-950 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div><img src="logo.png" alt="TIREN STORE" className="w-10 h-10" /></div>
              <div>
                <div className="font-bold text-white text-lg leading-none">TIREN</div>
                <div className="text-orange-400 font-semibold text-sm leading-none">STORE</div>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">Your trusted online grocery & ration store. Fresh essentials delivered to your door.</p>
            <p className="text-green-300 text-xs mt-2 italic">Freshness You Can Trust</p>
            <div className="flex gap-3 mt-4">
              {['📘','🐦','📸','▶️'].map((icon, i) => (
                <button key={i} className="w-8 h-8 bg-green-800 hover:bg-green-700 rounded-full flex items-center justify-center text-sm transition-colors">{icon}</button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-green-200">
              {[['Home','/'],['Products','/products'],['Offers','/offers'],['Track Order','/dashboard'],['Contact Us','/contact']].map(([label, href]) => (
                <li key={label}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-green-200">
              {['Atta & Flour','Rice','Dal & Pulses','Oil & Ghee','Masala & Spices','Tea & Coffee','Snacks & Chips','Biscuits'].map(cat => (
                <li key={cat}><a href={`/products?category=${cat.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`} className="hover:text-white transition-colors">{cat}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact & App */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact & Support</h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li>📞 +91 70080 11037</li>
              <li>✉️ support@tirenstore.com</li>
              <li>⏰ Mon–Sun: 8AM – 10PM</li>
              <li>📍 Freshness You Can Trust</li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-green-300 mb-2">Download App</p>
              <div className="flex gap-2">
                <button className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-900">🍎 App Store</button>
                <button className="bg-black text-white text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-gray-900">▶ Play Store</button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-300 text-sm">© 2025 TIREN STORE. All rights reserved.</p>
          <div className="flex gap-4 text-sm text-green-300">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Service</a>
            <a href="/refund" className="hover:text-white">Refund Policy</a>
          </div>
          <div className="flex gap-2">
            {['💳','🏦','📱','💵'].map((icon, i) => (
              <span key={i} className="bg-white/10 rounded px-2 py-1 text-xs">{icon}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
