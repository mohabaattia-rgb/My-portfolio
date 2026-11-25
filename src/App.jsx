import { useEffect, useState } from "react";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  // الوضع الحالي للموقع
  const [theme, setTheme] = useState("dark");

  // اللغة الحالية
  const [language, setLanguage] = useState("ar");

  // تحديث اتجاه ولغة الصفحة
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div
      className="app"
      data-theme={theme}
      data-language={language}
      dir={language === "ar" ? "rtl" : "ltr"}
    >
      <Navbar
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />

      <main>
        <Hero language={language} />
        <About language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language} />
    </div>
  );
}

export default App;
