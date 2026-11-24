import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/home.css";

const projects = [
  {
    number: "01",
    tag: "REAL-TIME",
    title: "EMERGENCY RESCUE",
    description: "Live dispatch platform",
    type: "rescue",
  },
  {
    number: "02",
    tag: "FINAL YEAR PROJECT",
    title: "ATHLETE ARENA",
    description: "Sports training platform",
    type: "arena",
  },
  {
    number: "03",
    tag: "OBSERVABILITY",
    title: "LOG MONITORING",
    description: "Distributed alerting system",
    type: "monitoring",
  },
];

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const portraitRef = useRef(null);
  const waveRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    const ctx = gsap.context(() => {
      /* ----------------------------------
         PAGE ENTRANCE
      ---------------------------------- */

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.7,
      })
        .from(
          ".hero-title-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 1.15,
            stagger: 0.12,
          },
          "-=0.35"
        )
        .from(
          ".hero-copy",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.65"
        )
        .from(
          ".hero-portrait-wrap",
          {
            scale: 0.82,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .from(
          ".hero-side-progress",
          {
            x: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.75"
        )
        .from(
          ".project-card",
          {
            y: 50,
            opacity: 0,
            stagger: 0.12,
            duration: 0.8,
          },
          "-=0.5"
        );

      /* ----------------------------------
         MOUSE PARALLAX
      ---------------------------------- */

      const move = (event) => {
        const rect = hero.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(titleRef.current, {
          x: x * 7,
          y: y * 4,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.to(portraitRef.current, {
          x: x * 20,
          y: y * 14,
          duration: 1.3,
          ease: "power3.out",
        });

        gsap.to(waveRef.current, {
          x: x * -22,
          y: y * -12,
          duration: 1.5,
          ease: "power3.out",
        });
      };

      hero.addEventListener("mousemove", move);

      return () => {
        hero.removeEventListener("mousemove", move);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>

      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="hero-grain" />
      <div className="hero-grid" />

      {/* =========================================
          TOP MICRO INFORMATION
      ========================================= */}

      <div className="hero-eyebrow">
        <span>HARSH KUMAR</span>

        <span className="eyebrow-line" />

        <span>SOFTWARE ENGINEER</span>
      </div>


      {/* =========================================
          MAIN TITLE
      ========================================= */}

      <div
        className="hero-title"
        ref={titleRef}
      >

        <div className="hero-title-mask">
          <h1 className="hero-title-line serif">
            BUILD
          </h1>
        </div>

        <div className="hero-title-mask">
          <h1 className="hero-title-line sans">
            DIGITAL
          </h1>
        </div>

        <div className="hero-title-mask">
          <h1 className="hero-title-line serif">
            SYSTEMS
          </h1>
        </div>

        <div className="hero-title-under">
          THAT SURVIVE THE REAL WORLD.
        </div>

      </div>


      {/* =========================================
          WAVE
      ========================================= */}

      <div
        className="hero-wave"
        ref={waveRef}
      >

        <svg
          viewBox="0 0 1600 700"
          preserveAspectRatio="none"
        >

          <defs>

            {/* Main gradient */}

            <linearGradient
              id="waveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >

              <stop
                offset="0%"
                stopColor="#6D54FF"
              />

              <stop
                offset="22%"
                stopColor="#9B5DFF"
              />

              <stop
                offset="43%"
                stopColor="#F18BB7"
              />

              <stop
                offset="57%"
                stopColor="#F7B0D3"
              />

              <stop
                offset="72%"
                stopColor="#795CF2"
              />

              <stop
                offset="88%"
                stopColor="#C48BFA"
              />

              <stop
                offset="100%"
                stopColor="#FF9EAE"
              />

            </linearGradient>


            {/* Highlight */}

            <linearGradient
              id="waveHighlight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >

              <stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity="0"
              />

              <stop
                offset="45%"
                stopColor="#FFFFFF"
                stopOpacity=".55"
              />

              <stop
                offset="70%"
                stopColor="#FFFFFF"
                stopOpacity=".1"
              />

              <stop
                offset="100%"
                stopColor="#FFFFFF"
                stopOpacity="0"
              />

            </linearGradient>


            {/* Glow */}

            <filter
              id="waveGlow"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >

              <feGaussianBlur
                stdDeviation="18"
              />

            </filter>


            {/* Soft blur */}

            <filter
              id="softWave"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >

              <feGaussianBlur
                stdDeviation="4"
              />

            </filter>

          </defs>


          {/* --------------------------------
              OUTER GLOW
          -------------------------------- */}

          <path
            className="wave-glow"
            d="
              M -150 555

              C 120 430
                270 610
                510 485

              C 700 385
                760 230
                930 280

              C 1100 330
                1120 160
                1740 20
            "
          />


          {/* --------------------------------
              MAIN WAVE
          -------------------------------- */}

          <path
            className="wave-main"
            d="
              M -150 535

              C 120 410
                280 590
                510 470

              C 710 365
                760 205
                935 265

              C 1115 325
                1140 140
                1740 0
            "
          />


          {/* --------------------------------
              SECONDARY TRANSPARENT LAYER
          -------------------------------- */}

          <path
            className="wave-secondary"
            d="
              M -150 565

              C 110 440
                290 620
                525 495

              C 710 395
                775 240
                945 295

              C 1120 350
                1160 175
                1740 45
            "
          />


          {/* --------------------------------
              INNER HIGHLIGHT
          -------------------------------- */}

          <path
            className="wave-highlight"
            d="
              M -150 522

              C 120 400
                285 575
                515 455

              C 705 355
                760 205
                930 258

              C 1110 315
                1145 145
                1740 5
            "
          />


          {/* --------------------------------
              THIN TECH LINES
          -------------------------------- */}

          <path
            className="wave-line"
            d="
              M -150 520

              C 120 400
                285 575
                515 455

              C 705 355
                760 205
                930 258

              C 1110 315
                1145 145
                1740 5
            "
          />

          <path
            className="wave-line wave-line-2"
            d="
              M -150 550

              C 120 425
                290 600
                520 475

              C 710 375
                775 225
                940 280

              C 1120 335
                1155 165
                1740 30
            "
          />

        </svg>

      </div>


      {/* =========================================
          PORTRAIT
      ========================================= */}

      <div
        className="hero-portrait-wrap"
        ref={portraitRef}
      >

        <div className="portrait-aura" />

        <div className="portrait-circle">

          <img
            src="/hero-portrait.jpg"
            alt="Harsh Kumar"
          />

        </div>

      </div>


      {/* =========================================
          RIGHT SIDE MICRO COPY
      ========================================= */}

      <div className="hero-side-copy">

        <span>JAVA</span>
        <span>SPRING BOOT</span>
        <span>REACT</span>

      </div>


      {/* =========================================
          RIGHT PROGRESS
      ========================================= */}

      <div className="hero-side-progress">

        <div className="progress-track" />

        <div className="progress-step active">
          <span>01</span>
          <small>VISION</small>
        </div>

        <div className="progress-step">
          <span>02</span>
          <small>WORK</small>
        </div>

        <div className="progress-step">
          <span>03</span>
          <small>PROCESS</small>
        </div>

        <div className="progress-step">
          <span>04</span>
          <small>CONTACT</small>
        </div>

      </div>


      {/* =========================================
          HERO COPY
      ========================================= */}

      <div className="hero-copy">

        <p>
          I build backend systems, real-time products
          and digital experiences with Java and Spring Boot.
        </p>

        <a
          href="#work"
          className="hero-cta"
        >

          <span className="cta-circle">
            ↗
          </span>

          <span>
            EXPLORE WORK
          </span>

        </a>

      </div>


      {/* =========================================
          PROJECT STRIP
      ========================================= */}

      <div className="project-strip">

        {projects.map((project) => (
          <article
            className={`project-card ${project.type}`}
            key={project.number}
          >

            {/* card top */}

            <div className="project-card-top">

              <span>
                {project.number}
              </span>

              <span>
                {project.tag}
              </span>

            </div>


            {/* visual */}

            <div className="project-visual">

              {project.type === "rescue" && (
                <div className="rescue-visual">

                  <div className="radar-ring ring-1" />
                  <div className="radar-ring ring-2" />
                  <div className="radar-ring ring-3" />

                  <div className="radar-center" />

                </div>
              )}


              {project.type === "arena" && (
                <div className="arena-visual">

                  <div className="arena-diamond" />

                </div>
              )}


              {project.type === "monitoring" && (
                <div className="monitoring-visual">

                  <div className="bar b1" />
                  <div className="bar b2" />
                  <div className="bar b3" />
                  <div className="bar b4" />
                  <div className="bar b5" />
                  <div className="bar b6" />

                </div>
              )}

            </div>


            {/* card content */}

            <div className="project-card-bottom">

              <div>

                <h2>
                  {project.title}
                </h2>

                <p>
                  {project.description}
                </p>

              </div>

              <button
                className="project-arrow"
                aria-label={`Open ${project.title}`}
              >
                ↗
              </button>

            </div>

          </article>
        ))}

      </div>

    </section>
  );
};

export default Hero;