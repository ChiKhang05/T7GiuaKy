import React from "react";
import "./css/about.css";

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Giới thiệu Purple Cheeks</h1>
          <p className="hero-subtitle">
            Đồng hành cùng sinh viên với sản phẩm chất lượng, giá hợp lý
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="about-main">
        <div className="container">
          {/* Mission Section */}
          <div className="about-grid">
            <div className="about-card mission-card">
              <div className="card-icon">
                <i className="icon-mission">🎯</i>
              </div>
              <h2>Nhiệm vụ của chúng tôi</h2>
              <p>
                Giúp bạn tiếp cận sản phẩm tốt với chi phí hợp lý — nhanh chóng
                và thuận tiện. Chúng tôi cam kết mang đến trải nghiệm mua sắm
                tuyệt vời cho mỗi sinh viên.
              </p>
              <ul className="mission-list">
                <li>✓ Chọn lọc sản phẩm phù hợp với sinh viên</li>
                <li>✓ Giá cả hợp lý, minh bạch</li>
                <li>✓ Giao hàng nhanh và tiện lợi</li>
                <li>✓ Dịch vụ khách hàng chuyên nghiệp</li>
              </ul>
            </div>

            {/* Vision Section */}
            <div className="about-card vision-card">
              <div className="card-icon">
                <i className="icon-vision">💡</i>
              </div>
              <h2>Tầm nhìn</h2>
              <p>
                Trở thành điểm đến tin cậy cho tất cả sinh viên khi mua sắm các
                sản phẩm chất lượng với giá tốt nhất trên thị trường.
              </p>
              <ul className="vision-list">
                <li>⭐ Sản phẩm chính hãng 100%</li>
                <li>⭐ Hỗ trợ 24/7</li>
                <li>⭐ Chính sách đổi trả linh hoạt</li>
                <li>⭐ Ưu đãi cho sinh viên thường xuyên</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="contact-section">
            <h2>Liên hệ với chúng tôi</h2>
            <p className="contact-intro">
              Có câu hỏi? Chúng tôi sẵn sàng giúp đỡ!
            </p>

            <div className="contact-grid">
              <div className="contact-item email-item">
                <div className="contact-icon">📧</div>
                <h3>Email</h3>
                <a href="mailto:23662028@kthcm.edu.vn" className="contact-link">
                  23662028@kthcm.edu.vn
                </a>
                <button className="btn btn-primary">Gửi Email</button>
              </div>

              <div className="contact-item phone-item">
                <div className="contact-icon">📱</div>
                <h3>Hotline</h3>
                <a href="tel:+84901234567" className="contact-link">
                  +84 901 234 567
                </a>
                <button className="btn btn-secondary">Gọi ngay</button>
              </div>

              <div className="contact-item address-item">
                <div className="contact-icon">📍</div>
                <h3>Địa chỉ</h3>
                <p className="contact-address">
                  TP. Hồ Chí Minh
                  <br />
                  Việt Nam
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <h2>Giá trị cốt lõi</h2>
            <div className="values-grid">
              <div className="value-card">
                <h3>Chất lượng</h3>
                <p>Cam kết cung cấp sản phẩm chính hãng, chất lượng cao</p>
              </div>
              <div className="value-card">
                <h3>Tin tưởng</h3>
                <p>Minh bạch trong giá cả và chính sách</p>
              </div>
              <div className="value-card">
                <h3>Tốc độ</h3>
                <p>Xử lý đơn hàng nhanh chóng và giao hàng đúng hẹn</p>
              </div>
              <div className="value-card">
                <h3>Chăm sóc</h3>
                <p>Dịch vụ khách hàng nhiệt tình và hỗ trợ 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
