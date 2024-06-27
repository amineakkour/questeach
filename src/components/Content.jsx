
import styles from "../styles/content.module.css";
import FileForm from "../components/FileForm"
import AlertBox from "../components/AlertBox"
import AddPlayers from "../components/AddPlayers"
import Infos from "../components/Infos";

import { useNavigate } from 'react-router-dom'; 
import StartButton from "./StartButton";
import BackToButton from "./BackToButton";
import { useEffect } from "react";
import { useStarterContext } from "../context/StarterProvider";

export default function Content(){
  const navigate = useNavigate()

  const { steps } = useStarterContext()
  const { showInfos } = useStarterContext()
  const { alerts } = useStarterContext()
  
  useEffect(() => {
    if(steps >= 4) navigate('/game');
  }, [navigate, steps])

  return(
  <div className={styles.content}>
    {alerts.length > 0 && <AlertBox />}
    {showInfos && <Infos />}

    <BackToButton />

    {steps === 1 && <StartButton />}

    {steps === 2 && <FileForm />}

    {steps === 3 && <AddPlayers />}

  </div>
  )
}