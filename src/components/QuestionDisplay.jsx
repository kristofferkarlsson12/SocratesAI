import { useState, useEffect } from 'react'

export default function QuestionDisplay({ question }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="py-20 text-center transition-opacity duration-1500"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <p className="font-serif text-2xl md:text-3xl text-near-black leading-relaxed tracking-wide italic">
        {question}
      </p>
    </div>
  )
}
