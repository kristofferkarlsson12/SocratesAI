import { useState, useEffect } from 'react'

export default function FeedbackPrompt({ onFeedback }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="mt-14 text-center transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p className="text-xs text-near-black/40 tracking-wide mb-5 font-sans">
        Did this question make you think differently?
      </p>
      <div className="flex gap-3 justify-center">
        <button
          onClick={() => onFeedback('yes')}
          className="px-8 py-2.5 text-xs tracking-widest uppercase border border-near-black/15 rounded-full text-near-black/50 hover:border-terracotta hover:text-terracotta transition-all duration-300 font-sans"
        >
          Yes
        </button>
        <button
          onClick={() => onFeedback('no')}
          className="px-8 py-2.5 text-xs tracking-widest uppercase border border-near-black/15 rounded-full text-near-black/50 hover:border-near-black/35 hover:text-near-black/70 transition-all duration-300 font-sans"
        >
          Not quite
        </button>
      </div>
    </div>
  )
}
