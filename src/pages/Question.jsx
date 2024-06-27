import React, { useState } from 'react'
import styles from "../styles/question.module.css"
import { useStarterContext } from '../context/StarterProvider'
import { useNavigate, useParams } from 'react-router';

export default function Question() {
  const {file, setFile} = useStarterContext();
  const {id} = useParams();
  const question = file.fcontent[id -1];
  const answers = question.answers
  const navigate = useNavigate();
  const [answerId, setAnswerId] = useState(null)

  function correctAnswers(){
    var correctAnswers = []
    answers.map(answer => answer.isCorrect && correctAnswers.push(answer.text))

    return correctAnswers;
  }

  function getAnswer(answerId){
    var answer = null;

    answers.map(ans => {
      if(ans.id == answerId){
        answer = ans
      }
    })

    return answer
  }
  
  function checkAnswer(e){
    e.preventDefault()
    console.log(getAnswer(answerId))

    // if(correctAnswers().includes(answers))

    // console.log(correctAnswers())
  }

  function cancelQuestion() {
    console.log("cancel")
  }

  return (
    <form className={styles.container} onSubmit={e => checkAnswer(e)}>
      <div className={styles.questionWrapper}>
        <div className={styles.header}>
          <h3 className={styles.title}>{question.text}</h3>
          <div className={styles.timer}>
            <i className="fa-regular fa-clock"></i>
            <span className='timer'>00:20</span>
          </div>
        </div>

        <div className={styles.answers}>
          {question.answers.map(ans => {
            return (
              <div className={styles.answer} key={ans.id}>
                <input type="radio" id={ans.id} name="answer" value={ans.id} checked={ans.id === answerId} onChange={e => setAnswerId(ans.id)} />
                <label htmlFor={ans.id} key={ans.id}>{ans.text}</label>
              </div>
            )
          })}
        </div>
        
        <div className={styles.btns}>
          <button onClick={cancelQuestion} className={styles.cancel} type='button'>Cancel</button>
          <button className={styles.submit} type='submit'>Submit</button>
        </div>
      </div>
    </form>
  )
}
