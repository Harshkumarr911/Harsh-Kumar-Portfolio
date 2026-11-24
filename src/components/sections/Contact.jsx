import React, { useState } from "react";
import {
  EnvelopeSimple,
  Phone,
  LinkedinLogo,
  GithubLogo,
  Code,
  ArrowUpRight,
  Copy,
  Check,
  ArrowCounterClockwise,
} from "@phosphor-icons/react";
import "../../styles/Contact.css";

const EMAIL = "harshkumarr9251@gmail.com";
const PHONE_DISPLAY = "+91 95556 17287";
const PHONE_HREF = "tel:+919555617287";

const CHANNELS = [
  {
    id: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Engineering Opportunity / Collaboration"
    )}`,
    icon: EnvelopeSimple,
    external: false,
    copyText: EMAIL,
  },
  {
    id: "phone",
    label: "Phone",
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
    icon: Phone,
    external: false,
    copyText: PHONE_DISPLAY,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/harsh-kumar-44a37a256",
    href: "https://www.linkedin.com/in/harsh-kumar-44a37a256",
    icon: LinkedinLogo,
    external: true,
    copyText: null,
  },
  {
    id: "github",
    label: "GitHub",
    value: "github.com/Harshkumarr911",
    href: "https://github.com/Harshkumarr911",
    icon: GithubLogo,
    external: true,
    copyText: null,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    value: "leetcode.com/u/Harshkumar14",
    href: "https://leetcode.com/u/Harshkumar14",
    icon: Code,
    external: true,
    copyText: null,
  },
];

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (e, id, text) => {
    e.preventDefault();
    e.stopPropagation();
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 1700);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="env-section" id="contact">
      <div className="env-container">
        {/* 1. Big Contact Heading */}
        <div className="env-header">
          <span className="env-kicker">06 / Contact</span>
          <h2 className="env-big-heading">Contact</h2>
        </div>

        {/* 2 & 3. Centered Envelope with Wax Seal + "Open" Button -> Unfolds & Slides Out Links */}
        <div className={`env-stage ${isOpen ? "is-open" : ""}`}>
          <div className="env-assembly">
            {/* Top Hinged Triangular Flap */}
            <div className="env-top-flap" aria-hidden="true" />

            {/* Sliding Letter Card with Email, LinkedIn, GitHub, etc. */}
            <div className="env-letter-sheet" aria-hidden={!isOpen}>
              <div className="env-letter-head">
                <span className="env-letter-title">Direct Channels</span>
                <button
                  type="button"
                  className="env-close-btn"
                  onClick={() => setIsOpen(false)}
                >
                  <ArrowCounterClockwise size={14} weight="bold" aria-hidden="true" />
                  <span>Close</span>
                </button>
              </div>

              <div className="env-links-grid">
                {CHANNELS.map((item, idx) => {
                  const Icon = item.icon;
                  const isCopied = copiedId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="env-link-row"
                      style={{ "--i": idx }}
                    >
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noreferrer" : undefined}
                        className="env-link-anchor"
                      >
                        <span className="env-link-icon" aria-hidden="true">
                          <Icon size={17} weight="bold" />
                        </span>
                        <span className="env-link-meta">
                          <small>{item.label}</small>
                          <strong>{item.value}</strong>
                        </span>
                        <ArrowUpRight
                          size={15}
                          weight="bold"
                          className="env-link-arrow"
                          aria-hidden="true"
                        />
                      </a>

                      {item.copyText && (
                        <button
                          type="button"
                          className="env-copy-chip"
                          onClick={(e) => handleCopy(e, item.id, item.copyText)}
                          aria-label={`Copy ${item.label}`}
                        >
                          {isCopied ? (
                            <>
                              <Check size={13} weight="bold" aria-hidden="true" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} weight="bold" aria-hidden="true" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Front Envelope Pocket + Diagonal Folds + Air-Border */}
            <div className="env-pocket-body">
              <span className="env-pocket-folds" aria-hidden="true" />

              {/* Center Wax Seal + "Open" Button */}
              {!isOpen && (
                <div className="env-center-seal-group">
                  <button
                    type="button"
                    className="env-open-btn"
                    onClick={() => setIsOpen(true)}
                  >
                    <span className="env-wax-badge" aria-hidden="true">
                      HK
                    </span>
                    <span className="env-open-label">Open</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}