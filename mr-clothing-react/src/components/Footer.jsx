function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-16 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg">MR</span>
              </div>
              <span className="text-xl font-black text-white">MR CLOTHING</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">Your one-stop destination for trendy and affordable fashion. Quality clothing for every style.</p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <span className="text-lg">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <span className="text-lg">𝕏</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <span className="text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all duration-300 transform hover:scale-110 hover:shadow-lg">
                <span className="text-lg">in</span>
              </a>
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 mr-3 rounded-full"></span>
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Track Order
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                FAQ
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Returns & Exchange
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Shipping Policy
              </a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 mr-3 rounded-full"></span>
              POLICIES
            </h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Privacy Policy
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Terms & Conditions
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Cookie Policy
              </a></li>
              <li><a href="#" className="hover:text-red-400 transition-colors duration-300 flex items-center group">
                <span className="mr-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                Sitemap
              </a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-red-500 to-red-600 mr-3 rounded-full"></span>
              NEWSLETTER
            </h3>
            <p className="text-sm mb-4 text-gray-400">Subscribe to get special offers, free giveaways, and updates!</p>
            <div className="flex mb-4">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-gray-800 text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-700"
              />
              <button className="px-5 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-r-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold shadow-lg transform hover:scale-105">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            
            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-3 font-semibold uppercase">We Accept</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'MC', 'UPI', 'COD'].map((method) => (
                  <div key={method} className="px-3 py-1 bg-gray-800 rounded text-xs font-bold text-gray-400 border border-gray-700">
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 MR Clothing. All rights reserved. | Crafted with <span className="text-red-500">❤️</span></p>
            <div className="flex gap-6 text-xs text-gray-500">
              <a href="#" className="hover:text-red-400 transition-colors">🔒 Secure Payments</a>
              <a href="#" className="hover:text-red-400 transition-colors">🚚 Fast Delivery</a>
              <a href="#" className="hover:text-red-400 transition-colors">↩️ Easy Returns</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;