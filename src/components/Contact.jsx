import { useEffect, useState } from "react";
import "../CSS/Contact.css";

function Contact({ language }) {
  const isArabic = language === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
          }
        });
      },
      { threshold: 0.15 },
    );

    const section = document.querySelector(".contact-section");

    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = isArabic ? "اكتب اسمك الأول" : "Please enter your name";
    }

    if (!formData.email.trim()) {
      newErrors.email = isArabic
        ? "محتاجين بريدك الإلكتروني"
        : "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = isArabic
        ? "البريد الإلكتروني مش صحيح"
        : "Please enter a valid email";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = isArabic
        ? "اكتب موضوع الرسالة"
        : "Please enter a subject";
    }

    if (!formData.message.trim()) {
      newErrors.message = isArabic
        ? "احكيلنا عن فكرتك"
        : "Please tell us about your idea";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("loading");

    setTimeout(() => {
      setStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setErrors({});

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    }, 1000);
  };

  return (
    <section
      className="contact-section"
      id="contact"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="contact-container">
        <div className="contact-heading">
          <span className="contact-subtitle">
            {isArabic ? "لنتحدث معًا" : "LET'S TALK"}
          </span>

          <h2>
            {isArabic ? "عندك فكرة؟" : "Have an idea?"}
            <span>{isArabic ? " خلينا ننفذها" : " Let's build it"}</span>
          </h2>

          <p>
            {isArabic
              ? "سواء عندك مشروع أو استفسار، يسعدني أسمع منك."
              : "Whether you have a project or a question, I'd love to hear from you."}
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-top">
              <span className="info-badge">
                <span className="status-dot"></span>
                {isArabic ? "متاح للتواصل" : "Available for contact"}
              </span>

              <h3>
                {isArabic ? (
                  <>
                    كل فكرة عظيمة
                    <br />
                    بتبدأ بمحادثة.
                  </>
                ) : (
                  <>
                    Every great idea
                    <br />
                    starts with a conversation.
                  </>
                )}
              </h3>

              <p>
                {isArabic
                  ? "احكيلي عن فكرتك أو المشروع اللي بتفكر فيه، وخلينا نشوف إزاي نقدر نحوله لحاجة مميزة."
                  : "Tell me about your idea or the project you're thinking about, and let's see how we can turn it into something special."}
              </p>
            </div>

            <div className="info-details">
              <div className="info-item">
                <div className="info-icon">✉</div>

                <div>
                  <span>
                    {isArabic ? "البريد الإلكتروني" : "Email Address"}
                  </span>
                  <h4>mohab.a.attia@gmail.com</h4>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">⌘</div>

                <div>
                  <span>GitHub</span>

                  <a
                    href="https://github.com/mohabaattia-rgb"
                    target="_blank"
                    rel="noreferrer"
                  >
                    mohabaattia-rgb
                  </a>
                </div>
              </div>
            </div>

            <div className="info-bottom">
              <span>
                {isArabic
                  ? "خلينا نبدأ حاجة جديدة"
                  : "Let's start something new"}
              </span>

              <div className="info-decoration">✳</div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-heading">
              <span>{isArabic ? "رسالة جديدة" : "NEW MESSAGE"}</span>

              <h3>
                {isArabic ? "اكتبلي تفاصيل فكرتك" : "Tell me about your idea"}
              </h3>

              <p>
                {isArabic
                  ? "املأ البيانات دي وهنكون بدأنا أول خطوة."
                  : "Fill in the details and we'll take the first step."}
              </p>
            </div>

            <div className="form-row">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="contact-name">
                  {isArabic ? "الاسم" : "Name"}
                </label>

                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder={isArabic ? "اسمك إيه؟" : "What's your name?"}
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "input-error" : ""}
                />

                {errors.name && (
                  <small className="field-error">
                    <span>!</span>
                    {errors.name}
                  </small>
                )}
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="contact-email">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </label>

                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "input-error" : ""}
                />

                {errors.email && (
                  <small className="field-error">
                    <span>!</span>
                    {errors.email}
                  </small>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="contact-subject">
                {isArabic ? "موضوع الرسالة" : "Subject"}
              </label>

              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder={
                  isArabic
                    ? "حابب نتكلم عن إيه؟"
                    : "What would you like to discuss?"
                }
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "input-error" : ""}
              />

              {errors.subject && (
                <small className="field-error">
                  <span>!</span>
                  {errors.subject}
                </small>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="contact-message">
                {isArabic ? "تفاصيل الرسالة" : "Message Details"}
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder={
                  isArabic
                    ? "احكيلي عن فكرتك بالتفصيل..."
                    : "Tell me more about your idea..."
                }
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "input-error" : ""}
              />

              {errors.message && (
                <small className="field-error">
                  <span>!</span>
                  {errors.message}
                </small>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="contact-submit"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  {isArabic ? "جاري الإرسال" : "Sending"}
                  <span className="loading-spinner"></span>
                </>
              ) : (
                <>
                  {isArabic ? "إرسال الرسالة" : "Send Message"}
                  <span>↗</span>
                </>
              )}
            </button>

            {/* Success Message */}
            {status === "success" && (
              <div className="contact-feedback success-message">
                <span>✓</span>
                {isArabic
                  ? "تم إرسال رسالتك بنجاح! شكرًا لتواصلك."
                  : "Your message was submitted successfully! Thank you."}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
