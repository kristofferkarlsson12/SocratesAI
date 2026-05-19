export default function InputTypeSelector({ value, onChange }) {
  const btn = (type, label) => (
    <button
      key={type}
      onClick={() => onChange(type)}
      className={[
        'flex-1 py-4 px-5 rounded-lg text-sm text-left transition-all duration-300 border',
        value === type
          ? 'border-terracotta bg-terracotta/10 text-near-black'
          : 'border-near-black/15 text-near-black/45 hover:border-near-black/30 hover:text-near-black/70',
      ].join(' ')}
    >
      {label}
    </button>
  )

  return (
    <div className="flex gap-3 mb-8">
      {btn('decision', 'A decision I am wrestling with')}
      {btn('open_topic', 'Something I am curious about')}
    </div>
  )
}
