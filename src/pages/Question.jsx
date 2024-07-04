import React, { useEffect, useState } from 'react';
import styles from "../styles/question.module.css"
import { useStarterContext } from '../context/StarterProvider'
import { useNavigate, useParams } from 'react-router';

export default function Question() {
  const {file: {fcontent}, file, setFile, setActivePlayer, players, timer} = useStarterContext();
  const {id} = useParams();
  const question = fcontent[id -1];
  const answers = question.answers
  const navigate = useNavigate();
  const [answerId, setAnswerId] = useState(null);
  const [seconds, setSeconds] = useState(parseInt(timer.seconds) || 0);

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

  function deActivateQuestion() {
    const new_fcontent = [...fcontent.filter(q => q.id != id), {...question, isDeactivated: true}];
    setFile(c => {return {...c, fcontent: new_fcontent}});
  }

  function moveToNextPlayer() {
    const maxActivate = players.length -1;
    setActivePlayer(ap =>  parseInt(ap) +1 > maxActivate ? 0 : parseInt(ap) +1);
  }

  function cancelQuestion() {
    moveToNextPlayer()
    deActivateQuestion()
    navigate('/game')
  }

  useEffect(() => {
  if (timer.seconds) {
    var intSeconds = seconds
    const myInterval = setInterval(() => {
      intSeconds -= 1;
      setSeconds(s => intSeconds);

      if(intSeconds <= 0) {
        clearInterval(myInterval);
        cancelQuestion();
      }
    }, 1000);

    return () => clearInterval(myInterval);
  }
}, [timer.seconds]);

  return (
    <form className={styles.container} onSubmit={e => checkAnswer(e)}>
      <div className={styles.questionWrapper}>
        <div className={styles.header}>
          <h3 className={styles.title}>{question.text}</h3>
          {timer.isActive && <div className={styles.timer}>
            <i className="fa-regular fa-clock"></i>
            <span className='timer'>00:{seconds}</span>
          </div>}
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
