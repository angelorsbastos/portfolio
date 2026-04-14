import { useState, useRef } from "react";
import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Github, ExternalLink } from "lucide-react";

const ProjectCard = ({ project, index, isVisible }: { project: any, index: number, isVisible: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Define spans for Bento Grid
  const getSpanClass = (i: number) => {
    if (i === 0) return "lg:col-span-2"; // LogLife
    if (i === 6) return "lg:col-span-2"; // Portfolio / Last project
    return "lg:col-span-1";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-card border border-border rounded-xl p-8 card-hover group overflow-hidden ${
        getSpanClass(index)
      } ${isVisible ? `animate-fade-up stagger-${(index % 6) + 1}` : "opacity-0"}`}
    >
      {/* Spotlight Effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 230, 118, 0.08), transparent 40%)`
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-1"
              >
                <Github size={20} />
              </a>
            )}
            {project.live && project.live !== "#" && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors p-1"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-8 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map((tag: string) => (
            <span 
              key={tag} 
              className="font-mono text-[10px] px-2 py-1 rounded-md bg-secondary/50 text-secondary-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useLang();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="section-number">04</div>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">{t.projects.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {t.projects.items.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
