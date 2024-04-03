import styles from "../styles/gameQuestionWrapper.module.css";
import { useNavigate } from "react-router-dom"

export default function GameQuestionWrapper({ fcontent }){
  const navigate = useNavigate();

  return (
    <div className={styles.questionWrapper} style={{gridTemplateColumns: `repeat(${Math.floor(window.innerWidth / 90 * .8)}, 1fr)`}}>
      {fcontent.map((q, ind) => <div key={q.id} onClick={() => navigate("./")} className={`${ind === 4 ? styles.disable : ""} ${styles.question}`}>{ind +1}</div>)}
    </div>
  )
}