import Navbar from "@/components/Navbar";
import Hero from "@/components/HeroSection";
import ChatWidget from "@/components/ChatWidget";
import { useLang } from "@/lib/LanguageContext";
import About from "@/components/AboutSection";
import Experience from "@/components/ExperienceSection";
import Education from "@/components/EducationSection";
import Projects from "@/components/ProjectsSection";
import Skills from "@/components/SkillsSection";
import Football from "@/components/FootballSection";
import Contact from "@/components/ContactSection";
import Footer from "@/components/FooterSection";

const Index = () => {
  const { lang } = useLang();

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Projects />
      <Skills />
      <Football />
      <Contact />
      <Footer />
      <ChatWidget language={lang} />
    </>
  );
};

export default Index;
