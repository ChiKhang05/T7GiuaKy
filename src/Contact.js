import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi form (có thể kết nối với backend sau)
    console.log("Form submitted:", formData);
    setSubmitted(true);

    // Reset form sau 3 giây
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6", // Nền sáng, nhẹ nhàng
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "10px", // Gọn gàng hơn với border-radius nhỏ
          padding: "40px",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "600",
              color: "#4B5563", // Màu xám đậm cho tiêu đề
              marginBottom: "10px",
            }}
          >
            Liên Hệ Với Chúng Tôi
          </h1>
          <p style={{ color: "#6B7280", fontSize: "16px", margin: 0 }}>
            Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn
          </p>
        </div>

        {submitted ? (
          <div
            style={{
              backgroundColor: "#d1fae5", // Màu xanh nhạt khi form gửi thành công
              border: "2px solid #10B981",
              borderRadius: "10px",
              padding: "25px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>✓</div>
            <p
              style={{
                color: "#10B981", // Màu xanh lá
                fontSize: "18px",
                fontWeight: "600",
                margin: 0,
              }}
            >
              Cảm ơn bạn đã liên hệ!
            </p>
            <p style={{ color: "#34D399", margin: "8px 0 0" }}>
              Chúng tôi sẽ phản hồi sớm nhất.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                Họ Tên *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ tên của bạn"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B7280";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@email.com"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B7280";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                Số Điện Thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123 456 789"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B7280";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                Chủ Đề *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Chủ đề liên hệ"
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "15px",
                  boxSizing: "border-box",
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B7280";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>

            <div style={{ marginBottom: "30px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: "600",
                  color: "#4B5563",
                  fontSize: "15px",
                }}
              >
                Nội Dung *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Nhập nội dung tin nhắn của bạn..."
                style={{
                  width: "100%",
                  padding: "12px 15px",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  boxSizing: "border-box",
                  resize: "none",
                  outline: "none",
                  backgroundColor: "#f9fafb",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#6B7280";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#E5E7EB";
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#4F46E5", // Màu xanh dương nhẹ
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              Gửi Liên Hệ
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
