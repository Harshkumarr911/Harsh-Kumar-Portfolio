import React, { useState } from "react";
import {
  Trophy,
  GraduationCap,
  Briefcase,
  Code,
  Certificate,
  SealCheck,
  CaretDown,
  X,
} from "@phosphor-icons/react";
import "../../styles/Achievements.css";

const ACHIEVEMENTS = [
  {
    id: "01",
    year: "2026",
    category: "Capstone Evaluation",
    title: "#1 of All Teams — Athlete Arena",
    shortDesc: "Highest evaluation score across all final-year engineering teams",
    heroMetric: "#01",
    metricLabel: "Rank Among All Capstone Teams",
    icon: Trophy,
    quote:
      "Led the 4-member engineering squad as Team Lead, owning end-to-end technical execution — Spring Boot architecture, Redis caching, JWT security, and feature delivery — achieving the highest evaluation score among all teams.",
    source:
      "Final Year Project Evaluation · Allenhouse Institute of Technology",
    proofTags: [
      "100% Load-Test Success",
      "Team Lead (4 Devs)",
      "Spring Boot + React",
    ],
    barLabel: "EVALUATION & LOAD-TEST SCORE",
    barValue: "100%",
  },
  {
    id: "02",
    year: "2026",
    category: "National Benchmark",
    title: "GATE CSE 2026 Qualified",
    shortDesc: "Graduate Aptitude Test in Engineering (Computer Science)",
    heroMetric: "GATE",
    metricLabel: "Computer Science & Engineering · 2026",
    icon: GraduationCap,
    quote:
      "Qualified GATE Computer Science & Engineering 2026 — validating rigorous core foundations across Data Structures, Algorithms, Operating Systems, DBMS, Computer Networks, and Theory of Computation.",
    source: "Graduate Aptitude Test in Engineering · IIT Guwahati Exam",
    proofTags: ["Algorithms & DS", "DBMS & OS", "Computer Networks"],
    barLabel: "CORE CS SYSTEMS FOUNDATION",
    barValue: "VERIFIED",
  },
  {
    id: "03",
    year: "2025",
    category: "Industry Training",
    title: "MERN Stack Internship",
    shortDesc: "Full-stack engineering internship building production web modules",
    heroMetric: "2025",
    metricLabel: "Full-Stack Development Internship",
    icon: Briefcase,
    quote:
      "Completed hands-on full-stack engineering internship building modular RESTful APIs, authentication workflows, MongoDB schemas, and responsive React user interfaces across structured sprint cycles.",
    source: "MERN Stack Technology Internship · 2025",
    proofTags: ["REST APIs", "React & Node.js", "MongoDB"],
    barLabel: "SPRINT DELIVERY COMPLETION",
    barValue: "100%",
  },
  {
    id: "04",
    year: "2026",
    category: "Algorithmic Practice",
    title: "200+ DSA Problems Solved",
    shortDesc: "Consistent problem solving across LeetCode & GeeksforGeeks",
    heroMetric: "200+",
    metricLabel: "Algorithmic Problems Solved",
    icon: Code,
    quote:
      "Consistent algorithmic practice across arrays, trees, graphs, dynamic programming, and sliding-window patterns — prioritizing optimal O(1) auxiliary space and clean time complexity.",
    source: "LeetCode & GeeksforGeeks Coding Profiles",
    proofTags: [
      "Trees & Graphs",
      "Dynamic Programming",
      "O(1) Space Optimization",
    ],
    barLabel: "CONSISTENCY & COMPLEXITY FOCUS",
    barValue: "ACTIVE",
  },
  {
    id: "05",
    year: "2025",
    category: "Verified Credential",
    title: "Crio.do Java Certification",
    shortDesc: "Java Programming, Beginner to Advanced Track — 2025",
    heroMetric: "JAVA",
    metricLabel: "Beginner to Advanced Track · 2025",
    icon: Certificate,
    quote:
      "Completed intensive project-driven Java engineering track covering Object-Oriented Design, Collections internals, Multithreading, Exception Handling, and clean backend coding practices.",
    source: "Crio.do · Java Programming Track (2025)",
    proofTags: ["Core Java & OOP", "Collections & Streams", "Multithreading"],
    barLabel: "CERTIFICATION TRACK",
    barValue: "COMPLETED",
  },
];

