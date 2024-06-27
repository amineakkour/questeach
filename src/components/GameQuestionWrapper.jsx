import styles from "../styles/gameQuestionWrapper.module.css";
import { useNavigate } from "react-router-dom"

export default function GameQuestionWrapper({ fcontent }){
  const navigate = useNavigate();

  function navigateToQuestion(question) {
    if(!question.disabled) {
      navigate(`q/${question.id}`);
    }
  }

  return (
    <div className={styles.questionWrapper}>
      {fcontent.map((q, ind) => <li onClick={() => navigateToQuestion(q)} key={ind} className={`${ind === 4 ? styles.disable : ""} ${styles.question}`}>{ind +1}</li>)}
    </div>
  )
}