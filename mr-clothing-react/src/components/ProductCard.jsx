import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const defaultSize = product.sizes[0];

  const handleAdd = () => {
    setIsAdding(true);
    addToCart(product.id, defaultSize, 1);
    setTimeout(() => setIsAdding(false), 1000);
  };

  const discountPercent = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 h-72">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg animate-pulse">
            {discountPercent}% OFF
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      <div className="flex-1 p-5 flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
        <div>
          <p className="text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
            {product.brand}
          </p>
          <h3 className="text-gray-900 font-bold text-base line-clamp-2 mb-3 group-hover:text-red-500 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl font-black text-gray-900">₹{product.price}</span>
            {product.mrp && (
              <>
                <span className="text-sm text-gray-400 line-through">₹{product.mrp}</span>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  Save ₹{product.mrp - product.price}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-600 font-semibold">(4.5)</span>
          </div>
        </div>

        <div className="space-y-2">
          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl text-sm ${
              isAdding ? 'scale-95 opacity-75' : ''
            }`}
          >
            {isAdding ? '✓ Added!' : '🛒 Add to Bag'}
          </button>
          <Link 
            to={`/product/${product.id}`}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 text-sm text-center block"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* New Badge */}
      {product.isNew && (
        <div className="absolute top-16 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          NEW
        </div>
      )}
    </div>
  );
}

export default ProductCard;