export default function Achievements() {
  // Default open first milestone so users immediately see the structured drawer
  const [openId, setOpenId] = useState("01");

  const toggleDrawer = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="ac-section" id="achievements">
      <div className="ac-container">
        {/* Section Header */}
        <div className="ac-header">
          <div>
            <span className="ac-kicker">05 / Verified Milestones</span>
            <h2 className="ac-title">
              What I&apos;ve
              <br />
              accomplished.
            </h2>
          </div>

          <p className="ac-subtitle">
            Academic benchmarks, capstone leadership, and verified engineering
            output. Click any milestone to expand its verification record below.
          </p>
        </div>

        {/* Architectural Ledger with Inline Expandable Proof Drawers */}
        <div className="ac-accordion-list">
          {ACHIEVEMENTS.map((item) => {
            const IconComponent = item.icon;
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`ac-item ${isOpen ? "is-open" : ""}`}
              >
                {/* Clickable Row Header */}
                <button
                  type="button"
                  className="ac-row-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`ac-drawer-${item.id}`}
                  onClick={() => toggleDrawer(item.id)}
                >
                  <div className="ac-row-left">
                    <span className="ac-row-num">{item.id}</span>

                    <span className="ac-row-icon" aria-hidden="true">
                      <IconComponent size={18} weight="regular" />
                    </span>

                    <div className="ac-row-heading">
                      <div className="ac-row-meta-mobile">
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.year}</span>
                      </div>
                      <h3 className="ac-row-title">{item.title}</h3>
                      <p className="ac-row-sub">{item.shortDesc}</p>
                    </div>
                  </div>

                  {/* Right Side: Category Tag + Explicit Action Button */}
                  <div className="ac-row-right">
                    <span className="ac-row-category">{item.category}</span>
                    <span className="ac-row-year">{item.year}</span>

                    <span className="ac-inspect-btn">
                      <span>{isOpen ? "Close" : "Inspect proof"}</span>
                      {isOpen ? (
                        <X size={14} weight="bold" aria-hidden="true" />
                      ) : (
                        <CaretDown size={14} weight="bold" aria-hidden="true" />
                      )}
                    </span>
                  </div>
                </button>

                {/* Inline Expandable Verification Modal/Drawer Directly Below */}
                <div
                  id={`ac-drawer-${item.id}`}
                  className="ac-drawer-collapse"
                  role="region"
                  aria-hidden={!isOpen}
                >
                  <div className="ac-drawer-inner">
                    <div className="ac-drawer-card">
                      {/* Left Column of Drawer: Giant KPI + Verification Seal */}
                      <div className="ac-drawer-kpi-col">
                        <span className="ac-verified-pill">
                          <SealCheck size={15} weight="fill" aria-hidden="true" />
                          <span>Verified Record · {item.id}</span>
                        </span>

                        <div className="ac-kpi-number">{item.heroMetric}</div>
                        <div className="ac-kpi-caption">{item.metricLabel}</div>
                      </div>

                      {/* Right Column of Drawer: Detailed Evidence + Tags + Meter */}
                      <div className="ac-drawer-detail-col">
                        <blockquote className="ac-drawer-quote">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>

                        <div className="ac-drawer-source">— {item.source}</div>

                        <div className="ac-drawer-tags">
                          {item.proofTags.map((tag) => (
                            <span key={tag} className="ac-drawer-tag">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="ac-drawer-meter">
                          <div className="ac-meter-top">
                            <span>{item.barLabel}</span>
                            <strong>{item.barValue}</strong>
                          </div>
                          <div className="ac-meter-track">
                            <span className="ac-meter-fill" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}