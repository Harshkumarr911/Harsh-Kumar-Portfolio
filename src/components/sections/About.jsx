import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import "../../styles/About.css";

const JOURNEY_MILESTONES = [
  {
    id: "01",
    year: "2026",
    period: "JUN 2026 — PRESENT",
    role: "B.Tech Graduate & GATE CSE 2026 Qualified",
    org: "Allenhouse Institute of Technology · IIT Guwahati Exam",
    summary:
      "Graduated in Computer Science & Engineering, qualified GATE CSE 2026, and ranked #1 in final-year capstone evaluation.",
  },
  {
    id: "02",
    year: "2026",
    period: "JAN 2026 — MAY 2026",
    role: "Backend & Systems Architect",
    org: "Verivaan & Emergency Rescue",
    summary:
      "Built Verivaan (tamper-evident audit logs & RBAC) and Emergency Rescue (~40ms Socket.IO dispatch), verified at 4,021 RPS in k6.",
  },
  {
    id: "03",
    year: "2025",
    period: "AUG 2025 — DEC 2025",
    role: "Team Lead — Athlete Arena",
    org: "4-Member Engineering Squad",
    summary:
      "Owned Spring Boot architecture, MongoDB 2dsphere + Redis caching, JWT security, and sprint delivery end to end.",
  },
  {
    id: "04",
    year: "2025",
    period: "MAY 2025 — JUL 2025",
    role: "Full-Stack Developer Intern",
    org: "MERN Stack Engineering",
    summary:
      "Engineered modular REST APIs, auth flows, and responsive React interfaces with optimized database queries.",
  },
  {
    id: "05",
    year: "2022",
    period: "SEP 2022 — 2024",
    role: "B.Tech CSE & Algorithmic Foundation",
    org: "Allenhouse Institute of Technology, Kanpur",
    summary:
      "Mastered DSA, DBMS, OS, and Computer Networks while solving 150+ algorithmic problems on LeetCode & GeeksforGeeks.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollRatio, setScrollRatio] = useState(0);
  const feedRef = useRef(null);
  const itemRefs = useRef([]);

  // Continuous 60fps scroll tracking anchored to viewport center
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.5;
        let closestIdx = 0;
        let minDistance = Infinity;

        itemRefs.current.forEach((el, idx) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height * 0.5;
          const dist = Math.abs(elCenter - viewportCenter);

          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);

        // Smooth continuous progress bar across the timeline feed
        const firstEl = itemRefs.current[0];
        const lastEl = itemRefs.current[itemRefs.current.length - 1];
        if (firstEl && lastEl) {
          const startY =
            firstEl.getBoundingClientRect().top +
            firstEl.offsetHeight * 0.5 -
            viewportCenter;
          const endY =
            lastEl.getBoundingClientRect().top +
            lastEl.offsetHeight * 0.5 -
            viewportCenter;
          const span = endY - startY;

          if (span > 0) {
            const raw = (-startY / span) * 100;
            setScrollRatio(Math.min(100, Math.max(0, raw)));
          }
        }

        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const current = JOURNEY_MILESTONES[activeIndex] || JOURNEY_MILESTONES[0];

  const scrollToMilestone = (index) => {
    const target = itemRefs.current[index];
    if (!target) return;

    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "center",
    });
  };

  return (
    <section className="ab-section" id="about">
      <div className="ab-container">
        {/* Top Editorial Thesis Header */}
        <div className="ab-intro-grid">
          <div className="ab-intro-left">
            <span className="ab-kicker">01 / About &amp; Story</span>
            <h2 className="ab-headline">
              Engineering systems built to survive real traffic.
            </h2>
          </div>

          <div className="ab-intro-right">
            <p className="ab-lead">
              Computer Science graduate (June 2026) and GATE CSE 2026 qualified.
              Focused on layered Spring Boot services, JWT security, Redis
              caching, and algorithmic problem solving.
            </p>
            <p className="ab-sublead">
              Verified across{" "}
              <span className="ab-highlight">100,000+ load iterations</span>{" "}
              — built for real production traffic, not local demos.
            </p>
          </div>
        </div>

        {/* Split Timeline Stage: Left Vertically-Centered Sticky Year + Right Feed */}
        <div className="ab-story-split">
          <div className="ab-left-track">
            <aside
              className="ab-sticky-center"
              aria-label="Timeline year indicator"
            >
              <div className="ab-story-label">
                <span className="ab-dot" aria-hidden="true" />
                <span>My story</span>
              </div>

              <h3 className="ab-story-prompt">Let&apos;s go back in time.</h3>

              {/* Smooth Rolling Year Display */}
              <div className="ab-year-window">
                <div className="ab-year-display" key={current.year}>
                  {current.year}
                </div>
              </div>

              <div className="ab-period-tag">{current.period}</div>

              {/* Continuous Scroll Progress Gauge */}
              <div className="ab-progress-row">
                <span className="ab-counter">
                  <strong>{current.id}</strong> /{" "}
                  {String(JOURNEY_MILESTONES.length).padStart(2, "0")}
                </span>

                <div
                  className="ab-progress-track"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={JOURNEY_MILESTONES.length}
                  aria-valuenow={activeIndex + 1}
                >
                  <span
                    className="ab-progress-fill"
                    style={{
                      width: `${Math.max(
                        20,
                        scrollRatio ||
                          ((activeIndex + 1) / JOURNEY_MILESTONES.length) * 100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </aside>
          </div>

          {/* Right Milestone Feed */}
          <div className="ab-timeline-feed" ref={feedRef}>
            {JOURNEY_MILESTONES.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`ab-milestone ${isActive ? "is-active" : ""}`}
                  onClick={() => scrollToMilestone(index)}
                >
                  <span className="ab-spine-node" aria-hidden="true" />

                  <div className="ab-milestone-meta">
                    <span className="ab-milestone-period">{item.period}</span>
                    <span className="ab-milestone-step">{item.id}</span>
                  </div>

                  <h4 className="ab-milestone-role">{item.role}</h4>
                  <p className="ab-milestone-org">{item.org}</p>
                  <p className="ab-milestone-summary">{item.summary}</p>
                </article>
              );
            })}

            <div className="ab-feed-footer">
              <a
                href="/Harsh_Kumar_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="ab-resume-link"
              >
                <span>Open full resume</span>
                <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}