import { createContext, useContext, useState } from 'react'
import getLocalStorage from '../functions/getLocalStorage';

const MyContext = createContext();

export default function CreateFileProvider({children}) {
  const [questions, setQuestions] = useState(getLocalStorage("questions") || []);
  const [questionsCounter, setQuestionsCounter] = useState(questions.at(-1)?.id || 0);
  const [answersCounter, setAnswersCounter] = useState(questions.at(-1)?.answers.at(-1)?.id || 0);
  const [errors, setErrors] = useState(null);

  const allProps = {
    questions,
    setQuestions,
    questionsCounter,
    setQuestionsCounter,
    answersCounter,
    setAnswersCounter, 
    errors,
    setErrors
  }

  return (
    <MyContext.Provider value={allProps}>
      {children}
      </MyContext.Provider>
  )
}

export const useCreateFileContext = () => {
  return useContext(MyContext)
}
