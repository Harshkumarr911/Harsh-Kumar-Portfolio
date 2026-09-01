import React from 'react'

export default function TerminalWindow({ lines = [], className = '' }) {
  return (
    <div className={`border border-line rounded-xl bg-[#0a1120] overflow-hidden ${className}`}>
      <div className="flex gap-1.5 px-3 py-2.5 border-b border-line">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4356]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4356]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3a4356]" />
      </div>
      <div className="p-[16px_18px] font-mono text-[12.5px] leading-[1.9] text-paperDim">
        {lines.map((line, i) => (
          <div key={i}>
            <span className="text-mint">{line.k}</span>{' '}
            {line.text}
            {line.v && <span className="text-amber">{line.v}</span>}
            {line.rest}
            {line.v2 && <span className="text-amber">{line.v2}</span>}
            {i === lines.length - 1 && <span className="term-cursor ml-1" />}
          </div>
        ))}
      </div>
    </div>
  )
}
