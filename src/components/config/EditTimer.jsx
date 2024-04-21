import { useEffect } from "react"
import { useStarterContext } from "../../context/StarterProvider"
import styles from "../../styles/config.timer.module.css"

export default function EditTimer() {
  const {timer, setTimer} = useStarterContext()

  function editTimer(newSeconds){
    newSeconds = Math.abs(newSeconds)
    if(newSeconds > (3 * 60)) newSeconds = 3 * 60; // 3 minutes max
    setTimer(newTimer => {return {...newTimer, seconds: newSeconds}})
  }

  return (
    <div>
      <h2>Edit timer</h2>
      <br />
      <div className={styles.field}>
        <input type="number" min="0" className={styles.seconds} value={timer.seconds} onChange={e => editTimer(e.target.value)} />
        <h5>Seconds</h5>
      </div>
    </div>
  )
}
