import { useEffect, useState } from "react";
import { FaReact } from "react-icons/fa";
import "../CSS/Hero.css";

function Hero({ language }) {
  const isArabic = language === "ar";

  const arabicWords = ["مطور واجهات أمامية", "مطور React", "مصمم تجارب ويب"];

  const englishWords = [
    "Frontend Developer",
    "React Developer",
    "Web UI Developer",
  ];

  const words = isArabic ? arabicWords : englishWords;

  const [wordIndex, setWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!deleting && displayText.length < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length + 1));
      }, 100);
    } else if (deleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }, 50);
    } else if (!deleting) {
      timeout = setTimeout(() => setDeleting(true), 1500);
    } else {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, deleting, wordIndex, words]);

  return (
    <section className="hero section" id="home">
      <div className="hero-content">
        <span className="hero-greeting">
          {isArabic ? "أهلاً، أنا" : "Hello, I'm"}
        </span>

        <h1>{isArabic ? "مهاب عطية" : "Mohab Attia"}</h1>

        <h2 className="hero-role">
          {displayText}
          <span className="typing-cursor">|</span>
        </h2>

        <p className="hero-description">
          {isArabic
            ? "أهتم بتطوير واجهات ويب عصرية وتفاعلية باستخدام React وتقنيات الويب الحديثة."
            : "I build modern and interactive web interfaces using React and modern web technologies."}
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="hero-btn">
            {isArabic ? "شاهد أعمالي" : "View My Work"}
          </a>

          <a href="#contact" className="hero-btn secondary">
            {isArabic ? "تواصل معي" : "Contact Me"}
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-glow"></div>

        <div className="hero-react-logo">
          <FaReact />
        </div>
      </div>
    </section>
  );
}

export default Hero;
