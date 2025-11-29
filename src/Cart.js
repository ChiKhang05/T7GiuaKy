// src/Cart.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Lấy giỏ hàng từ localStorage khi trang được tải lại
  useEffect(() => {
    // read stored cart and normalize items (ensure quantity is a number)
    try {
      const raw = JSON.parse(localStorage.getItem("cart")) || [];
      if (!Array.isArray(raw)) {
        setCart([]);
        return;
      }
      const normalized = raw.map((it) => ({
        ...it,
        id:
          typeof it.id === "string" && !isNaN(Number(it.id))
            ? Number(it.id)
            : it.id,
        quantity: Math.max(1, Number(it.quantity) || 1),
      }));
      setCart(normalized);
    } catch (e) {
      setCart([]);
    }
  }, []);

  // keep cart in sync if localStorage changes in another tab (or another component)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== "cart") return;
      try {
        const raw = JSON.parse(e.newValue) || [];
        if (!Array.isArray(raw)) return;
        const normalized = raw.map((it) => ({
          ...it,
          id:
            typeof it.id === "string" && !isNaN(Number(it.id))
              ? Number(it.id)
              : it.id,
          quantity: Math.max(1, Number(it.quantity) || 1),
        }));
        setCart(normalized);
      } catch (err) {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);

    // also listen for same-tab updates dispatched by other components
    const onCartUpdated = () => {
      try {
        const raw = JSON.parse(localStorage.getItem("cart")) || [];
        if (!Array.isArray(raw)) return;
        const normalized = raw.map((it) => ({
          ...it,
          id:
            typeof it.id === "string" && !isNaN(Number(it.id))
              ? Number(it.id)
              : it.id,
          quantity: Math.max(1, Number(it.quantity) || 1),
        }));
        setCart(normalized);
      } catch (err) {}
    };
    window.addEventListener("cartUpdated", onCartUpdated);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    // always persist current cart (empty array allowed)
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      // ignore storage failures
      // in real apps, you'd surface a message or fallback
    }
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng (used to quickly re-add from cart or elsewhere)
  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart((prev) =>
        prev.map((it) =>
          it.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        )
      );
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  // Set quantity explicitly (min 1)
  const changeQuantity = (productId, qty) => {
    // ensure integer qty
    const q = Math.floor(Number(qty) || 0);
    if (q <= 0) {
      // remove item if qty goes to 0
      setCart((prev) => prev.filter((it) => it.id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.id === productId ? { ...it, quantity: q } : it))
    );
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cart.reduce((total, product) => {
    const qty = Number(product.quantity) || 0;
    const price = Number(product.price) || 0;
    return total + price * qty;
  }, 0);

  // Xử lý thanh toán
  const handleCheckout = () => {
    alert("Thanh toán thành công! Cảm ơn bạn đã mua sắm.");
    setCart([]); // Xóa giỏ hàng sau khi thanh toán
    try {
      localStorage.removeItem("cart");
    } catch (e) {}
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
