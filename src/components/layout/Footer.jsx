import React from 'react'
import { profile } from '../../data/content.js'

export default function Footer() {
  return (
    <div className="wrap">
      <footer className="mt-[100px] py-[30px] border-t border-line">
        <div className="flex justify-between items-center font-mono text-[12px] text-slate flex-wrap gap-3.5">
          <span>{profile.name} · Kanpur, India · 2026</span>
          <div className="flex gap-5">
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-paperDim">
              LinkedIn
            </a>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-paperDim">
              GitHub
            </a>
            <a href={profile.links.leetcode} target="_blank" rel="noopener noreferrer" className="text-paperDim">
              LeetCode
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
