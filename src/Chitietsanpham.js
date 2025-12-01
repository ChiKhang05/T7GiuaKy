// src/Chitietsanpham.js
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { products } from "./data/product";
import { useCart } from "./contexts/CartContext";

export default function Chitietsanpham() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const { addToCart } = useCart();

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h3 style={{ color: "#ff4d4d" }}>Không tìm thấy sản phẩm!</h3>
        <button
          onClick={() => navigate("/trang1")}
          style={{
            padding: "10px 20px",
            borderRadius: "30px",
            border: "none",
            background: "#ff7a00",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "background 0.3s ease",
          }}
        >
          Quay lại Trang 1
        </button>
      </div>
    );
  }

  // Thêm sản phẩm vào giỏ hàng (use context)
  const onAddToCart = () => {
    addToCart(product);
    alert(`${product.title} đã được thêm vào giỏ hàng!`);
  };

  return (
    <div style={{ padding: "40px 20px", fontFamily: "Inter, sans-serif" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          padding: "8px 16px",
          border: "none",
          background: "#f0f0f0",
          color: "#555",
          borderRadius: "30px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.2s ease",
        }}
      >
        ⬅ Quay lại
      </button>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
          marginTop: "30px",
          justifyContent: "center",
        }}
      >
        {/* Product Image */}
        <div
          style={{
            maxWidth: "400px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.3s ease",
          }}
        >
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* Product Info */}
        <div style={{ maxWidth: "600px", lineHeight: "1.6" }}>
          <h2
            style={{
              fontSize: "2.4rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            {product.title}
          </h2>
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "500",
              color: "#ff7a00",
              marginBottom: "12px",
            }}
          >
            <strong>Giá:</strong> ${product.price}
          </p>
          <p style={{ fontSize: "1rem", marginBottom: "12px" }}>
            <strong>Loại:</strong> {product.category}
          </p>
          <p
            style={{
              fontSize: "1rem",
              color: "#555",
              marginBottom: "20px",
              textAlign: "justify",
              maxWidth: "600px",
            }}
          >
            <strong>Mô tả:</strong> {product.description}
          </p>

          {/* Add to Cart Button */}
          <button
            onClick={onAddToCart}
            style={{
              padding: "12px 24px",
              background: "#1e88e5",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "background 0.3s",
              width: "100%",
            }}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}