# Harsh Kumar — Portfolio

A single-page developer portfolio built with React, Tailwind, GSAP + ScrollTrigger,
Framer Motion, React Three Fiber, drei, custom GLSL shaders, Lenis, and Howler.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

Requires Node 18+.

## Tech stack

| Layer                     | Library                                    | Where it's used |
|---------------------------|---------------------------------------------|------------------|
| Core framework             | React 18 + Vite                            | everything |
| Styling                    | Tailwind CSS                               | everything |
| Scroll-driven timelines    | GSAP + ScrollTrigger                       | hero intro, stat count-ups, achievement stagger, wave parallax |
| Component-level motion     | Framer Motion                              | magnetic buttons, section reveals, process-card highlight, nav menu |
| 3D rendering                | Three.js + React Three Fiber + drei        | hero scene: particle network, floating energy core, sparkles |
| Custom shaders             | Hand-written GLSL (`ShaderMaterial`)       | nebula backdrop, fresnel glow on the energy core |
| Smooth scroll              | Lenis                                      | wraps the whole page, synced to GSAP's ticker |
| Audio                      | Howler.js                                  | UI blips, synthesized on the fly (no external audio files needed) |
| Icons                      | lucide-react                               | navbar, achievements, contact |

## Folder structure

```
portfolio/
├── index.html                  # HTML shell + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                 # React root
│   ├── App.jsx                  # composes the whole page
│   ├── index.css                # Tailwind layers + base styles
│   ├── data/
│   │   └── content.js            # ALL copy/content lives here — edit this file to update text
│   ├── context/
│   │   └── SoundContext.jsx      # Howler-backed sound provider (on/off + synthesized blips)
│   ├── hooks/
│   │   ├── useLenis.js           # Lenis smooth-scroll, synced with GSAP ScrollTrigger
│   │   └── useGSAP.js            # small gsap.context() wrapper for scoped, auto-cleaned tweens
│   └── components/
│       ├── layout/
│       │   ├── Navbar.jsx        # fixed nav, active-section highlight, mobile menu, sound toggle
│       │   ├── Cursor.jsx        # custom cursor (desktop only)
│       │   ├── Preloader.jsx     # boot-sequence loading screen
│       │   └── Footer.jsx
│       ├── sections/
│       │   ├── Hero.jsx
│       │   ├── Marquee.jsx
│       │   ├── About.jsx
│       │   ├── Process.jsx       # "how I turn ideas into systems that ship"
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Achievements.jsx
│       │   └── Contact.jsx
│       ├── three/
│       │   ├── HeroScene.jsx     # <Canvas> wrapper, composes the pieces below
│       │   ├── NebulaBackdrop.jsx
│       │   ├── ParticleField.jsx # animated node network, mouse-reactive
│       │   ├── EnergyCore.jsx    # floating wireframe icosahedron (drei <Float>)
│       │   └── shaders/
│       │       ├── nebulaShader.js
│       │       └── fresnelShader.js
│       └── ui/
│           ├── MagneticButton.jsx
│           ├── WaveDivider.jsx
│           ├── Chip.jsx
│           ├── StatCounter.jsx
│           └── TerminalWindow.jsx
└── .gitignore
```

## Editing content

Everything text-based — name, links, stats, skills, project copy, achievements — lives in
`src/data/content.js`. You shouldn't need to touch component files just to update copy.

## Notes on the stack choices

- **Lenis** is synced to GSAP's ticker (`useLenis.js`) so `ScrollTrigger` and the smooth-scroll
  layer never fight each other.
- **Howler** has no hosted audio files to point at, so `SoundContext.jsx` synthesizes a short WAV
  blip on the fly and hands it to Howler as a blob URL. Swap `makeBeepBlobUrl(...)` for a real
  `src: ['/sounds/click.mp3']` any time you want to use actual sound design.
- **GLSL shaders** are hand-written (no shader-graph tool) in `components/three/shaders/` and
  wired in through `<shaderMaterial>` in `NebulaBackdrop.jsx` and `EnergyCore.jsx`.
- Both GSAP and Framer Motion are used deliberately for different jobs: GSAP + ScrollTrigger
  drives timeline-like sequences (hero intro, count-ups, staggered lists, scroll parallax);
  Framer Motion handles component-level interaction (magnetic buttons, hover/tap states, the
  Process section's active-card highlight, the mobile nav menu).
- Everything respects `prefers-reduced-motion`: Lenis, the custom cursor, and the Sparkles field
  all fall back to simpler/no motion.

## Deploying

`npm run build` outputs a static `dist/` folder — drop it on Vercel, Netlify, GitHub Pages, or
any static host.
