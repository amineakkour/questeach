import styles from "../styles/game.module.css"
import { Outlet, useNavigate } from "react-router-dom"
import GameHeader from "../components/GameHeader"
import GameQuestionWrapper from "../components/GameQuestionWrapper"
import { useEffect } from "react"
import { useStarterContext } from "../context/StarterProvider"

export default function Game(){
  const { file } = useStarterContext()
  const navigate = useNavigate()
  const {players} = useStarterContext()

  useEffect(() => {
    if(!(players.length >= 2 && file)){
      navigate("/2")
    }
  }, [players.length, file])


  if(players.length >= 2 && file){
    return (
      <div className={styles.gameBody}>
        <GameHeader />
      
        <div className={styles.content}>
          <Outlet />
          <div className={styles.title}>
            <h2>Choose a question for the Player Amine.</h2>
          </div>
          <GameQuestionWrapper fcontent={file.fcontent} />
        </div>
      </div>
    )
  }
}
