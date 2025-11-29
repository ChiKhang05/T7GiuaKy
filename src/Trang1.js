// src/Trang1.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";

const Trang1 = () => {
  const navigate = useNavigate();

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = storedCart.find(item => item.id === product.id);
    if (existingProduct) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      existingProduct.quantity += 1;
    } else {
      // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
      storedCart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(storedCart));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "12px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // Đảm bảo các nút nằm ở dưới cùng
              height: "380px", // Tăng chiều cao của ô sản phẩm để nhìn rõ hơn
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Thêm bóng mờ cho đẹp
              backgroundColor: "#fff", // Màu nền trắng để sản phẩm nổi bật
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{
                height: "160px", // Tăng chiều cao của hình ảnh
                objectFit: "contain",
                marginBottom: "12px",
                borderRadius: "8px", // Làm tròn góc của ảnh
              }}
            />
            <h4 style={{ fontSize: "1.2rem", fontWeight: "600" }}>{p.title}</h4>
            <p style={{ fontSize: "1rem", color: "#ff7a00", fontWeight: "500" }}>
              ${p.price}
            </p>

            {/* Nút thêm vào giỏ hàng và xem chi tiết */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                marginTop: "auto", // Đảm bảo các nút nằm ở dưới cùng
              }}
            >
              <button
                onClick={() => addToCart(p)}
                style={{
                  padding: "8px 16px",
                  background: "#ff7a00",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  width: "48%", // Giảm chiều rộng của nút để không bị quá rộng
                  fontSize: "0.9rem", // Giảm kích thước chữ để hài hòa hơn
                  transition: "background 0.3s ease",
                }}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                onClick={() => navigate(`/sanpham/${p.id}`)}
                style={{
                  padding: "8px 16px",
                  background: "#1e88e5",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  cursor: "pointer",
                  width: "48%", // Giảm chiều rộng của nút để không bị quá rộng
                  fontSize: "0.9rem", // Giảm kích thước chữ để hài hòa hơn
                  transition: "background 0.3s ease",
                }}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trang1;
