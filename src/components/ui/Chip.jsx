import React from 'react'

export default function Chip({ children }) {
  return (
    <span className="text-[13px] px-[13px] py-[7px] border border-line rounded-full text-paperDim">
      {children}
    </span>
  )
}
