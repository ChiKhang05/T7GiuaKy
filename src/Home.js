import { products } from "./data/product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const categories = [
    { name: "Điện thoại", icon: "📱" },
    { name: "Laptop", icon: "💻" },
    { name: "Thể thao", icon: "⚽" },
    { name: "Thời trang", icon: "👗" },
    { name: "Sắc đẹp", icon: "💄" },
    { name: "Phụ kiện", icon: "🎧" },
  ];

  return (
    <main style={{ fontFamily: "Inter, sans-serif", background: "#f6f7fb" }}>
      {/* =============================== HERO + INTRO TEXT =================================*/}
      <section
        style={{
          width: "100%",
          height: "70vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src="https://maytinhgiaphat.vn/wp-content/uploads/2025/09/hinh_nen_may_tinh_toi_mau_15_1746446922279.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(55%)",
          }}
        />

        {/* HERO TEXT */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            maxWidth: "800px",
            padding: "0 20px",
          }}
        >
          <h1 style={{ fontSize: "3.2rem", marginBottom: 10, fontWeight: 700 }}>
            Chào mừng đến với Purple Cheeks
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.9 }}>
            Hàng ngàn sản phẩm, giá tốt mỗi ngày, giao siêu tốc 2 giờ.
          </p>

          {/* SEARCH BAR */}
          <div
            style={{
              marginTop: 25,
              display: "flex",
              background: "#fff",
              borderRadius: 50,
              padding: "6px 10px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            <input
              placeholder="Bạn muốn tìm gì hôm nay?"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "12px 20px",
                borderRadius: 50,
                fontSize: "1rem",
              }}
            />
            <button
              style={{
                padding: "12px 28px",
                background: "#ff7a00",
                border: "none",
                borderRadius: 40,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </section>

      {/* =============================== CATEGORY GRID =================================*/}
      <section style={{ padding: "40px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 30,
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Danh mục nổi bật
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: 20,
            maxWidth: 1000,
            margin: "0 auto",
          }}
        >
          {categories.map((cat, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "20px 10px",
                borderRadius: 12,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.07)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: 40 }}>{cat.icon}</div>
              <p style={{ marginTop: 10, fontWeight: 600 }}>{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =============================== BANNER =================================*/}
      <section style={{ padding: "0 20px" }}>
        <img
          src="https://insieutoc.vn/wp-content/uploads/2021/02/mau-banner-quang-cao-khuyen-mai.jpg"
          style={{
            width: "100%",
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        />
      </section>

      {/* =============================== PRODUCTS GRID =================================*/}
      <section style={{ padding: "50px 20px" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 30,
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          Sản phẩm nổi bật
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/sanpham/${p.id}`)}
              style={{
                background: "#fff",
                borderRadius: 14,
                boxShadow: "0 6px 20px rgba(0,0,0,0.05)",
                overflow: "hidden",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                style={{ width: "100%", height: 170, objectFit: "cover" }}
              />

              <div style={{ padding: 15 }}>
                <h3
                  style={{
                    margin: "0 0 6px",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {p.title}
                </h3>

                <strong style={{ fontSize: "1.1rem", color: "#ff7a00" }}>
                  ${p.price}
                </strong>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
