import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

export async function saveSession({ sessionId, inputType, userInput, generatedQuestion }) {
  const docRef = await addDoc(collection(db, 'sessions'), {
    sessionId,
    inputType,
    userInput,
    generatedQuestion,
    createdAt: serverTimestamp(),
    feedbackGiven: false,
    feedbackValue: null,
  })
  return docRef.id
}

export async function updateFeedback(docId, value) {
  await updateDoc(doc(db, 'sessions', docId), {
    feedbackGiven: true,
    feedbackValue: value,
  })
}
