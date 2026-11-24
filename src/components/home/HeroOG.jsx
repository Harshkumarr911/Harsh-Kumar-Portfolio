import useReveal from "../../hooks/useReveal";
import FeaturedProjects from "./FeaturedProjects";
import { useTheme } from "../../hooks/useTheme";
import { Sun, Moon, ArrowDown } from "@phosphor-icons/react";
// import "./Hero.css";

const gallery = [
  {
    number: "01",
    label: "The Engineer",
    image: "/images/hero-engineer.jpg", // Apni image yahan lagayein
    href: "#about",
    className: "panel-short",
  },
  {
    number: "02",
    label: "Athlete Arena",
    image: "/images/Athlete Arena.gif",
    href: "#projects",
    className: "panel-medium",
  },
  {
    number: "03",
    label: "Verivaan",
    image: "/images/VeriVaan.png",
    href: "#projects",
    className: "panel-tall",
  },
  {
    number: "04",
    label: "Emergency Rescue",
    image: "/images/Emergency Rescue System.png",
    href: "#projects",
    className: "panel-medium",
  },
  {
    number: "05",
    label: "Systems & Scale",
    image: "/images/hero-scale.jpg", // Apni image yahan lagayein
    href: "#contact",
    className: "panel-short",
  },
];

function Hero() {
  useReveal();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <section className="new-hero" id="home">
        <div className="new-hero-inner">
          {/* Top Navigation Bar */}
          <header className="hero-topline">
  <a href="#home" className="topline-identity">
    <svg
      className="topline-emblem"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 15L18 7L30 15"
        stroke="var(--accent-crimson)"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
      <path
        d="M12 16V28M24 16V28M12 22H24"
        stroke="var(--text-main)"
        strokeWidth="2.2"
        strokeLinecap="square"
      />
    </svg>

    <div className="identity-meta">
      <span className="identity-title">Harsh Kumar</span>
      <span className="identity-role">
        Backend &amp; Full-Stack Engineer 
      </span>
    </div>
  </a>

  {/* Right side: Theme Toggle + Resume */}
  <div className="topline-actions">
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <span className="theme-icon-wrap" aria-hidden="true">
        {theme === "dark" ? (
          <Sun size={16} weight="bold" />
        ) : (
          <Moon size={16} weight="bold" />
        )}
      </span>
      <span className="theme-toggle-label">
        {theme === "dark" ? "Light" : "Dark"}
      </span>
    </button>

    <a
      href="/Harsh_Kumar_Resume.pdf"
      target="_blank"
      rel="noreferrer"
      className="nav-resume-btn"
    >
      <span>Resume</span>
      <ArrowDown size={14} weight="bold" aria-hidden="true" />
    </a>
  </div>
</header>

          {/* Split Hero Stage: Left Typography + Right Custom Visual Slot */}
          <div className="hero-split-stage">
            <div className="hero-title-block">
              <h1 className="hero-main-title">
                <span>Commit.</span>
                <span>Compile.</span>
                <span className="title-accent">Ship.</span>
              </h1>

              <p className="hero-tagline">
                Java, Spring Boot, and React systems engineered for real
                traffic—load tested and deployed, not just demoed.
              </p>

              {/* Rule #10: One Main Button + One Subtle Text Link */}
              <div className="hero-cta-row">
                <a href="#projects" className="btn-primary-crimson">
                  Explore projects ↗
                </a>
                <a
                  href="mailto:harshkumarr9251@gmail.com"
                  className="btn-text-link"
                >
                  Get in touch ↗
                </a>
              </div>
            </div>

            {/* YAHAN APNI RIGHT-SIDE HERO IMAGE LAGAYEIN */}
            <div className="hero-visual-slot">
              <img
                src="/images/hero-main-visual.png"
                alt="Backend architecture and system preview"
              />
              <div className="visual-vignette" aria-hidden="true" />
            </div>
          </div>

          {/* 5-Card Stepped Gallery */}
          <div
            className="hero-gallery-new"
            role="region"
            aria-label="Portfolio highlights"
          >
            {gallery.map((item, index) => (
              <a
                href={item.href}
                className={`hero-panel ${item.className}`}
                key={item.number}
                style={{ "--panel-index": index }}
              >
                <div className="panel-image">
                  <img
                    src={item.image}
                    alt={item.label}
                    loading={index < 3 ? "eager" : "lazy"}
                  />
                  <div className="panel-shade" />
                  <span className="panel-number">{item.number}</span>
                  <span className="panel-label">{item.label}</span>
                  <span className="panel-corner" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Introduction Section */}
          <div className="hero-intro-new reveal" id="about">
            <div className="intro-heading-new">
              <span className="section-index">01 / Introduction</span>
              <h2>
                Curious mind.
                <br />
                <em>Engineer by choice.</em>
              </h2>
            </div>

            <div className="intro-content-new">
              <p className="intro-main-text">
                I&apos;m Harsh Kumar, a software engineer who enjoys
                understanding problems deeply and building practical software
                around them.
              </p>

              <p className="intro-sub-text">
                Working primarily with Java, Spring Boot, React and databases.
                Interested in backend architecture, security, scalable
                applications and product engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
}

export default Hero;