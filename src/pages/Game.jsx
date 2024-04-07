import styles from "../styles/game.module.css"
import { useMyContext } from "../App"
import { useNavigate } from "react-router-dom"
import GameHeader from "../components/GameHeader"
import GameQuestionWrapper from "../components/GameQuestionWrapper"
import { useEffect } from "react"

export default function Game(){
  const [fileContent] = useMyContext().file
  const navigate = useNavigate()
  const [players] = useMyContext().players

  useEffect(() => {
    if(!(players.length >= 2 && fileContent)){
      navigate("/2")
    }
  }, [players.length, fileContent])


  if(players.length >= 2 && fileContent){
    return (
      <div className={styles.gameBody}>
        <GameHeader />
      
        <div className={styles.content}>
          <div className={styles.title}>
            <h2>Choose a question for the Player Amine.</h2>
          </div>
          <GameQuestionWrapper fcontent={fileContent.fcontent} />
        </div>
      </div>
    )
  }
}