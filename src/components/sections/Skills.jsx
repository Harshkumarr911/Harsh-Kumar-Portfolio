import React, { useState } from "react";
import "../../styles/Skills.css";

const SKILL_DOMAINS = [
  {
    index: "01",
    category: "Backend & Architecture",
    note: "Production REST services, auth layers, and concurrent systems.",
    skills: [
      "Spring Boot",
      "Spring Core",
      "Spring Security",
      "REST APIs",
      "JWT / RBAC",
      "Socket.IO",
      "Microservices",
      "Multithreading",
    ],
  },
  {
    index: "02",
    category: "Languages",
    note: "Strongly typed backend logic, scripting, and relational querying.",
    skills: ["Java", "JavaScript (ES6+)", "SQL"],
  },
  {
    index: "03",
    category: "Databases & Caching",
    note: "Relational schemas, document indexing, and low-latency caching.",
    skills: ["MySQL", "MongoDB", "Redis"],
  },
  {
    index: "04",
    category: "Frontend Engineering",
    note: "Component-driven interfaces with responsive layouts and state.",
    skills: ["React JS", "HTML5", "CSS3", "Responsive Design"],
  },
  {
    index: "05",
    category: "Testing & Verification",
    note: "Load benchmarking, automated assertions, and API validation.",
    skills: [
      "k6 Load Testing",
      "JMeter",
      "JUnit",
      "Postman",
      "Playwright",
      "Git / GitHub",
    ],
  },
  {
    index: "06",
    category: "CS Fundamentals",
    note: "GATE CSE 2026 qualified foundation in systems and algorithms.",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "System Design",
      "Computer Networks",
    ],
  },
];

const LEADERSHIP_ITEMS = [
  {
    number: "01",
    title: "Team Leadership",
    detail:
      "Led a 4-member engineering team as Team Lead through a full project lifecycle.",
  },
  {
    number: "02",
    title: "Ownership",
    detail:
      "Owned system design, architecture, and technical decisions end to end.",
  },
  {
    number: "03",
    title: "Sprint Planning",
    detail: "Ran sprint planning and kept feature delivery on schedule.",
  },
  {
    number: "04",
    title: "Collaboration",
    detail: "Collaborated across roles to ship reliable, evaluated software.",
  },
];

export default function Skills() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <section className="sk-section" id="skills">
      <div className="sk-container">
        {/* Header Matching Featured Projects Scale & Whitespace */}
        <div className="sk-header">
          <div className="sk-header-left">
            <span className="sk-kicker">03 / Capabilities</span>
            <h2 className="sk-title">
              What I
              <br />
              build with.
            </h2>
          </div>

          <p className="sk-subtitle">
            Six core technical domains—plus the engineering ownership picked up
            leading a team that never shows up in a stack trace.
          </p>
        </div>

        {/* Open Architectural Index Rows (No Congested Boxed Cards) */}
        <div className="sk-index-list">
          {SKILL_DOMAINS.map((domain) => {
            const isActive = hoveredRow === domain.index;

            return (
              <div
                key={domain.index}
                className={`sk-row ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setHoveredRow(domain.index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* Left Column: Index + Domain Title + Brief Context */}
                <div className="sk-row-left">
                  <span className="sk-row-num">{domain.index}</span>
                  <div className="sk-row-meta">
                    <h3 className="sk-row-title">{domain.category}</h3>
                    <p className="sk-row-note">{domain.note}</p>
                  </div>
                </div>

                {/* Right Column: Clean Editorial Skill List */}
                <div className="sk-row-right">
                  {domain.skills.map((skill, idx) => (
                    <React.Fragment key={skill}>
                      <span className="sk-skill-item">{skill}</span>
                      {idx < domain.skills.length - 1 && (
                        <span className="sk-skill-sep" aria-hidden="true">
                          /
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Beyond The Stack — Open 4-Column Architectural Strip */}
        <div className="sk-beyond">
          <div className="sk-beyond-top">
            <span className="sk-kicker">Beyond the stack</span>
          </div>

          <div className="sk-beyond-grid">
            {LEADERSHIP_ITEMS.map((item) => (
              <div key={item.number} className="sk-beyond-col">
                <span className="sk-beyond-num">{item.number}</span>
                <h4 className="sk-beyond-title">{item.title}</h4>
                <p className="sk-beyond-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}