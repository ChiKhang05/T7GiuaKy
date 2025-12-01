// src/Cart.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./contexts/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    addToCart,
    changeQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  // `addToCart`, `changeQuantity` and `removeFromCart` come from context; reuse them here

  // Use `changeQuantity` and `removeFromCart` from context

  // totalPrice is provided by context

  // Xử lý thanh toán
  const handleCheckout = () => {
    alert("Thanh toán thành công! Cảm ơn bạn đã mua sắm.");
    clearCart(); // Xóa giỏ hàng sau khi thanh toán
    navigate("/trang1"); // Quay lại trang chính
  };

  const formatPrice = (v) => {
    if (Number.isInteger(v)) return `$${v}`;
    return `$${v.toFixed(2)}`;
  };

  return (
    <div className="cart-wrap">
      <div className="cart-inner">
        <header className="cart-header">
          <h2>Giỏ hàng của bạn</h2>
          <div className="header-actions">
            <button className="btn ghost" onClick={() => navigate("/trang1")}>
              Tiếp tục mua sắm
            </button>
          </div>
        </header>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>
              Giỏ hàng của bạn hiện đang trống. Hãy thêm sản phẩm vào giỏ hàng.
            </p>
            <button className="btn primary" onClick={() => navigate("/trang1")}>
              Mua ngay
            </button>
          </div>
        ) : (
          <div className="cart-grid">
            <section className="cart-items">
              {cart.map((product) => (
                <div key={product.id} className="cart-item">
                  <div className="item-left">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="item-mid">
                    <div className="item-title">{product.title}</div>
                    <div className="item-meta">{product.category}</div>
                    <div className="qty-controls">
                      <button
                        className="small"
                        onClick={() =>
                          changeQuantity(product.id, product.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={product.quantity}
                        onChange={(e) =>
                          changeQuantity(
                            product.id,
                            Number(e.target.value || 1)
                          )
                        }
                      />
                      <button
                        className="small"
                        onClick={() =>
                          changeQuantity(product.id, product.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-right">
                    <div className="item-price">
                      {formatPrice(product.price * product.quantity)}
                    </div>
                    <div className="item-actions">
                      <button
                        className="btn danger"
                        onClick={() => removeFromCart(product.id)}
                      >
                        Xóa
                      </button>
                      <button
                        className="btn"
                        onClick={() => addToCart(product)}
                      >
                        Thêm 1
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <aside className="cart-summary">
              <div className="summary-card">
                <h3>Đơn hàng</h3>
                <div className="summary-row">
                  <span>Tổng tiền</span>
                  <strong>{formatPrice(totalPrice)}</strong>
                </div>
                <div className="summary-row muted">
                  <small>
                    Phí vận chuyển và thuế sẽ được tính ở bước thanh toán
                  </small>
                </div>
                <button className="btn checkout" onClick={handleCheckout}>
                  Thanh toán
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
