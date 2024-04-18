import styles from "../../styles/createFile.module.css"
import { useState } from "react";
import { useCreateFileContext } from "../../context/CreateFileProvider";
import { useStarterContext } from "../../context/StarterProvider";
import Answer from "./Answer";

export default function Question({id, index}){
  const { setTitleStatus } = useStarterContext();
  const [showLess, setShowLess] = useState(id !== 1) // return true when for the first question
  const {questions, setQuestions, errors, answersCounter, setAnswersCounter} = useCreateFileContext();

function thisQuestion(){
  return questions.filter(qst => qst.id === id)[0]
}

function getQuestionTitle(){
  return thisQuestion().text
}

function handleChangeQuestionName(e){
  const newText = e.target.value;

  setQuestions(questions.map(qst => qst.id === id ? {...qst, text: newText} : qst))
}

function handleAddAnswer(){
  const initialValue = {id: answersCounter , text: "", isCorrect: false};
  setAnswersCounter(c => c +1)

  setQuestions(questions => questions.map(qst => qst.id === id ? {...qst, answers: [...qst.answers, initialValue]} : qst))
}

function handleDropAnswer(){
  setQuestions(questions => questions.filter(question => question.id !== id))
  setTimeout(() => setTitleStatus(), 200)
}

function moveQuestion(direction) {
  const replaceToIndex = direction === 1 ? index - 1 : index + 1;
  const scrollY = window.scrollY;
  const scrollAmount = 120 * - direction + scrollY

  // Check if moving the question is valid
  if ((index === 0 && direction === 1) || (index + 1 === questions.length && direction === -1)) {
      return;
  }

  // Create a new array with the question moved to the desired position
  const updatedQuestions = [...questions];
  const [question] = updatedQuestions.splice(index, 1);
  updatedQuestions.splice(replaceToIndex, 0, question);

  setQuestions(updatedQuestions);

  window.scrollTo({top: scrollAmount, behavior: "smooth"});
}

return (
  <div className={`${styles.questionWrapper}`} id={"q" + id}>  
    <div className={`${styles.question} ${showLess ? styles.showLess : ""} ${errors?.id === id ? styles.hasError : ""}`}>
      <span className={styles.questionId}>#id:{id}</span>

      <div className={styles.icons}>

        <div className={styles.deleteQuestionIcon}
          onDoubleClick={handleDropAnswer} 
          onMouseEnter={e => setTitleStatus({txt: "Double click to remove Questions", x: e.pageX, y: e.pageY})} 
          onMouseLeave={() => setTimeout(() => setTitleStatus(), 200)}
        >
          <i className="fa-solid fa-trash-can"></i>
        </div>

        <div className={styles.showQuestionIcon} onClick={() => setShowLess(v => !v)} >
          <i className={`fa-solid ${showLess ? "fa-plus" : "fa-minus"}`}></i>
        </div>

        <div className={styles.moveQuestionUpIcon} onClick={() => moveQuestion(1)}>
          <i className={"fa-solid fa-angle-up"}></i>
        </div>

        <div className={styles.moveQuestionDownIcon} onClick={() => moveQuestion(-1)}>
          <i className={"fa-solid fa-angle-down"}></i>
        </div>

      </div>

      <div className={styles.field}>
        <label htmlFor="name">Question N°: {index +1} </label>
        <input type="text" value={getQuestionTitle()} onChange={e => handleChangeQuestionName(e)} />
      </div>
      
      <div className={styles.answers}>

        {thisQuestion().answers.map((answer, ind) => <Answer key={answer.id} question={thisQuestion()} questionId={id} id={answer.id} index={ind} />)}

        <button tabIndex={-1} onClick={handleAddAnswer}>Add Answer</button>

      </div>
    </div>

  </div>
)
}