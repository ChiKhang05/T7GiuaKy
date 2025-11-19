import React from "react";

const About = () => {
  return (
    <div className="page-container about-simple">
      <h2>Giới thiệu</h2>
      <p className="lead">StoreH cung cấp sản phẩm thiết thực, chất lượng và giá hợp lý dành cho sinh viên.</p>

      <section className="mb">
        <h4>Nhiệm vụ</h4>
        <p>Giúp bạn tiếp cận sản phẩm tốt với chi phí hợp lý — nhanh chóng và thuận tiện.</p>
      </section>

      <section className="mb">
        <h4>Liên hệ</h4>
        <p>
          Email: <a href="mailto:nguyenconghao210605@kthcm.edu.vn">nguyenconghao210605@kthcm.edu.vn</a>
        </p>
        <p>Hotline: <a href="tel:+84901234567">+84 79 234 567</a></p>
      </section>

      <div className="socials-simple">
        <a href="https://facebook.com/store" target="_blank" rel="noreferrer">Facebook</a>
        <a href="https://instagram.com/truonghoc" target="_blank" rel="noreferrer">Instagram</a>
        <a href="https://twitter.com/truonghoc" target="_blank" rel="noreferrer">Twitter</a>
      </div>
    </div>
  );
};

export default About;
