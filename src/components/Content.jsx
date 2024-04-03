
import styles from "../styles/content.module.css";
import FileForm from "../components/FileForm"
import AlertBox from "../components/AlertBox"
import AddPlayers from "../components/AddPlayers"
import Infos from "../components/Infos";

import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; 
import { useMyContext } from "../App";
import StartButton from "./StartButton";
import BackToButton from "./BackToButton";
import { useEffect } from "react";

export default function Content(){
  const navigate = useNavigate()
  const {pageId} = useParams()

  const [steps, setSteps] = useMyContext().steps
  const [showInfos] = useMyContext().showInfos
  const [alerts] = useMyContext().alerts

  useEffect(() => setSteps(parseInt(pageId) || 1), [setSteps, pageId])


  return(
  <div className={styles.content}>
    {alerts.length > 0 && <AlertBox />}
    {showInfos && <Infos />}

    <BackToButton />

    {steps === 1 && <StartButton />}

    {steps === 2 && <FileForm />}

    {steps === 3 && <AddPlayers />}

    {steps >= 4 && navigate("/game")}
  </div>
  )
}