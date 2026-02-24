import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard, { Project } from '../components/ProjectCard';
import './Projects.css';

const projects: Project[] = [
  {
    id: 1,
    name: 'ClutchFactor — NFL Win Probability',
    description: 'Real-time NFL analytics platform delivering live win-probability predictions with explainable AI — updating a live probability curve and surfacing the top model features driving each prediction on every play.',
    category: 'ML / Full-Stack',
    bullets: [
      'Trained XGBoost classifier on 8 seasons (2016–2023) of play-by-play data with Platt/isotonic calibration and time-based forward-chaining CV to prevent temporal leakage',
      'Integrated SHAP TreeExplainer for instant per-play feature attribution, momentum detection (largest win-prob swings), clutch scoring by quarter, and 4th-down go/kick grading against EV thresholds',
      'Built full-stack system with FastAPI + SQLAlchemy + Celery backend streaming updates via SSE, PostgreSQL + Redis data layer, and a React 18/TypeScript frontend using Recharts and Zustand',
    ],
    technologies: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Celery', 'React 18', 'TypeScript', 'PostgreSQL', 'Redis', 'Recharts', 'Zustand', 'Docker'],
    github: 'https://github.com/APats12/clutchfactor',
  },
  {
    id: 2,
    name: 'Twitter Hate Speech Detector',
    description: 'NLP model to classify hate and offensive speech in tweets with TF-IDF and Logistic Regression.',
    category: 'ML / NLP',
    bullets: [
      'Achieved 88% accuracy and 0.72 macro-F1 on 25K+ tweet dataset',
      'Cleaned and processed data through tokenization, n-gram extraction, and stopword filtering',
      'Compared model predictions with Gemini 2.5 Flash for alignment, bias analysis, and explainability',
    ],
    technologies: ['Python', 'Gemini API', 'TF-IDF', 'Logistic Regression', 'scikit-learn'],
    github: 'https://github.com/APats12',
  },
  {
    id: 3,
    name: 'Multi-Threaded HTTP Server',
    description: 'Concurrent HTTP server handling GET/PUT requests with pthreads and dynamic queues.',
    category: 'Systems',
    bullets: [
      'Developed multithreaded HTTP server using pthreads and dynamic queues for efficient connection handling',
      'Implemented request parsing and response generation for GET/PUT with error handling and logging',
      'Used mutex locks for thread safety, signal handling for graceful shutdown',
    ],
    technologies: ['C++', 'pthreads', 'HTTP', 'Socket Programming'],
    github: 'https://github.com/APats12/CSD/tree/main/Multi-threadedHTTPServer',
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <div className="projects">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <span className="mono">&lt;</span>
            projects
            <span className="mono">/&gt;</span>
          </h1>
          <p className="projects-subtitle">selected builds</p>
        </motion.div>

        <div className="projects-stage">
          <button
            className="stage-btn"
            onClick={() => goTo(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <span className="mono">&lt;</span>
          </button>

          <div className="stage-card-wrap">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="stage-card-motion"
              >
                <ProjectCard project={projects[activeIndex]} index={activeIndex} />
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            className="stage-btn"
            onClick={() => goTo(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            aria-label="Next project"
          >
            <span className="mono">&gt;</span>
          </button>
        </div>

        <div className="projects-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`dot${i === activeIndex ? ' dot-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
