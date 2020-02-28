import React, { useContext, createContext, FunctionComponent } from 'react'
import { useLocalStore } from 'mobx-react-lite'
import { toJS } from 'mobx'

export const StoreContext = createContext<Store>({
  questionsLoading: false,
  questions: [],
  answers: [],
  score: 0,
  questionCount: 0,
  fetchQuestions: async () => {},
})

export const useStore = () => {
  return useContext(StoreContext)
}

type Question = {
  category: string
  question: string
  correct_answer: string
}

type Store = {
  questionsLoading: boolean
  questions: Question[]
  answers: string[]
  score: number
  questionCount: number
  fetchQuestions: () => Promise<void>
}

const StoreProvider: FunctionComponent = ({ children }) => {
  const store = useLocalStore<Store>(() => ({
    questionsLoading: false,
    questions: [],
    answers: [],
    get questionCount(): number {
      return store.questions.length
    },
    get score(): number {
      return store.questions.reduce((score, value, index) => {
        if (index > store.answers.length - 1) {
          return score
        }

        const question = toJS(value)
        const answer = store.answers[index]

        if (answer !== question?.correct_answer) {
          return score
        }

        return score + 1
      }, 0)
    },
    fetchQuestions: async () => {
      store.questionsLoading = true
      const response = await fetch(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      ).then(res => res.json())

      if (response.response_code === 0) {
        store.questions = response.results
      }

      store.questionsLoading = false
    },
  }))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export default StoreProvider
