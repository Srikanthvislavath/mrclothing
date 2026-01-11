import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { PRODUCTS } from "../data/products";
import { apiPost, createRazorpayOrder, openRazorpayCheckout, verifyRazorpayPayment } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { cart, cartTotals, savings, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    pincode: "",
    address: "",
  });
  const payable = cartTotals.total;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePay = async () => {
    if (cart.length === 0) {
      alert("Your bag is empty.");
      return;
    }

    if (!user) {
      alert("Please login to continue");
      navigate("/login");
      return;
    }

    if (!formData.firstName || !formData.mobile || !formData.pincode || !formData.address) {
      alert("Please fill all address fields");
      return;
    }

    setLoading(true);
    try {
      // Create Razorpay order
      const order = await createRazorpayOrder(payable, cart);
      
      // Open Razorpay checkout
      const paymentResponse = await openRazorpayCheckout(
        order,
        user.email,
        user.first_name
      );

      // Verify payment
      const verification = await verifyRazorpayPayment({
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
      });

      alert(
        `Payment Successful!\nOrder ID: ${verification.order_id}\nAmount: ₹${verification.amount}`
      );
      clearCart();
      navigate("/");
    } catch (err) {
      alert(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="page-checkout container">
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2>Please login to checkout</h2>
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-checkout container">
      <main className="checkout-layout">
        <section className="checkout-left">
          <div className="checkout-card">
            <h2>Delivery Address</h2>
            <form className="address-form" onSubmit={(e) => e.preventDefault()}>
              <div className="two-col">
                <div>
                  <label>First name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label>Last name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <label>Mobile number*</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
              <div className="two-col">
                <div>
                  <label>Pincode*</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <label>Address*</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House No / Building & Street"
                required
                style={{ minHeight: "80px" }}
              />
            </form>
          </div>

          <div className="checkout-card">
            <h2>Payment</h2>
            <div className="payment-methods">
              <p style={{ color: "#666", marginBottom: "12px" }}>
                ✓ Secure Payment via Razorpay
              </p>
              <p style={{ color: "#666", marginBottom: "16px", fontSize: "13px" }}>
                Supports: Card, UPI, Netbanking, Wallets
              </p>
            </div>
            <button
              disabled={loading}
              className="btn-primary"
              style={{ marginTop: 10, width: "100%" }}
              onClick={handlePay}
            >
              {loading ? "Processing..." : "PROCEED TO PAYMENT"}
            </button>
          </div>
        </section>

        <aside className="checkout-right">
          <div className="summary-card">
            <h2>
              Order Summary (
              {cart.reduce((sum, item) => sum + item.qty, 0)} item)
            </h2>
            <div className="summary-items">
              {cart.map((item) => {
                const p = PRODUCTS.find((prod) => prod.id === item.id);
                if (!p) return null;
                return (
                  <div
                    key={`${item.id}-${item.size}`}
                    className="summary-item"
                  >
                    <span>
                      {p.name} (Size {item.size}) × {item.qty}
                    </span>
                    <span>₹{p.price * item.qty}</span>
                  </div>
                );
              })}
            </div>

            <div className="summary-row">
              <span>Bag Total (MRP)</span>
              <span>₹{cartTotals.mrpTotal}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span>- ₹{savings}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total Payable Amount</span>
              <span>₹{payable}</span>
            </div>
            <p className="savings-text">You save ₹{savings}</p>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default CheckoutPage;
