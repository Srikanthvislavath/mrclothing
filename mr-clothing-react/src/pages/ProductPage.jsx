import { useParams } from "react-router-dom";
import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useCart } from "../context/CartContext";

function ProductPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === Number(id)) || PRODUCTS[0];
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);
  const [mainImg, setMainImg] = useState(product.images[0]);
  const { addToCart } = useCart();

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = () => addToCart(product.id, size, qty);
  const handleBuy = () => {
    addToCart(product.id, size, qty);
    window.location.href = "/checkout";
  };

  return (
    <div className="page-product container">
      <div className="breadcrumb">
        Home / Men / <span>{product.name}</span>
      </div>

      <main className="product-layout">
        <div className="product-images">
          <div className="product-main-img">
            <img src={mainImg} alt={product.name} />
          </div>
          <div className="product-thumb-row">
            {product.images.map((src) => (
              <div
                key={src}
                className={
                  "product-thumb" + (src === mainImg ? " active" : "")
                }
                onClick={() => setMainImg(src)}
              >
                <img src={src} alt="" />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="product-brand">{product.brand}</p>
          <h1 className="product-title">{product.name}</h1>
          <div className="rating-row">
            <span className="rating-badge">
              ⭐ Be the first one to rate!
            </span>
          </div>

          <div className="price-row">
            <span className="price-now">₹{product.price}</span>
            <span className="price-old">₹{product.mrp}</span>
            <span className="price-off">
              {product.discountPercent}% OFF
            </span>
          </div>
          <p className="gst-note">Inclusive of GST benefit</p>

          <div className="size-section">
            <div className="section-label-row">
              <span className="section-label">SELECT SIZE</span>
              <a href="#" className="size-link">
                Which size fits me?
              </a>
            </div>
            <div className="size-buttons">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn ${size === s ? "active" : ""}`}
                  onClick={() => setSize(s)}
                >
                  {s}
                </button>
              ))}
            </div>
            <a href="#" className="size-chart-link">
              Size Chart
            </a>
          </div>

          <div className="offer-box">
            <strong>OFFERS</strong>
            <p>
              <span className="tag">MRWELCOME10</span> Extra 10% Off on your
              1st order above ₹1599
            </p>
            <a href="#" className="small-link">
              View T&amp;C
            </a>
          </div>

          <div className="qty-row">
            <span className="section-label">QUANTITY</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={dec}>
                -
              </button>
              <span>{qty}</span>
              <button className="qty-btn" onClick={inc}>
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn-primary" onClick={handleAdd}>
              ADD TO BAG
            </button>
            <button className="btn-outline" onClick={handleBuy}>
              BUY NOW
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductPage;
