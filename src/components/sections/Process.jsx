import React, { useEffect, useRef, useState } from "react";
import {
  MagnifyingGlass,
  GitBranch,
  CodeBlock,
  RocketLaunch,
  ArrowsClockwise,
  CheckCircle,
} from "@phosphor-icons/react";
import "../../styles/Process.css";

const PROCESS_STEPS = [
  {
    number: "01",
    phase: "Discover",
    tag: "Constraints First",
    icon: MagnifyingGlass,
    frontSummary:
      "Map traffic patterns, latency budgets, and failure modes before writing a single line of code.",
    backTitle: "System Spec & Bottleneck Map",
    backDetails: [
      "Define < 50ms p95 API latency budgets and read/write ratios upfront.",
      "Identify concurrency hotspots and team ownership boundaries early.",
    ],
    metric: "Zero guesswork before architecture",
  },
  {
    number: "02",
    phase: "Architect",
    tag: "Blueprint & Data",
    icon: GitBranch,
    frontSummary:
      "Design layered Controller → Service → Repository boundaries with purposeful caching and indexing.",
    backTitle: "Schema, Indexing & Cache Layer",
    backDetails: [
      "Redis TTL caching for hot reads + MongoDB 2dsphere / MySQL B-tree indexes.",
      "Stateless JWT authentication with strict Role-Based Access Control (RBAC).",
    ],
    metric: "Controller → Service → Repository",
  },
  {
    number: "03",
    phase: "Build",
    tag: "Incremental Shipping",
    icon: CodeBlock,
    frontSummary:
      "Ship Spring Boot services and React interfaces in small, reviewable commits backed by automated tests.",
    backTitle: "Typed Contracts & Verification",
    backDetails: [
      "Clean DTO validation, global exception handling, and JUnit service coverage.",
      "End-to-end Postman & Playwright contract verification across flows.",
    ],
    metric: "Clean, reviewable vertical slices",
  },
  {
    number: "04",
    phase: "Prove & Deploy",
    tag: "Load & Production",
    icon: RocketLaunch,
    frontSummary:
      "Deploy live on Render & Vercel, stress-test concurrency with k6 and JMeter, then monitor telemetry.",
    backTitle: "k6 Load Benchmark & Telemetry",
    backDetails: [
      "100,000+ simulated requests executed under high-concurrency virtual users.",
      "Verified 4,021 RPS peak throughput with 0% failed requests.",
    ],
    metric: "4,021 RPS · 0% request failures",
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktopFlipped, setIsDesktopFlipped] = useState(false);
  const [mobileFocusedIndex, setMobileFocusedIndex] = useState(0);
  const mobileCardRefs = useRef([]);

  // Mobile: automatically flip the card currently centered in the phone viewport
  useEffect(() => {
    const cards = mobileCardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const focused = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (focused[0]) {
          const idx = Number(focused[0].target.getAttribute("data-idx"));
          if (!Number.isNaN(idx)) {
            setMobileFocusedIndex(idx);
          }
        }
      },
      {
        rootMargin: "-28% 0px -28% 0px",
        threshold: [0.35, 0.65, 0.9],
      }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const current = PROCESS_STEPS[activeIndex] || PROCESS_STEPS[0];
  const CurrentIcon = current.icon;

  return (
    <section className="pr-section" id="process">
      <div className="pr-container">
        {/* Clean Editorial Header */}
        <div className="pr-header">
          <div>
            <span className="pr-kicker">02 / Engineering Workflow</span>
            <h2 className="pr-title">
              How I turn ideas into
              <br />
              systems that ship.
            </h2>
          </div>

          <p className="pr-subtitle">
            Four disciplined stages from problem constraints to load-tested
            production. <strong>Shipped, not just demoed.</strong>
          </p>
        </div>

        {/* ================================================================
            DESKTOP VIEW: LEFT CLEAN STEP INDEX + RIGHT 3D TACTILE FLIP STAGE
           ================================================================ */}
        <div className="pr-desktop-stage">
          {/* Left Navigation List */}
          <div className="pr-step-list" role="tablist" aria-label="Workflow steps">
            {PROCESS_STEPS.map((step, index) => {
              const isSelected = index === activeIndex;

              return (
                <button
                  key={step.number}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`pr-nav-row ${isSelected ? "is-selected" : ""}`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsDesktopFlipped(false);
                  }}
                  onMouseEnter={() => {
                    if (activeIndex !== index) {
                      setActiveIndex(index);
                      setIsDesktopFlipped(false);
                    }
                  }}
                >
                  <span className="pr-nav-num">{step.number}</span>
                  <span className="pr-nav-phase">{step.phase}</span>
                  <span className="pr-nav-tag">{step.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Right Focal 3D Flip Card */}
          <div
            key={current.number}
            className={`pr-flip-scene pr-stage-enter ${
              isDesktopFlipped ? "is-flipped" : ""
            }`}
            onMouseEnter={() => setIsDesktopFlipped(true)}
            onMouseLeave={() => setIsDesktopFlipped(false)}
            onClick={() => setIsDesktopFlipped((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-label={`${current.phase} stage card. Hover or press Enter to flip for proof.`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setIsDesktopFlipped((prev) => !prev);
              }
            }}
          >
            <div className="pr-flip-card">
              {/* FRONT FACE */}
              <div className="pr-face pr-face-front">
                <span className="pr-card-sheen" aria-hidden="true" />

                <div className="pr-face-top">
                  <span className="pr-face-step">
                    Stage {current.number} · {current.tag}
                  </span>
                  <span className="pr-face-icon" aria-hidden="true">
                    <CurrentIcon size={22} weight="regular" />
                  </span>
                </div>

                <div className="pr-face-body">
                  <h3 className="pr-face-title">{current.phase}</h3>
                  <p className="pr-face-desc">{current.frontSummary}</p>
                </div>

                <div className="pr-face-bottom">
                  <span className="pr-flip-hint">
                    <ArrowsClockwise
                      size={15}
                      weight="bold"
                      className="pr-spin-icon"
                      aria-hidden="true"
                    />
                    <span>Hover card to flip for engineering proof</span>
                  </span>
                </div>
              </div>

              {/* BACK FACE */}
              <div className="pr-face pr-face-back">
                <span className="pr-card-sheen" aria-hidden="true" />

                <div className="pr-face-top">
                  <span className="pr-back-kicker">
                    <CheckCircle size={16} weight="fill" aria-hidden="true" />
                    <span>Verified Deliverable · {current.number}</span>
                  </span>
                  <span className="pr-back-pill">{current.phase}</span>
                </div>

                <div className="pr-face-body">
                  <h3 className="pr-back-title pr-stagger-1">
                    {current.backTitle}
                  </h3>
                  <ul className="pr-back-list">
                    {current.backDetails.map((point, i) => (
                      <li
                        key={point}
                        className={`pr-stagger-${i + 2}`}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pr-face-bottom">
                  <span className="pr-back-metric pr-stagger-4">
                    {current.metric}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================
            MOBILE & TABLET VIEW: SCROLL-FOCUS AUTO-FLIPPING CARDS
           ================================================================ */}
        <div className="pr-mobile-feed">
          {PROCESS_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isFlipped = mobileFocusedIndex === index;

            return (
              <div
                key={step.number}
                ref={(el) => (mobileCardRefs.current[index] = el)}
                data-idx={index}
                className={`pr-flip-scene pr-mobile-scene ${
                  isFlipped ? "is-flipped" : ""
                }`}
                onClick={() =>
                  setMobileFocusedIndex(isFlipped ? -1 : index)
                }
              >
                <div className="pr-flip-card">
                  {/* Front */}
                  <div className="pr-face pr-face-front">
                    <span className="pr-card-sheen" aria-hidden="true" />

                    <div className="pr-face-top">
                      <span className="pr-face-step">
                        {step.number} · {step.tag}
                      </span>
                      <span className="pr-face-icon" aria-hidden="true">
                        <StepIcon size={20} weight="regular" />
                      </span>
                    </div>

                    <div className="pr-face-body">
                      <h3 className="pr-face-title">{step.phase}</h3>
                      <p className="pr-face-desc">{step.frontSummary}</p>
                    </div>

                    <div className="pr-face-bottom">
                      <span className="pr-flip-hint">
                        <ArrowsClockwise
                          size={14}
                          weight="bold"
                          className="pr-spin-icon"
                          aria-hidden="true"
                        />
                        <span>Scroll focus or tap to flip</span>
                      </span>
                    </div>
                  </div>

                  {/* Back */}
                  <div className="pr-face pr-face-back">
                    <span className="pr-card-sheen" aria-hidden="true" />

                    <div className="pr-face-top">
                      <span className="pr-back-kicker">
                        <CheckCircle size={15} weight="fill" aria-hidden="true" />
                        <span>{step.phase} Proof</span>
                      </span>
                      <span className="pr-face-step">{step.number}</span>
                    </div>

                    <div className="pr-face-body">
                      <h3 className="pr-back-title pr-stagger-1">
                        {step.backTitle}
                      </h3>
                      <ul className="pr-back-list">
                        {step.backDetails.map((point, i) => (
                          <li
                            key={point}
                            className={`pr-stagger-${i + 2}`}
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pr-face-bottom">
                      <span className="pr-back-metric pr-stagger-4">
                        {step.metric}
                      </span>
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