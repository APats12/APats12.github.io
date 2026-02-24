import './ProjectCard.css';

export interface Project {
  id: number;
  name: string;
  description: string;
  category: string;
  bullets: string[];
  technologies: string[];
  link?: string;
  github?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="project-card-inner">
        {/* Left column */}
        <div className="project-left">
          <span className="project-category tag tag-blue">{project.category}</span>
          <h3 className="project-name">{project.name}</h3>
          <p className="project-description">{project.description}</p>
          <div className="project-links">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                View Code
              </a>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link primary">
                Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="project-right">
          <ul className="project-bullets">
            {project.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tech tags — full width bottom strip */}
      <div className="project-technologies">
        {project.technologies.map((tech, i) => (
          <span key={i} className="tag">{tech}</span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
