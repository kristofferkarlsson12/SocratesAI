import { getAI, getGenerativeModel, GoogleAIBackend } from 'firebase/ai'
import { app } from './firebase'

const SYSTEM_PROMPT = `You are a master of the Socratic method. Your only job is to ask ONE question — never two, never a follow-up, never an explanation. The question must: (1) Be impossible to answer in one sentence. (2) Make the person want to sit with it and wonder. (3) Surface something the person did not know they felt or believed. (4) Feel like it was written specifically for them, not generically. (5) Never contain the word "why" — it is too blunt. Use "what", "how", "when", or "where" instead. If the input is a DECISION: ask a question that reveals what the person already knows but hasn't admitted to themselves. If the input is an OPEN TOPIC: ask a question that cracks the topic open further and makes the ordinary feel strange and worth exploring. Return only the question. No preamble. No explanation. No punctuation other than the question mark.`

const ai = getAI(app, { backend: new GoogleAIBackend() })
const model = getGenerativeModel(ai, {
  model: 'gemini-2.0-flash',
  systemInstruction: SYSTEM_PROMPT,
  generationConfig: {
    maxOutputTokens: 150,
    temperature: 0.9,
  },
})

export async function generateSocraticQuestion(inputType, userInput) {
  const message = `Input type: ${inputType === 'decision' ? 'DECISION' : 'OPEN TOPIC'}. User input: ${userInput}`
  const result = await model.generateContent(message)
  return result.response.text().trim()
}
