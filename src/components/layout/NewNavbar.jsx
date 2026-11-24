import { useState } from "react";

function NewNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <nav className="navbar container">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          HK<span>.</span>
        </a>

        <button
          className={`mobile-menu-toggle ${menuOpen ? "active" : ""}`}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((previous) => !previous)}
        >
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </div>

        <a href="mailto:harshkumarr9251@gmail.com" className="nav-contact">
          LET'S TALK
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}

export default NewNavbar;