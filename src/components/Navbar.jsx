import { useState, useRef, useEffect } from "react";
import "../CSS/Navbar.css";

function Navbar({ theme, setTheme, language, setLanguage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navbarRef = useRef(null);

  // أسماء الروابط حسب اللغة
  const navLinks = [
    {
      id: "home",
      title: language === "ar" ? "الرئيسية" : "Home",
    },
    {
      id: "about",
      title: language === "ar" ? "من أنا" : "About",
    },
    {
      id: "skills",
      title: language === "ar" ? "مهاراتي" : "Skills",
    },
    {
      id: "projects",
      title: language === "ar" ? "أعمالي" : "Projects",
    },
    {
      id: "contact",
      title: language === "ar" ? "تواصل معي" : "Contact",
    },
  ];

  // إغلاق القائمة عند الضغط خارج الـ Navbar
  useEffect(() => {
    function handleOutsideClick(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // متابعة السكرول
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 30);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // عند الضغط على رابط
  function handleLinkClick(id) {
    setActiveLink(id);
    setMenuOpen(false);
  }

  // تغيير الثيم
  function handleThemeChange() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // تغيير اللغة
  function handleLanguageChange() {
    setLanguage(language === "ar" ? "en" : "ar");
    setMenuOpen(false);
  }

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navbarRef}>
      <a href="#home" className="logo" onClick={() => handleLinkClick("home")}>
        {language === "ar" ? "مهاب" : "Mohab"}
        <span>.</span>
      </a>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {navLinks.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={activeLink === link.id ? "active" : ""}
              onClick={() => handleLinkClick(link.id)}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {/* زر تغيير الثيم الموجود بالفعل */}

        <button
          className={`theme-btn ${theme === "light" ? "is-light" : "is-dark"}`}
          onClick={handleThemeChange}
          aria-label="Change theme"
          title={theme === "dark" ? "Light Mode" : "Dark Mode"}
        >
          <span className="theme-icon sun">☀️</span>
          <span className="theme-icon moon">🌙</span>
        </button>

        {/* زر تغيير اللغة الموجود بالفعل */}
        <button
          className="lang-btn"
          onClick={handleLanguageChange}
          aria-label={
            language === "ar" ? "Switch to English" : "التغيير للعربية"
          }
        >
          {language === "ar" ? "EN" : "AR"}
        </button>

        {/* زر قائمة الموبايل */}
        <button
          className={`menu-btn ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
