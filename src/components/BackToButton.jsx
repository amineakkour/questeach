import styles from "../styles/content.module.css"
import { useStarterContext } from "../context/StarterProvider"

export default function BackToButton() {
  const {steps, setSteps} = useStarterContext()
  const {setTitleStatus} = useStarterContext()

  return (
    <button 
      disabled={steps <= 1}
      onClick={() => setSteps(stp => stp -1)}
      onMouseEnter={e => setTitleStatus({txt: `Back to step {${steps -1}}`, x: e.pageX, y: e.pageY})} 
      onMouseLeave={() => setTimeout(() => setTitleStatus(null), 200)}
      className={`${styles["back-btn"]} ${steps <= 1 ? styles.disabled : ""}`}>
        <i className="fa-solid fa-arrow-left-long"></i>
    </button>
  )
}