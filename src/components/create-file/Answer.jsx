import { useCreateFileContext } from "../../context/CreateFileProvider"
import styles from "../../styles/createFile.module.css"

export default function Answer({id, index, question, questionId}){
  const {setQuestions} = useCreateFileContext()


  function thisAnswer(){
    return question.answers.filter(ans => ans.id === id)[0]
  }

  function deleteAnswer(){
    var updatedAnswers = question.answers
    updatedAnswers = updatedAnswers.filter(ans => ans.id !== id)

    setQuestions(questions => questions.map(q => q.id === questionId ? {...q, answers: updatedAnswers} : q))
  }

  function editAnswerTitle(value){
    const editedAnswers = question.answers.map(ans => ans.id === id ? {...ans, text: value} : ans)

    setQuestions(questions => questions.map(qst => qst.id === questionId ? {...qst, answers: editedAnswers} : qst))
  }

  function editIsCorrect(value){
    const editedAnswers = question.answers.map(ans => ans.id === id ? {...ans, isCorrect: value} : ans)

    setQuestions(questions => questions.map(qst => qst.id === questionId ? {...qst, answers: editedAnswers} : qst))
  }

  return (
    <div className={styles.answer}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Answer {index +1}: </label>
        <input type="text" tabIndex={-1} id="text" value={thisAnswer().text} onChange={e => editAnswerTitle(e.target.value)}  />
      </div>
      
      <div className={styles.answerParams}>
        <div className={styles.isCorrect}>
          <label htmlFor={`correctForA${id}Q${questionId}`}>Correct</label>
          <input type="checkbox" tabIndex={-1} id={`correctForA${id}Q${questionId}`} checked={thisAnswer().isCorrect} onChange={e => editIsCorrect(e.target.checked)}
          />
          <div className={`${styles.fakeCheckBox} ${thisAnswer().isCorrect ? styles.fill : ''}`}></div>
        </div>
          
          <div className={styles.remove} onClick={deleteAnswer}>
            Delete
          </div>
      </div>
    </div>
  )
}