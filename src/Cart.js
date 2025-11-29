// src/Cart.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "./data/product";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  // Lấy giỏ hàng từ localStorage khi trang được tải lại
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Lưu giỏ hàng vào localStorage mỗi khi có sự thay đổi
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = (product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      // Nếu sản phẩm đã có, chỉ tăng số lượng
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Tính tổng giá trị giỏ hàng
  const totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

  // Xử lý thanh toán
  const handleCheckout = () => {
    alert("Thanh toán thành công! Cảm ơn bạn đã mua sắm.");
    setCart([]); // Xóa giỏ hàng sau khi thanh toán
    localStorage.removeItem("cart"); // Xóa giỏ hàng trong localStorage
    navigate("/trang1"); // Quay lại trang chính
  };

  return (
    <div style={{ padding: "40px 20px", fontFamily: "Inter, sans-serif", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ fontSize: "2.4rem", marginBottom: "30px", fontWeight: "600", textAlign: "center" }}>Giỏ hàng của bạn</h2>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: "center", color: "#777", fontSize: "1.2rem" }}>
          <p>Giỏ hàng của bạn hiện đang trống. Hãy thêm sản phẩm vào giỏ hàng.</p>
        </div>
      ) : (
        <div>
          <div>
            {cart.map((product, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                  marginBottom: "15px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
              >
                <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: "80px",
                      height: "80px",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <p style={{ fontSize: "1.2rem", fontWeight: "500", color: "#333" }}>{product.title}</p>
                    <p style={{ fontSize: "1rem", color: "#888" }}>Số lượng: {product.quantity}</p>
                    <p style={{ fontSize: "1rem", color: "#888" }}>${(product.price * product.quantity).toFixed(2)}</p>
                  </div>
                </div>
                
                <button
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                  onMouseOver={(e) => e.target.style.background = "#e63946"}
                  onMouseOut={(e) => e.target.style.background = "#ff4d4d"}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>

          {/* Tổng tiền */}
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.6rem", fontWeight: "600", color: "#333" }}>
              Tổng tiền: ${totalPrice.toFixed(2)}
            </h3>
            <button
              onClick={handleCheckout}
              style={{
                padding: "12px 30px",
                background: "#1e88e5",
                color: "#fff",
                border: "none",
                borderRadius: "30px",
                fontSize: "1.1rem",
                fontWeight: "600",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                transition: "background 0.3s",
                marginTop: "20px",
              }}
              onMouseOver={(e) => e.target.style.background = "#1565c0"}
              onMouseOut={(e) => e.target.style.background = "#1e88e5"}
            >
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
