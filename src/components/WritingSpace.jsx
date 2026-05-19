import { useState, useEffect } from 'react'

const AUTOSAVE_MS = 10_000

export default function WritingSpace({ sessionId }) {
  const [text, setText] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!text) return
    const interval = setInterval(() => {
      localStorage.setItem(`socratic_writing_${sessionId}`, text)
    }, AUTOSAVE_MS)
    return () => clearInterval(interval)
  }, [text, sessionId])

  return (
    <div
      className="mt-14 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Write here. There is no wrong answer."
        rows={8}
        className="w-full bg-transparent border-0 border-b border-near-black/12 py-4 text-near-black/80 placeholder-near-black/22 resize-none focus:outline-none text-sm leading-loose font-sans font-light"
      />
    </div>
  )
}
