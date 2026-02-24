import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import './About.css';

const experiences = [
  {
    role: 'Software Engineer Intern',
    company: 'Lighted Road AI',
    period: 'Jan 2025 – Oct 2025',
    description: 'Developed end-to-end Python/Colab scenario analysis pipeline with RandomForestRegressor, SHAP, and Gemini APIs for explainable AI insights. Automated data ingestion and multi-sheet Excel reporting. Deployed scalable workflows on Google Cloud Run and Cloud Storage.',
  },
  {
    role: 'Mobile Software Development Intern',
    company: 'Kaiser Permanente',
    period: 'Jun 2023 – Sept 2023',
    description: 'Enhanced KP flagship mobile app by implementing core features in Swift and Kotlin. Led design of SwiftUI multidrug interaction feature, reducing medication error risk for 9M+ users. Improved codebase quality and streamlined Agile processes.',
  },
  {
    role: 'Frontend Web Developer',
    company: 'Tech4Good Lab',
    period: 'Dec 2022 – Jun 2023',
    description: 'Built and maintained web pages and applications with HTML, CSS, TypeScript, and Angular. Collaborated with researchers to translate qualitative data into interactive dashboards, supporting 40% user growth.',
  },
];

const About = () => {
  return (
    <div className="about">
      <div className="container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">
            <span className="mono">&lt;</span>
            about me
            <span className="mono">/&gt;</span>
          </h1>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="about-section">
            <h2>who i am</h2>
            <p>
              I'm <span className="highlight">Aryan</span>, a Computer Science graduate from{' '}
              <span className="highlight">UC Santa Cruz's Jack Baskin School of Engineering</span>.
              I like building practical software, from cloud pipelines and data tooling to
              ml/nlp projects that surface useful insights.
            </p>
          </div>

          <div className="about-section">
            <h2>what i do</h2>
            <p>
            My work spans software engineering, ML/NLP, and cloud infrastructure.
            At Lighted Road AI, I built explainable scenario-analysis pipelines that translated complex datasets into actionable insights. At Kaiser Permanente, I shipped mobile features used in real healthcare workflows. At Tech4Good Lab, I helped design and deploy full-stack dashboards that bridged technical systems with real users.
            </p>
          </div>

          <div className="about-section">
            <h2>beyond code</h2>
            <p>
            Outside of tech, I love sports, whether that’s playing pickup or watching football, basketball, or soccer. I’m also into photography and always on the lookout for good food and new spots to try.
            </p>
          </div>

          <div className="about-social">
            <SocialLinks size="large" showLabels />
          </div>
        </motion.div>

        <motion.div
          className="experience-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="mono">&lt;</span>
            experience
            <span className="mono">/&gt;</span>
          </h2>

          <div className="experience-grid">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                className="experience-card card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-period mono">{exp.period}</span>
                </div>
                <p className="exp-company">{exp.company}</p>
                <p className="exp-description">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
