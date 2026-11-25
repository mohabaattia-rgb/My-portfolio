import { useEffect, useRef, useState } from "react";
import "../CSS/About.css";

function About({ language }) {
  const isArabic = language === "ar";

  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(0);

  const skills = [
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "React JS", level: 93 },
    { name: "Bootstrap", level: 85 },
  ];

  // ظهور القسم عند الوصول إليه
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // تحريك نسب المهارات
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1800;
    const startTime = performance.now();
    let animationFrame;

    function animate(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setAnimatedValues(progress);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible]);

  return (
    <section
      className={`about section ${isVisible ? "show" : ""}`}
      id="about"
      ref={aboutRef}
    >
      {/* About Content */}
      <div className="about-content">
        <span className="section-subtitle">
          {isArabic ? "تعرف عليّ أكثر" : "Get To Know Me"}
        </span>

        <h2 className="section-heading">
          {isArabic ? (
            <>
              مين هو <span>مهاب</span>؟
            </>
          ) : (
            <>
              Who Is <span>Mohab</span>?
            </>
          )}
        </h2>

        <p className="about-description">
          {isArabic
            ? "أنا مهاب، مهتم بمجال تطوير الويب وبناء واجهات المواقع التفاعلية. بحب أحوّل الأفكار والتصميمات إلى تجارب رقمية مميزة باستخدام HTML و CSS و JavaScript و React."
            : "I'm Mohab, passionate about web development and building interactive websites. I enjoy turning ideas and designs into unique digital experiences using HTML, CSS, JavaScript, and React."}
        </p>

        <p className="about-description">
          {isArabic
            ? "بالنسبة لي، البرمجة مش مجرد كتابة كود، لكنها رحلة مستمرة من التعلم والتجربة وتطوير الأفكار."
            : "For me, programming is more than writing code. It's a continuous journey of learning, experimenting, and developing ideas."}
        </p>

        <a href="#contact" className="about-btn">
          {isArabic ? "خلينا نتكلم" : "Let's Talk"}
          <span>{isArabic ? "←" : "→"}</span>
        </a>
      </div>

      {/* Skills */}
      <div className="about-skills" id="skills">
        <div className="skills-heading">
          <span className="section-subtitle">
            {isArabic ? "المهارات التقنية" : "Technical Skills"}
          </span>

          <h3>
            {isArabic ? (
              <>
                مهاراتي <span>التقنية</span>
              </>
            ) : (
              <>
                My Technical <span>Skills</span>
              </>
            )}
          </h3>
        </div>

        <div className="skills-list">
          {skills.map((skill, index) => {
            const currentValue = Math.round(skill.level * animatedValues);

            return (
              <div
                className="skill-item"
                key={skill.name}
                style={{
                  "--delay": `${index * 0.2}s`,
                  "--skill-level": `${skill.level}%`,
                }}
              >
                <div className="skill-info">
                  <h4>{skill.name}</h4>

                  <span className="skill-percent">{currentValue}%</span>
                </div>

                <div className="skill-track">
                  <div
                    className="skill-fill"
                    style={{
                      width: isVisible ? `${skill.level}%` : "0%",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;
