import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "./assets/images/logo.png";
import "./assets/css/layout.css";

const Layout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="modern-layout">
      {/* --- HEADER --- */}
      <header className="modern-header glass">
        <div className="header-left">
          <Link to="/">
            <img src={logo} alt="Logo" className="header-logo" />
          </Link>
        </div>

        <nav className="header-nav">
          <Link to="/">Trang chủ</Link>
          <Link to="/trang1">Phụ Kiện</Link>
          {user?.role === "admin" && <Link to="/admin/products">Quản trị</Link>}
          <Link to="/trang2">Trang Sinh Viên</Link>
          <Link to="/About">Giới Thiệu</Link>
        </nav>

        <div className="header-right">
          {user ? (
            <div className="user-info">
              <span className="user-name">👤 {user.username}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              Đăng nhập
            </Link>
          )}
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="modern-content">
        <div className="page-container">
          <Outlet />
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="modern-footer">
        <div className="footer-container">
          <div className="footer-column footer-brand">
            <img src={logo} alt="StoreH" className="footer-logo" />
            <p className="footer-tag">
              StoreK — Sản phẩm chất lượng cho sinh viên.
            </p>
            <p className="copyright">© {new Date().getFullYear()} - StoreK</p>
          </div>

          <div className="footer-column footer-links">
            <h4>Liên kết</h4>
            <nav>
              <Link to="/">Trang chủ</Link>
              <Link to="/trang1">Phụ Kiện</Link>
              <Link to="/trang2">Trang Sinh Viên</Link>
              <Link to="/About">Giới Thiệu</Link>
            </nav>
          </div>

          <div className="footer-column footer-contact">
            <h4>Liên hệ</h4>
            <p>
              Email:{" "}
              <a href="mailto:support@storeh.example">support@storeh.example</a>
            </p>
            <p>
              Hotline: <a href="tel:0123456789">0123-456-789</a>
            </p>
            <div className="socials" aria-hidden>
              <a href="#" className="social">
                🔵
              </a>
              <a href="#" className="social">
                📸
              </a>
              <a href="#" className="social">
                🐦
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
