export default function GenerateButton({ onClick, loading, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="mt-6 w-full py-4 rounded-lg text-sm tracking-widest uppercase transition-all duration-300 border font-sans font-light border-near-black/20 text-near-black disabled:opacity-25 disabled:cursor-not-allowed enabled:hover:border-near-black/45 enabled:hover:bg-near-black/3"
    >
      {loading ? 'Thinking...' : 'Ask me something'}
    </button>
  )
}
