import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  House,
  User,
  GitBranch,
  Code,
  FolderSimple,
  Trophy,
  EnvelopeSimple,
  ArrowUpRight,
  SpeakerHigh,
  SpeakerSlash,
  List,
  X,
} from "@phosphor-icons/react";
import { navLinks, profile } from "../../data/content.js";
import { useSound } from "../../context/SoundContext.jsx";
import "../../styles/navbar.css";

const SECTION_ICONS = {
  home: House,
  hero: House,
  about: User,
  process: GitBranch,
  skills: Code,
  work: FolderSimple,
  projects: FolderSimple,
  achievements: Trophy,
  contact: EnvelopeSimple,
};

function useIST() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    };

    updateTime();
    const interval = window.setInterval(updateTime, 30000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const { enabled, toggle } = useSound();
  const time = useIST();

  // Prepend Home, swap Work/Projects <-> Process, and map Work to #projects
  const allLinks = useMemo(() => {
    const base = [
      { id: "home", targetId: "home", label: "Home" },
      ...navLinks
        .filter((link) => link.id !== "home" && link.id !== "hero")
        .map((link) => {
          const isWork = link.id === "work" || link.id === "projects";
          return {
            ...link,
            label: isWork ? "Work" : link.label,
            targetId: isWork ? "projects" : link.id,
          };
        }),
    ];

    const processIdx = base.findIndex((item) => item.id === "process");
    const workIdx = base.findIndex(
      (item) => item.id === "work" || item.id === "projects"
    );

    if (processIdx !== -1 && workIdx !== -1) {
      [base[processIdx], base[workIdx]] = [base[workIdx], base[processIdx]];
    }

    return base;
  }, []);

  // Active section tracking (maps #projects back to the Work nav item)
  useEffect(() => {
    const targetToNavId = new Map();
    const elements = [];

    allLinks.forEach((link) => {
      const el =
        document.getElementById(link.targetId) ||
        document.getElementById(link.id);
      if (el) {
        targetToNavId.set(el.id, link.id);
        elements.push(el);
      }
    });

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          const matchedNavId =
            targetToNavId.get(visible[0].target.id) || visible[0].target.id;
          setActive(matchedNavId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.3, 0.5, 0.75],
      }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [allLinks]);

  // Page scroll progress
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const current =
          scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

        setProgress(Math.min(100, Math.max(0, current)));
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    document.body.classList.toggle("nav-drawer-open", open);
    return () => document.body.classList.remove("nav-drawer-open");
  }, [open]);

  // Escape key closes drawer
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const go = useCallback((link) => {
    const navId = typeof link === "string" ? link : link.id;
    const domId = typeof link === "string" ? link : link.targetId || link.id;

    setOpen(false);
    const element =
      document.getElementById(domId) || document.getElementById(navId);

    if (element) {
      element.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
      setActive(navId);
    }
  }, []);

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hk-sidebar ${expanded ? "is-expanded" : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label="Main navigation"
      >
        <div className="hk-sidebar-inner">
          {/* BRAND */}
          <button
            className="hk-brand"
            onClick={() => go("home")}
            aria-label="Harsh Kumar - back to home"
          >
            <img
              src="/Portfolio-Favicon.png"
              alt=""
              className="hk-brand-image"
            />
            <span className="hk-brand-name">
              HARSH KUMAR
              <small>SOFTWARE ENGINEER</small>
            </span>
          </button>

          <div className="hk-sidebar-divider" />

          {/* NAVIGATION */}
          <div className="hk-nav-caption">
            <span>MENU</span>
            <span className="hk-caption-line" />
          </div>

          <nav className="hk-nav-list">
            {allLinks.map((link, index) => {
              const isActive = active === link.id;
              const IconComponent = SECTION_ICONS[link.id] || FolderSimple;

              return (
                <button
                  key={link.id}
                  className={`hk-nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => go(link)}
                  aria-current={isActive ? "location" : undefined}
                  title={link.label}
                >
                  <span className="hk-nav-icon" aria-hidden="true">
                    <IconComponent
                      size={18}
                      weight={isActive ? "fill" : "regular"}
                    />
                  </span>

                  <span className="hk-nav-text">
                    <small className="hk-nav-num">
                      {String(index).padStart(2, "0")}
                    </small>
                    {link.label}
                  </span>

                  <span className="hk-nav-arrow" aria-hidden="true">
                    <ArrowUpRight size={14} weight="bold" />
                  </span>
                </button>
              );
            })}
          </nav>

          {/* BOTTOM AREA */}
          <div className="hk-sidebar-bottom">
            <div className="hk-scroll-label">
              <span>SCROLL PROGRESS</span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div
              className="hk-progress-track"
              role="progressbar"
              aria-label="Page scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span
                className="hk-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="hk-sidebar-divider" />

            <div className="hk-status">
              <span className="hk-status-dot" />
              <div className="hk-status-copy">
                <strong>OPEN TO WORK</strong>
                <span>{profile.location}</span>
                <span>INDIA · {time || "--:--"} IST</span>
              </div>
            </div>

            <div className="hk-sidebar-controls">
              <span>INTERFACE SOUND</span>
              <button
                className={`hk-sound-button ${enabled ? "sound-enabled" : ""}`}
                onClick={toggle}
                aria-label={
                  enabled ? "Mute interface sound" : "Enable interface sound"
                }
                aria-pressed={enabled}
              >
                {enabled ? (
                  <SpeakerHigh size={16} weight="regular" />
                ) : (
                  <SpeakerSlash size={16} weight="regular" />
                )}
              </button>
            </div>

            <div className="hk-sidebar-copyright">© 2026 HARSH KUMAR</div>
          </div>
        </div>
      </aside>

      {/* MOBILE MENU TRIGGER */}
      <button
        className={`hk-mobile-trigger ${open ? "is-open" : ""}`}
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="hk-mobile-drawer"
      >
        {open ? (
          <X size={20} weight="bold" />
        ) : (
          <List size={20} weight="bold" />
        )}
      </button>

      {/* MOBILE DRAWER BACKDROP */}
      <div
        className={`hk-drawer-backdrop ${open ? "is-visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* MOBILE DRAWER */}
      <aside
        id="hk-mobile-drawer"
        className={`hk-mobile-drawer ${open ? "is-open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="hk-drawer-header">
          <button className="hk-drawer-brand" onClick={() => go("home")}>
            <img src="/Portfolio-Favicon.png" alt="" />
            <span>
              HARSH KUMAR
              <small>SOFTWARE ENGINEER</small>
            </span>
          </button>

          <button
            className="hk-drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="hk-drawer-heading">
          <span>EXPLORE</span>
          <span>00 — 0{allLinks.length - 1}</span>
        </div>

        <nav className="hk-drawer-links">
          {allLinks.map((link, index) => {
            const isActive = active === link.id;
            const IconComponent = SECTION_ICONS[link.id] || FolderSimple;

            return (
              <button
                key={link.id}
                className={`hk-drawer-link ${isActive ? "is-active" : ""}`}
                onClick={() => go(link)}
                style={{ "--item-index": index }}
              >
                <span className="hk-drawer-icon" aria-hidden="true">
                  <IconComponent
                    size={19}
                    weight={isActive ? "fill" : "regular"}
                  />
                </span>

                <span className="hk-drawer-link-name">{link.label}</span>

                <span className="hk-drawer-link-arrow" aria-hidden="true">
                  <ArrowUpRight size={16} weight="bold" />
                </span>
              </button>
            );
          })}
        </nav>

        <div className="hk-drawer-bottom">
          <div className="hk-drawer-status">
            <span className="hk-status-dot" />
            <span>AVAILABLE FOR OPPORTUNITIES</span>
          </div>

          <div className="hk-drawer-details">
            <span>{profile.location}</span>
            <span>{time || "--:--"} IST</span>
          </div>

          <div className="hk-drawer-controls">
            <span>INTERFACE SOUND</span>
            <button
              className={`hk-sound-button ${enabled ? "sound-enabled" : ""}`}
              onClick={toggle}
              aria-label={
                enabled ? "Mute interface sound" : "Enable interface sound"
              }
              aria-pressed={enabled}
            >
              {enabled ? (
                <SpeakerHigh size={16} weight="regular" />
              ) : (
                <SpeakerSlash size={16} weight="regular" />
              )}
            </button>
          </div>

          <span className="hk-drawer-copyright">HARSH KUMAR © 2026</span>
        </div>
      </aside>
    </>
  );
}