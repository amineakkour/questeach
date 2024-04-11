import { useStarterContext } from "../context/StarterProvider";
import styles from "../styles/content.module.css";

export default function StartButton(){
  const { setSteps } = useStarterContext()

  return (
    <button className={`${styles.startBtn} active-btn center-with-position-absolute`} onClick={() => setSteps(stp => stp +1)}>Start game</button>
  )
}