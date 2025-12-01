// src/Trang1.js
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";
import "./Trang1.css";

const Trang1 = () => {
  const navigate = useNavigate();

  // local UI state
  const [search, setSearch] = useState("");
  const [justAdded, setJustAdded] = useState(null); // product id recently added
  const [cartCount, setCartCount] = useState(0);

  // compute cart count from localStorage (ensure numeric quantity)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    const normalized = stored.map((it) => ({
      ...it,
      quantity: Math.max(0, Number(it.quantity) || 0),
    }));
    const total = normalized.reduce((s, it) => s + it.quantity, 0);
    setCartCount(total);
  }, []);

  // Listen to cart updates from other components/tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== "cart") return;
      try {
        const stored = JSON.parse(e.newValue) || [];
        const total = stored.reduce(
          (s, it) => s + (Number(it.quantity) || 0),
          0
        );
        setCartCount(total);
      } catch (err) {}
    };
    const onCartUpdated = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("cart")) || [];
        const total = stored.reduce(
          (s, it) => s + (Number(it.quantity) || 0),
          0
        );
        setCartCount(total);
      } catch (err) {}
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("cartUpdated", onCartUpdated);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("cartUpdated", onCartUpdated);
    };
  }, []);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const normalizeId = (id) =>
      typeof id === "string" && !isNaN(Number(id)) ? Number(id) : id;

    const storedCartRaw = JSON.parse(localStorage.getItem("cart")) || [];
    // normalize existing items' ids and quantities so comparisons are consistent
    const storedCart = storedCartRaw.map((it) => ({
      ...it,
      id: normalizeId(it.id),
      quantity: Math.max(1, Number(it.quantity) || 1),
    }));

    const normalizedProduct = { ...product, id: normalizeId(product.id) };

    const existingProduct = storedCart.find(
      (item) => item.id === normalizedProduct.id
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      storedCart.push({ ...normalizedProduct, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(storedCart));
    // notify same-tab listeners that cart changed (storage event doesn't fire in same tab)
    try {
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (e) {}

    // show quick feedback and update count
    const newTotal = storedCart.reduce((s, it) => s + (it.quantity || 0), 0);
    setCartCount(newTotal);
    setJustAdded(normalizedProduct.id);
    window.setTimeout(() => setJustAdded(null), 1400);
  };

  const visibleProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }, [search]);

  const formatPrice = (v) => {
    if (Number.isInteger(v)) return `$${v}`;
    return `$${v.toFixed(2)}`;
  };

  return (
    <div className="page-wrap">
      <header className="page-header">
        <div className="title-group">
          <h2>Danh sách sản phẩm</h2>
          <p className="sub">
            Những sản phẩm chọn lọc, xem và thêm vào giỏ hàng dễ dàng.
          </p>
        </div>

        <div className="controls">
          <div className="search">
            <input
              aria-label="Tìm kiếm sản phẩm"
              placeholder="Tìm tên sản phẩm hoặc danh mục..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="cart-indicator" title="Số lượng sản phẩm trong giỏ">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M7 4h-2l-1 2h2l2.5 8H19v-2H9.6L8.2 6H19V4z" />
            </svg>
            <span className="count">{cartCount}</span>
          </div>
        </div>
      </header>

      <main className="product-grid">
        {visibleProducts.map((p) => (
          <article
            key={p.id}
            className={`card ${justAdded === p.id ? "added" : ""}`}
          >
            <div className="thumb">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="card-body">
              <div className="top">
                <h4 className="title" title={p.title}>
                  {p.title}
                </h4>
                <div className="price">{formatPrice(p.price)}</div>
              </div>
              <p className="desc">
                {p.description.length > 96
                  ? p.description.slice(0, 96) + "..."
                  : p.description}
              </p>
            </div>

            <div className="card-actions">
              <button className="btn primary" onClick={() => addToCart(p)}>
                Thêm vào giỏ hàng
              </button>
              <button
                className="btn secondary"
                onClick={() => navigate(`/sanpham/${p.id}`)}
              >
                Xem chi tiết
              </button>
            </div>

            {justAdded === p.id && (
              <div className="toast">Đã thêm vào giỏ hàng ✓</div>
            )}
          </article>
        ))}
        {visibleProducts.length === 0 && (
          <div className="empty">Không tìm thấy sản phẩm nào khớp.</div>
        )}
      </main>
    </div>
  );
};

export default Trang1;
