import { useLang } from "@/lib/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Github, ExternalLink } from "lucide-react";

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* ADD YOUR PROJECTS HERE — edit content.ts to add more projects */}
          {t.projects.items.map((project, i) => (
            <div
              key={i}
              className={`bg-card border border-border rounded-xl p-8 card-hover group ${isVisible ? `animate-fade-up stagger-${i + 1}` : "opacity-0"
                }`}
            >
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {project.name}
              </h3>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {/* Conditionally render GitHub link */}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}

                {/* Conditionally render Live link */}
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
