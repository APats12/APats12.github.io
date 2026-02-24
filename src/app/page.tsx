import Image from "next/image";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import styles from "./page.module.css";

export default function Home() {
  const skillGroups = [
    {
      category: "Languages",
      items: [
        "Python",
        "C++",
        "Go",
        "Swift",
        "Objective-C",
        "SQL",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
      ],
    },
    { category: "Frameworks", items: ["React", "Next.js", "Angular"] },
    {
      category: "ML / NLP",
      items: ["scikit-learn", "SHAP", "Pandas", "NumPy", "Matplotlib", "Gemini API"],
    },
    {
      category: "Cloud / DevOps",
      items: ["Google Cloud Run", "Cloud Storage", "Docker", "GitHub"],
    },
  ];

  return (
    <div id="top" className={styles.home}>
      <header className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={`${styles.navLogo} mono`}>
            <span className={styles.logoBracket}>&lt;</span>
            <span className={styles.logoText}>ap12</span>
            <span className={styles.logoBracket}>/&gt;</span>
          </div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#top">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="/AryanDPatelResume.pdf" target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLeft}>
            <div className={styles.heroText}>
              <h1 className={styles.heroName}>
                hey, i&apos;m <span className={styles.highlightName}>aryan</span>!
              </h1>
              <p className={styles.heroSubtitle}>
                cs @ <span className={styles.highlightName}>uc santa cruz</span>
              </p>
              <p className={styles.heroTagline}>
                curious engineer. collaborative builder. lifelong learner.
              </p>
            </div>

            <div className={styles.heroSkills}>
              {skillGroups.map((group) => (
                <div key={group.category} className={styles.skillRow}>
                  <div className={styles.skillLabel}>{group.category}</div>
                  <div className={styles.skillTags}>
                    {group.items.map((skill) => (
                      <span key={skill} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.heroRight}>
            <div className={styles.heroImage}>
              <Image
                src="/aryan.png"
                alt="Aryan Patel standing in front of mountains and water"
                fill
                sizes="(max-width: 768px) 250px, (max-width: 1100px) 300px, 380px"
                className={styles.heroPhoto}
                priority
              />
            </div>

            <div className={styles.heroSocial}>
              <a className={styles.socialLink} href="mailto:aryandhpatel12@gmail.com">
                <FaEnvelope className={styles.socialIcon} aria-hidden />
                <span className={styles.srOnly}>Email</span>
              </a>
              <a
                className={styles.socialLink}
                href="https://github.com/APats12"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub className={styles.socialIcon} aria-hidden />
                <span className={styles.srOnly}>GitHub</span>
              </a>
              <a
                className={styles.socialLink}
                href="https://www.linkedin.com/in/aryan-patel-485ab71aa/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className={styles.socialIcon} aria-hidden />
                <span className={styles.srOnly}>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <section id="about" className={styles.sections}>
        <div className={styles.section}>
          <p className={styles.sectionLabel}>&lt; about &gt;</p>
          <h2 className={styles.sectionTitle}>who i am</h2>
          <p className={styles.sectionBody}>
            i&apos;m aryan, a computer science graduate from uc santa cruz&apos;s jack
            baskin school of engineering. i like working across the stack on
            practical systems — from cloud pipelines and data tooling to ml/nlp
            projects that surface useful insights.
          </p>
        </div>

        <div id="experience" className={styles.section}>
          <p className={styles.sectionLabel}>&lt; experience &gt;</p>
          <div className={styles.experienceList}>
            <div>
              <p className={styles.itemTitle}>
                software engineer intern · lighted road ai
              </p>
              <p className={styles.itemMeta}>jan 2025 – oct 2025 · remote</p>
              <p className={styles.itemDescription}>
                built an explainable scenario analysis pipeline (random forests +
                shap + gemini), automated multi-sheet excel reporting, and
                deployed reproducible workflows on google cloud run + cloud storage.
              </p>
            </div>
            <div>
              <p className={styles.itemTitle}>
                mobile software dev intern · kaiser permanente
              </p>
              <p className={styles.itemMeta}>jun 2023 – sept 2023 · remote</p>
              <p className={styles.itemDescription}>
                shipped swift/kotlin features for flagship mobile apps, and led a
                swiftui multidrug interaction experience to help reduce medication
                errors for millions of users.
              </p>
            </div>
            <div>
              <p className={styles.itemTitle}>
                frontend web developer · tech4good lab
              </p>
              <p className={styles.itemMeta}>dec 2022 – jun 2023 · santa cruz</p>
              <p className={styles.itemDescription}>
                built and maintained web pages + dashboards with typescript and
                angular, collaborating with researchers to turn qualitative data
                into interactive tools.
              </p>
            </div>
          </div>
        </div>

        <div id="projects" className={styles.section}>
          <p className={styles.sectionLabel}>&lt; projects &gt;</p>
          <div className={styles.projectList}>
            <div>
              <p className={styles.itemTitle}>twitter hate speech detector</p>
              <p className={styles.itemMeta}>python · nlp · gemini</p>
              <p className={styles.itemDescription}>
                tf‑idf + logistic regression model (88% accuracy, 0.72 macro‑f1)
                over 25k+ tweets, with outputs compared against gemini to study
                alignment, bias, and explainability.
              </p>
            </div>
            <div>
              <p className={styles.itemTitle}>multi‑threaded http server</p>
              <p className={styles.itemMeta}>c++ · pthreads</p>
              <p className={styles.itemDescription}>
                concurrent http server handling get/put requests using dynamic
                queues and mutexes for thread safety, with proper request parsing,
                logging, and graceful shutdown.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
