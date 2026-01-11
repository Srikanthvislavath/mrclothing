import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products";

function CartDrawer({ isOpen, onClose }) {
  const {
    cart,
    removeFromCart,
    cartTotals,
    savings,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } flex flex-col`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Bag</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 text-lg font-medium">Your bag is empty</p>
              <p className="text-gray-400 text-sm mt-2">Add items to your bag to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, idx) => {
                const p = PRODUCTS.find((prod) => prod.id === item.id);
                if (!p) return null;
                return (
                  <div
                    key={`${item.id}-${item.size}-${idx}`}
                    className="flex gap-4 pb-4 border-b border-gray-200 last:border-0"
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-gray-900 font-semibold text-sm line-clamp-2">{p.name}</p>
                        <p className="text-gray-500 text-xs mt-1">
                          {p.brand} • Size {item.size} • Qty {item.qty}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-red-500 hover:text-red-700 text-xs font-semibold transition-colors w-fit"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-900 font-semibold">₹{p.price * item.qty}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900 font-semibold">₹{cartTotals.total}</span>
            </div>
            {savings > 0 && (
              <div className="flex justify-between items-center text-green-600">
                <span>Your Savings</span>
                <span className="font-semibold">₹{savings}</span>
              </div>
            )}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Total</span>
                <span className="text-xl font-bold text-gray-900">₹{cartTotals.total}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Proceed to Checkout
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default CartDrawer;
