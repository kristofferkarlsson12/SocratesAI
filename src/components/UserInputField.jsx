export default function UserInputField({ inputType, value, onChange }) {
  const placeholder =
    inputType === 'decision'
      ? 'Describe the decision you are sitting with...'
      : 'What are you curious about?'

  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      maxLength={500}
      rows={5}
      placeholder={placeholder}
      className="w-full bg-transparent border border-near-black/15 rounded-lg p-5 text-near-black placeholder-near-black/30 resize-none focus:outline-none focus:border-near-black/35 transition-colors duration-300 text-sm leading-relaxed font-sans"
    />
  )
}
