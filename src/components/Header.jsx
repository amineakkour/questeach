import { useStarterContext } from "../context/StarterProvider";
import styles from "../styles/header.module.css"
import { useNavigate } from 'react-router-dom';


export default function Header(){
  const {steps} =  useStarterContext()
  const {setTitleStatus} =  useStarterContext()
  const {setShowInfos} =  useStarterContext()
  const navigate = useNavigate()

  return (
    <div className={styles.header}>
        <div
          className={styles.steps}
          onClick={() => navigate(0)} 
          onMouseEnter={e => setTitleStatus({txt: "Click to refresh the page", x: e.pageX, y: e.pageY})} 
          onMouseLeave={() => setTimeout(() => setTitleStatus(null), 200)}>
            Steps: <span className={styles.step}>{steps}</span>/3
        </div>

        <div className={styles.infos}
          onClick={() => setShowInfos(v => !v)}
          onMouseEnter={e => setTitleStatus({txt: `More informations`, x: e.pageX, y: e.pageY})}
          onMouseLeave={() => setTimeout(() => setTitleStatus(null), 200)}>
            <span><i className="fa-solid fa-info"></i></span>
        </div>
    </div>
  )
}