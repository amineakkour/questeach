import { useEffect, useState } from "react"
import { useStarterContext } from "../../context/StarterProvider"
import styles from "../../styles/config.timer.module.css"

export default function EditTimer() {
  const {timer, setTimer} = useStarterContext()
  const [error, setError] = useState("");

  useEffect(() => {
    if(error) setTimeout(() => setError(""), 2_000);
  }, [error])

  function editTimer(seconds){
    if(seconds > (3 * 60)) {
      seconds = 3 * 60; // 3 minutes max
      setError("The timer cannot be set for more than three minutes")
    }else if(seconds < (10))
      seconds = 10; // 10 seconds min
      setError("The timer cannot be set for less than 10 seconds")

    setTimer(newTimer => {return {...newTimer, seconds: seconds}})
  }

  return (
    <div>
      <h2>Edit timer</h2>
      <br />
      <div className={styles.field}>
        <p>Set timer in second for each question:</p>
        <input type="number" min="0" disabled={!timer.isActive} className={styles.seconds} value={timer.seconds} onChange={e => editTimer(e.target.value)} />
        <h5>Seconds</h5>
      </div>

      <div className={styles.error}>
        {error && <p>{error}</p>}
        {!timer.isActive && <p>The timer is not activate <button onClick={(() => setTimer(timer => {return {...timer, isActive: true}}))}>Activate timer</button></p>}
      </div>
    </div>
  )
}
