import { useEffect } from "react"
import { useStarterContext } from "../../context/StarterProvider"
import styles from "../../styles/config.timer.module.css"

export default function ActiveTimer() {
  const {timer, setTimer} = useStarterContext()

  return (
    <div>
      <br />
      <div className={styles.field}>
        
      <div className={styles.checkboxWrapper46}>
        <h4>Active Timer</h4>
        <input 
          type="checkbox" 
          id="cbx-46" className={styles.inpCbx} 
          checked={timer.isActive} 
          onChange={e => setTimer(timer => {return ({...timer, isActive: e.target.checked})})} />
        <label htmlFor="cbx-46" className={styles.cbx}><span>
          <svg viewBox="0 0 12 10" height="10px" width="12px"><polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg>
          </span><span></span>
        </label>
      </div>

        
      </div>
    </div>
  )
}
