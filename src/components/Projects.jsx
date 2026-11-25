import { useEffect, useState } from "react";
import "../CSS/Projects.css";

function Projects({ language }) {
  const isArabic = language === "ar";

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const projectImages = {
    "turn-ui-to-web-with-react": "/images/turn-ui-into-web-with-react.png",
    "turn-ui-into-web": "/images/turn-ui-into-web.png",
    "search-with-react": "/images/search-with-react.png",
    "react-hero": "/images/react-hero.png",
    resturant: "/images/resturant.png",
    "my-portfolio": "/images/My-portfolio.png",
  };

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch(
          "https://api.github.com/users/mohabaattia-rgb/repos?sort=updated&per_page=100",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        setProjects(data.filter((project) => !project.fork));
      } catch (err) {
        setError("error");
      } finally {
        setLoading(false);
      }
    }

    getProjects();
  }, []);

  useEffect(() => {
    if (loading || error) return;

    const cards = document.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [projects, loading, error]);

  return (
    <section className="projects section" id="projects">
      <div className="projects-heading">
        <span className="section-subtitle">
          {isArabic ? "معرض أعمالي" : "MY PORTFOLIO"}
        </span>

        <h2>{isArabic ? "أحدث مشاريعي" : "My Recent Projects"}</h2>

        <p>
          {isArabic
            ? "مجموعة من المشاريع التي عملت عليها أثناء رحلتي في تطوير الويب."
            : "A collection of projects I've worked on during my web development journey."}
        </p>
      </div>

      {loading && (
        <div className="projects-message">
          {isArabic ? "جاري تحميل المشاريع..." : "Loading projects..."}
        </div>
      )}

      {error && (
        <div className="projects-message">
          {isArabic
            ? "حدث خطأ أثناء تحميل المشاريع. حاول مرة أخرى."
            : "Something went wrong while loading projects. Please try again."}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="projects-message">
          {isArabic ? "لا توجد مشاريع لعرضها حاليًا." : "No projects found."}
        </div>
      )}

      <div className="projects-grid">
        {projects.map((project, index) => {
          const repoName = project.name
            .toLowerCase()
            .trim()
            .replaceAll("_", "-")
            .replaceAll(" ", "-");

          const isCurrentWebsite = repoName === "my-portfolio";

          const imageSrc = projectImages[repoName] || "/images/dumy.png";

          return (
            <article
              className="project-card"
              key={project.id}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="project-image">
                <img
                  src={imageSrc}
                  alt={`${project.name} preview`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/dumy.png";
                  }}
                />

                <span className="image-overlay">
                  {isCurrentWebsite
                    ? "Current Website"
                    : project.language || "PROJECT"}
                </span>
              </div>

              <div className="project-content">
                <div className="project-title">
                  <h3>{project.name}</h3>

                  <span className="project-stars">
                    <span>★</span>
                    {project.stargazers_count}
                  </span>
                </div>

                <p className="project-description">
                  {isCurrentWebsite
                    ? isArabic
                      ? "الموقع الذي تتصفحه الآن! صممته وطوّرته باستخدام React."
                      : "The website you're browsing right now! Built and designed with React."
                    : project.description ||
                      (isArabic
                        ? "مشروع من أعمالي وتجربتي في تطوير الويب."
                        : "A project from my web development journey.")}
                </p>

                <div className="project-tags">
                  <span>{project.language || "Other"}</span>
                  <span>
                    {isCurrentWebsite
                      ? isArabic
                        ? "الموقع الحالي"
                        : "Current Project"
                      : "GitHub Repository"}
                  </span>
                </div>

                <div className="project-links">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="github-link"
                  >
                    <span>GitHub</span>
                    <span>↗</span>
                  </a>

                  {isCurrentWebsite ? (
                    <span className="demo-link current-website">
                      {isArabic ? "أنت هنا" : "You're here"} ✓
                    </span>
                  ) : (
                    project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noreferrer"
                        className="demo-link"
                      >
                        {isArabic ? "معاينة الموقع" : "Live Demo"} ↗
                      </a>
                    )
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default Projects;
