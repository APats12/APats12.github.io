import { motion } from 'framer-motion';
import InteractiveTerminal from '../components/InteractiveTerminal';
import './Home.css';

const skillGroups = [
  { category: 'LANGUAGES', items: ['Python', 'Go', 'TypeScript', 'SQL', 'C++', 'Swift', 'HTML'] },
  { category: 'FRONTEND', items: ['React', 'Next.js', 'Tailwind', 'Angular'] },
  { category: 'BACKEND', items: ['FastAPI', 'Node.js', 'PostgreSQL', 'REST APIs'] },
  { category: 'AI / ML', items: ['PyTorch', 'scikit-learn', 'SHAP', 'Hugging Face', 'Gemini API', 'Pandas', 'NumPy'] },
  { category: 'CLOUD / DEVOPS', items: ['Docker', 'Google Cloud', 'Kubernetes', 'CI/CD'] },
];

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-left">
            <motion.div
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="hero-name">
                hey, i'm <span className="highlight-name">aryan</span>!
              </h1>
              <p className="hero-subtitle">
                cs @ <span className="highlight">uc santa cruz</span>
              </p>
              <p className="hero-tagline">
                curious engineer. collaborative builder. lifelong learner.
              </p>
            </motion.div>

            <motion.div
              className="hero-skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {skillGroups.map((group) => (
                <div key={group.category} className="skill-row">
                  <span className="skill-label mono">{group.category}</span>
                  <div className="skill-tags">
                    {group.items.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hero-right">
            <InteractiveTerminal />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
