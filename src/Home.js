import React from "react";

const Home = () => {
  return (
    <main style={{ fontFamily: "Arial, sans-serif", color: "#222" }}>
      {/* ===============================
                    HERO TOP
      =================================*/}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "70vh",
          overflow: "hidden",
        }}
      >
        {/* Ảnh nền */}
        <img
          src="/mnt/data/0f8d255f-daa9-4b0a-97e5-1954e5d750e2.png"
          alt="Banner lớn"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Text overlay */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            textShadow: "0 2px 8px rgba(0,0,0,0.6)",
          }}
        >
          <h1 style={{ fontSize: "3rem", margin: 0 }}>
            Mua sắm thông minh – Giá tốt mỗi ngày
          </h1>
          <p style={{ marginTop: 12, fontSize: "1.2rem", opacity: 0.9 }}>
            Sản phẩm chất lượng, giao nhanh, nhiều ưu đãi dành cho bạn.
          </p>
          <button
            style={{
              marginTop: 20,
              padding: "12px 24px",
              borderRadius: 8,
              border: "none",
              background: "#ff7a00",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Khám phá ngay
          </button>
        </div>
      </section>

      {/* ===============================
            DANH MỤC NỔI BẬT
      =================================*/}
      <section style={{ padding: "30px 20px" }}>
        <h2 style={{ marginBottom: 16 }}>Danh mục</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
            gap: 16,
          }}
        >
          {[
            "Điện thoại",
            "Laptop",
            "Phụ kiện",
            "Thời trang",
            "Đồ gia dụng",
            "Sắc đẹp",
          ].map((name, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                padding: "16px 12px",
                borderRadius: 10,
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <img
                src={`https://picsum.photos/seed/cat-${i}/200/200`}
                alt=""
                style={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
              <p style={{ marginTop: 8, fontWeight: 600 }}>{name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===============================
            SẢN PHẨM HOT
      =================================*/}
      <section style={{ padding: "30px 20px", background: "#f7f7f7" }}>
        <h2 style={{ marginBottom: 16 }}>Sản phẩm hot nhất</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
            gap: 16,
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: 10,
                overflow: "hidden",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={`https://picsum.photos/seed/pro-${i}/400/260`}
                alt=""
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
              <div style={{ padding: 12 }}>
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem" }}>
                  Sản phẩm {i}
                </h3>
                <p style={{ margin: 0, fontSize: 14, color: "#666" }}>
                  Mô tả nhanh về sản phẩm.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Home;
