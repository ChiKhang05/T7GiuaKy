import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Nhớ import supabase client

const ListSanPham = () => {
  const [listproduct, setListProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const LayDulieutuSupabase = async () => {
      try {
        // Lấy dữ liệu từ bảng 'product' trong Supabase
        const { data, error } = await supabase.from("product").select("*");

        if (error) throw error;

        if (data && data.length > 0) {
          setListProduct(data);
        } else {
          setError("Không có dữ liệu sản phẩm!");
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu:", err.message);
        setError("Không thể tải dữ liệu từ máy chủ!");
      } finally {
        setLoading(false);
      }
    };

    LayDulieutuSupabase();
  }, []);

  const navigate = useNavigate();

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Danh sách sản phẩm</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {listproduct.map((p) => (
          <div
            key={p.id}
            onClick={() => navigate(`/sanpham/${p.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={p.image}
              alt={p.title}
              style={{ height: "180px", objectFit: "contain", width: "100%" }}
            />
            <h4>{p.title}</h4>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListSanPham;
