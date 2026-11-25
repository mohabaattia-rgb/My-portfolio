import { useEffect, useState } from "react";
import "../CSS/Footer.css";

function Footer({ language }) {
  const [visible, setVisible] = useState(false);
  const isArabic = language === "ar";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 },
    );

    const footer = document.querySelector(".footer");

    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`footer ${visible ? "footer-visible" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="footer-container">
        <div className="footer-main">
          {/* Logo and Description */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              M<span>.</span>
            </a>

            <h3>{isArabic ? "مهاب عطية" : "Mohab Attia"}</h3>

            <p>
              {isArabic
                ? "مطور واجهات أمامية مهتم ببناء تجارب ويب عصرية، بسيطة، وسهلة الاستخدام."
                : "Frontend developer passionate about building modern, simple, and user-friendly web experiences."}
            </p>
          </div>

          {/* Navigation */}
          <div className="footer-links">
            <h4>{isArabic ? "روابط سريعة" : "Quick Links"}</h4>

            <a href="#home">{isArabic ? "الرئيسية" : "Home"}</a>
            <a href="#about">{isArabic ? "عني" : "About"}</a>
            <a href="#projects">{isArabic ? "مشاريعي" : "Projects"}</a>
            <a href="#contact">{isArabic ? "تواصل معي" : "Contact"}</a>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h4>{isArabic ? "تقدر تلاقيني هنا" : "Find Me Here"}</h4>

            <a
              href="https://github.com/mohabaattia-rgb"
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span>↗</span>
            </a>
          </div>

          {/* Back To Top */}
          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label={isArabic ? "العودة إلى أعلى الصفحة" : "Back to top"}
          >
            <span>↑</span>
            <small>{isArabic ? "للأعلى" : "Top"}</small>
          </button>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()}{" "}
            {isArabic
              ? "مهاب عطية. جميع الحقوق محفوظة."
              : "Mohab Attia. All rights reserved."}
          </p>

          <span>
            {isArabic ? "صُنع بـ " : "Made with "}
            <b>♥</b>
            {isArabic ? " و React" : " and React"}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
