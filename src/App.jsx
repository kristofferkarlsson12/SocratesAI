import { useState, useEffect, useRef } from 'react'
import InputTypeSelector from './components/InputTypeSelector'
import UserInputField from './components/UserInputField'
import GenerateButton from './components/GenerateButton'
import QuestionDisplay from './components/QuestionDisplay'
import WritingSpace from './components/WritingSpace'
import FeedbackPrompt from './components/FeedbackPrompt'
import { generateSocraticQuestion } from './gemini'
import { saveSession, updateFeedback } from './firestore'
import { trackEvent } from './analytics'
import { checkRateLimit } from './rateLimit'

function getOrCreateSessionId() {
  const key = 'socratic_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

const sessionId = getOrCreateSessionId()

export default function App() {
  const [inputType, setInputType] = useState('decision')
  const [userInput, setUserInput] = useState('')
  const [phase, setPhase] = useState('input') // 'input' | 'loading' | 'result'
  const [question, setQuestion] = useState('')
  const [showWritingSpace, setShowWritingSpace] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [error, setError] = useState('')
  const [sessionDocId, setSessionDocId] = useState(null)
  const timers = useRef([])

  useEffect(() => {
    trackEvent('session_started')
  }, [])

  function clearTimers() {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  async function handleGenerate() {
    if (!userInput.trim()) return

    if (!checkRateLimit()) {
      setError("You've asked a lot today. Come back in an hour.")
      return
    }

    setError('')
    setPhase('loading')
    trackEvent('input_type_selected', { input_type: inputType })

    try {
      const generatedQuestion = await generateSocraticQuestion(inputType, userInput)
      setQuestion(generatedQuestion)
      setPhase('result')
      trackEvent('question_generated')

      saveSession({ sessionId, inputType, userInput, generatedQuestion })
        .then(docId => setSessionDocId(docId))
        .catch(err => console.error('Session save failed:', err))

      timers.current = [
        setTimeout(() => {
          setShowWritingSpace(true)
          trackEvent('user_began_writing')
        }, 3000),
        setTimeout(() => setShowFeedback(true), 120_000),
      ]
    } catch (err) {
      console.error('Question generation failed:', err)
      setError('Something went wrong. Please try again.')
      setPhase('input')
    }
  }

  function handleFeedback(value) {
    setShowFeedback(false)
    if (sessionDocId) {
      updateFeedback(sessionDocId, value).catch(err =>
        console.error('Feedback save failed:', err),
      )
    }
  }

  function handleReset() {
    clearTimers()
    setPhase('input')
    setUserInput('')
    setQuestion('')
    setShowWritingSpace(false)
    setShowFeedback(false)
    setSessionDocId(null)
    setError('')
  }

  const isResult = phase === 'result'

  return (
    <div className="min-h-screen bg-warm-white flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl">
        {!isResult && (
          <>
            <header className="mb-14 text-center">
              <h1 className="font-sans font-light text-base tracking-[0.3em] text-near-black uppercase">
                Socratic
              </h1>
              <p className="mt-2 text-xs text-near-black/40 tracking-wide font-sans">
                A question that makes you wonder
              </p>
            </header>

            <InputTypeSelector value={inputType} onChange={setInputType} />
            <UserInputField
              inputType={inputType}
              value={userInput}
              onChange={setUserInput}
            />

            {error && (
              <p className="mt-3 text-xs text-terracotta/80 text-center tracking-wide font-sans">
                {error}
              </p>
            )}

            <GenerateButton
              onClick={handleGenerate}
              loading={phase === 'loading'}
              disabled={!userInput.trim() || phase === 'loading'}
            />
          </>
        )}

        {isResult && (
          <>
            <QuestionDisplay question={question} />
            {showWritingSpace && <WritingSpace sessionId={sessionId} />}
            {showFeedback && <FeedbackPrompt onFeedback={handleFeedback} />}
            <button
              onClick={handleReset}
              className="mt-20 block mx-auto text-xs text-near-black/22 hover:text-near-black/50 transition-colors duration-500 tracking-widest uppercase font-sans font-light"
            >
              Ask something else
            </button>
          </>
        )}
      </div>
    </div>
  )
}
