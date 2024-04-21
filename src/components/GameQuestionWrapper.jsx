import styles from "../styles/gameQuestionWrapper.module.css";
import { Link, useNavigate } from "react-router-dom"

export default function GameQuestionWrapper({ fcontent }){
  const navigate = useNavigate();

  return (
    <div className={styles.questionWrapper}>
      {fcontent.map((q, ind) => <Link to={`q/${q.id}`} key={q.id} onClick={() => navigate("./")} className={`${ind === 4 ? styles.disable : ""} ${styles.question}`}>{ind +1}</Link>)}
    </div>
  )
}