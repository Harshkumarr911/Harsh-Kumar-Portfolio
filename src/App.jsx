import React, { useState } from 'react'
import { SoundProvider } from './context/SoundContext.jsx'
import useLenis from './hooks/useLenis.js'

import Preloader from './components/layout/Preloader.jsx'
import Cursor from './components/layout/Cursor.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

// import Hero from './components/sections/Hero.jsx'
import Marquee from './components/sections/Marquee.jsx'
import About from './components/sections/About.jsx'
import Process from './components/sections/Process.jsx'
import Skills from './components/sections/Skills.jsx'
import Projects from './components/sections/Projects.jsx'
import Achievements from './components/sections/Achievements.jsx'
import Contact from './components/sections/Contact.jsx'
import Hero2 from './components/sections/Hero2.jsx'

import ScrollProgress from './components/ui/ScrollProgress.jsx'
import BackToTop from './components/layout/BackToTop.jsx'
import Chatbot from './components/layout/Chatbot.jsx'

import NewNavbar from "./components/layout/NewNavbar";
import Hero from "./components/home/Hero.jsx";


function Site() {
  useLenis()

  return (
    <>
      <Cursor />

      <ScrollProgress />

      <Navbar />

      <main>
        <Hero />

        {/* <Marquee /> */}

        <About />

        <Process />

        <Skills />

        <Projects />

        <Achievements />

        <Contact />
      </main>

      <Footer />

      {/* <BackToTop /> */}

      <Chatbot />
    </>
  )
}


export default function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <SoundProvider>

      {/* =================================================
          REAL WEBSITE
          
          IMPORTANT:
          Site is ALWAYS mounted.
          It exists underneath the preloader.
          ================================================= */}

      <Site />


      {/* =================================================
          PRELOADER

          It sits ABOVE the website and reveals it.
          ================================================= */}

      {!loaded && (
        <Preloader
          onDone={() => setLoaded(true)}
        />
      )}

    </SoundProvider>
  )
}