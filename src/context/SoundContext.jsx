import React, { createContext, useContext, useMemo, useRef, useState } from 'react'
import { Howl } from 'howler'

const SoundContext = createContext(null)

/**
 * There are no hosted audio assets in this project, so short UI blips
 * are synthesized on the fly as WAV blobs and handed to Howler to play.
 * The Howler API is fully wired here — swap `makeBeepBlobUrl(...)` for a
 * real asset path (e.g. '/sounds/click.mp3') any time.
 */
function makeBeepBlobUrl(freq = 660, durationMs = 90) {
  const sampleRate = 44100
  const numSamples = Math.floor(sampleRate * (durationMs / 1000))
  const buffer = new ArrayBuffer(44 + numSamples * 2)
  const view = new DataView(buffer)

  const writeString = (offset, str) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i))
  }

  writeString(0, 'RIFF')
  view.setUint32(4, 36 + numSamples * 2, true)
  writeString(8, 'WAVE')
  writeString(12, 'fmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, sampleRate, true)
  view.setUint32(28, sampleRate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  writeString(36, 'data')
  view.setUint32(40, numSamples * 2, true)

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate
    const envelope = Math.exp((-6 * t) / (durationMs / 1000))
    const sample = Math.sin(2 * Math.PI * freq * t) * envelope * 0.22
    view.setInt16(44 + i * 2, sample * 32767, true)
  }

  return URL.createObjectURL(new Blob([view], { type: 'audio/wav' }))
}

export function SoundProvider({ children }) {
  const [enabled, setEnabled] = useState(false)
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  const play = useMemo(
    () => (freq = 660, durationMs = 90) => {
      if (!enabledRef.current) return
      try {
        const url = makeBeepBlobUrl(freq, durationMs)
        const sound = new Howl({ src: [url], format: ['wav'], volume: 0.5 })
        sound.play()
        sound.once('end', () => URL.revokeObjectURL(url))
      } catch (e) {
        // audio isn't essential to the experience — fail silently
      }
    },
    []
  )

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev
      if (next) play(660, 100)
      return next
    })
  }

  return <SoundContext.Provider value={{ enabled, toggle, play }}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used inside <SoundProvider>')
  return ctx
}
