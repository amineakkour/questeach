import { useMyContext } from "../App";
import styles from "../styles/content.module.css";

export default function StartButton(){
  const [, setSteps] = useMyContext().steps

  return (
    <button className={`${styles.startBtn} active-btn center-with-position-absolute`} onClick={() => setSteps(stp => stp +1)}>Start game</button>
  )
}