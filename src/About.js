import React from "react";

const About = () => {
  return (
    <div className="page-container about-simple">
      <h2>Giới thiệu</h2>
      <p className="lead">
        Purple Cheeks cung cấp sản phẩm thiết thực, chất lượng và giá hợp lý dành cho
        sinh viên.
      </p>

      <section className="mb">
        <h4>Nhiệm vụ</h4>
        <p>
          Giúp bạn tiếp cận sản phẩm tốt với chi phí hợp lý — nhanh chóng và
          thuận tiện.
        </p>
      </section>

      <section className="mb">
        <h4>Liên hệ</h4>
        <p>
          Email: <a href="/">23662028@kthcm.edu.vn</a>
        </p>
        <p>
          Hotline: <a href="tel:+8490123456">+840123456</a>
        </p>
      </section>
    </div>
  );
};

export default About;
