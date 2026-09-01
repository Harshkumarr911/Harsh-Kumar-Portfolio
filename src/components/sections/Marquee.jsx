import React from 'react'
import { marqueeItems } from '../../data/content.js'

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <div className="bg-ink2 py-[26px] border-y border-line overflow-hidden">
      <div className="flex gap-14 whitespace-nowrap w-max animate-marquee">
        {items.map((item, i) => (
          <span
            key={i}
            className="font-mono text-[14px] text-slate tracking-wide flex items-center gap-3.5 after:content-['//'] after:text-mint after:opacity-50"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
