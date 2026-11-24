import React from 'react'

/* Inline SVG icons: no icon library, nothing that can break or get deprecated. */
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
  'aria-hidden': true,
}

const make = (d) =>
  function Icon(props) {
    return (
      <svg {...base} {...props}>
        <path d={d} />
      </svg>
    )
  }

export const ArrowRight = make('M4 12h16M14 6l6 6-6 6')
export const ArrowUpRight = make('M7 17 17 7M8 7h9v9')
export const MenuIcon = make('M4 8h16M4 16h16')
export const CloseIcon = make('M6 6l12 12M18 6 6 18')
export const SoundOn = make('M4 9v6h4l5 4V5L8 9H4zM16.5 9a4 4 0 0 1 0 6')
export const SoundOff = make('M4 9v6h4l5 4V5L8 9H4zM17 9l5 6M22 9l-5 6')