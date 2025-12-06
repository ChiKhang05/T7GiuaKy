// @ts-ignore
import "./styles.css";
// @ts-ignore
import Home from "./Home";
// @ts-ignore
import Layout from "./Layout";
// @ts-ignore
import Trang1 from "./Trang1";
// @ts-ignore
import Chitietsanpham from "./Chitietsanpham";
// @ts-ignore
import Trang2 from "./Contact";
// @ts-ignore
import ListProducts from "./ListProducts";
// @ts-ignore
import ProductDetail from "./ProductDetail";
// @ts-ignore
import ListProducts_SP from "./ListProducts_SP";
// @ts-ignore
import About from "./About";

import { BrowserRouter, Routes, Route } from "react-router-dom";
// @ts-ignore
import { CartProvider } from "./contexts/CartContext";

//@ts-ignore
import LoginPage from "./LoginPage";
//@ts-ignore
import LogoutPage from "./LogoutPage";
//@ts-ignore
import ProtectedRoute from "./ProtectedRoute";
//@ts-ignore
import ListProducts_SP_Admin from "./ListProducts_SP_Admin";

// Giỏ hàng
//@ts-ignore
import Cart from "./Cart";

const App = () => {
  //return <Layout />;
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* ✅ Layout chung cho toàn bộ hệ thống */}
          <Route path="/" element={<Layout />}>
            {/* Trang chính (cho người dùng vãng lai) */}
            <Route index element={<Home />} />
            <Route path="trang1" element={<Trang1 />} />
            <Route path="trang2" element={<Trang2 />} />
            <Route path="sanpham/:id" element={<Chitietsanpham />} />
            <Route path="detail/:id" element={<ProductDetail />} />
            <Route path="About" element={<About />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="logout" element={<LogoutPage />} />
            {/* Thêm các route giỏ hàng */}
            <Route path="cart" element={<Cart />} /> {/* Giỏ hàng */}
            <Route
              path="admin/products"
              element={
                <ProtectedRoute>
                  <ListProducts_SP_Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
