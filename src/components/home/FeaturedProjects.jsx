import React, { useState } from "react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import "../../styles/FeaturedProjects.css";

const FEATURED_PROJECTS = [
  {
    id: "01",
    codeTag: "SYS-AA01",
    title: "Athlete Arena",
    subtitle: "Sports & coaching ecosystem · 4,021 RPS",
    actionLabel: "Live project",
    href: "https://athlete-arena.vercel.app",
    image: "/images/Athlete Arena.gif",
    stack: ["Spring Boot", "React", "Redis", "MongoDB"],
    metrics: "4,021 RPS · 0% failure",
    stickers: [
      { label: "4,021 RPS", tone: "crimson", tilt: "-2.5deg" },
      { label: "REDIS + 2DSPHERE", tone: "outline", tilt: "2deg" },
    ],
  },
  {
    id: "02",
    codeTag: "SYS-VV02",
    title: "Verivaan",
    subtitle: "Tamper-evident agreement platform",
    actionLabel: "View project",
    href: "#work",
    image: "/images/VeriVaan.png",
    stack: ["Java", "Spring Boot", "React", "MySQL"],
    metrics: "Audit logs · Multi-party",
    stickers: [
      { label: "AUDIT TRAIL", tone: "crimson", tilt: "-2deg" },
      { label: "MULTI-PARTY RBAC", tone: "outline", tilt: "1.5deg" },
    ],
  },
  {
    id: "03",
    codeTag: "SYS-ER03",
    title: "Emergency Rescue",
    subtitle: "Real-time campus dispatch & NLP",
    actionLabel: "View project",
    href: "#work",
    image: "/images/Emergency Rescue System.png",
    stack: ["Socket.IO", "React", "MongoDB", "JWT"],
    metrics: "~40ms latency · 1,000+ users",
    stickers: [
      { label: "~40ms SOCKET.IO", tone: "crimson", tilt: "-1.5deg" },
      { label: "80% NLP", tone: "outline", tilt: "2.5deg" },
    ],
  },
  {
    id: "04",
    codeTag: "SYS-JP04",
    title: "Job Portal",
    subtitle: "RBAC REST API & live search engine",
    actionLabel: "Source code",
    href: "https://github.com/Harshkumarr911",
    image: "/images/hero-scale.jpg",
    stack: ["Java", "Spring Security", "JPA", "MySQL"],
    metrics: "WebSocket · Specifications",
    stickers: [
      { label: "SPRING SECURITY", tone: "crimson", tilt: "-2deg" },
      { label: "JPA SPECS", tone: "outline", tilt: "2deg" },
    ],
  },
];

export default function FeaturedProjects() {
  const [activeFolder, setActiveFolder] = useState(null);

  return (
    <section className="fp-section" id="projects">
      <div className="fp-container">
        {/* Header Row */}
        <div className="fp-header">
          <div className="fp-header-left">
            <h2 className="fp-title">
              Featured
              <br />
              Projects
            </h2>
            <p className="fp-subtitle">
              Independent systems and full-stack engineering work. Open a
              folder to inspect architecture, benchmarks, or live builds.
            </p>
          </div>

          <a
            href="https://github.com/Harshkumarr911"
            target="_blank"
            rel="noreferrer"
            className="fp-github-link"
          >
            <GithubLogo size={16} weight="bold" aria-hidden="true" />
            <span>GitHub</span>
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        </div>

        {/* 4-Column Interactive Folder Grid */}
        <div className="fp-folder-grid">
          {FEATURED_PROJECTS.map((project, index) => {
            const isOpen = activeFolder === project.id;

            return (
              <article
                key={project.id}
                className={`fp-folder-item ${isOpen ? "is-open" : ""}`}
                style={{ "--stagger": index }}
                onMouseEnter={() => setActiveFolder(project.id)}
                onMouseLeave={() => setActiveFolder(null)}
              >
                <a
                  href={project.href}
                  target={project.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    project.href.startsWith("http") ? "noreferrer" : undefined
                  }
                  className="fp-folder-link"
                  aria-label={`${project.title} — ${project.actionLabel}`}
                >
                  <div className="fp-folder-stage">
                    {/* Back Folder Plate + Left Tab */}
                    <div className="fp-folder-back">
                      <span className="fp-folder-tab" />
                    </div>

                    {/* 3 Fanned Inner Document / Preview Sheets */}
                    <div className="fp-sheet fp-sheet-left" aria-hidden="true">
                      <span className="fp-sheet-tag">{project.stack[0]}</span>
                      <span className="fp-sheet-tag">{project.stack[1]}</span>
                    </div>

                    <div className="fp-sheet fp-sheet-center" aria-hidden="true">
                      <img src={project.image} alt="" loading="lazy" />
                    </div>

                    <div className="fp-sheet fp-sheet-right" aria-hidden="true">
                      <span className="fp-sheet-metric">{project.metrics}</span>
                    </div>

                    {/* Front Folder Pocket with Blueprint Grid & Die-Cut Stickers */}
                    <div className="fp-folder-front">
                      <span className="fp-skin-grid" aria-hidden="true" />
                      <span className="fp-skin-crosshair" aria-hidden="true">
                        +
                      </span>

                      <div className="fp-folder-front-top">
                        <span className="fp-folder-index">
                          {project.id} · {project.codeTag}
                        </span>

                        <div className="fp-sticker-row" aria-hidden="true">
                          {project.stickers.map((sticker) => (
                            <span
                              key={sticker.label}
                              className={`fp-sticker fp-sticker--${sticker.tone}`}
                              style={{ "--tilt": sticker.tilt }}
                            >
                              {sticker.label}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="fp-folder-front-bottom">
                        <h3 className="fp-folder-name">{project.title}</h3>
                        <span className="fp-folder-arrow" aria-hidden="true">
                          <ArrowUpRight size={16} weight="bold" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Metadata Footer Below Folder */}
                  <div className="fp-meta-row">
                    <span className="fp-meta-desc">{project.subtitle}</span>
                    <span className="fp-meta-cta">
                      {project.actionLabel}
                      <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}