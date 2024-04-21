import maleAvatar from "../images/male-avatar.png"
import femaleAvatar from "../images/female-avatar.png"

import styles from "../styles/game.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useStarterContext } from "../context/StarterProvider"

export default function GameHeader(){
  const {players, activePlayer} = useStarterContext()

  return (
    <div className={styles.header}>

      <div className={styles.playersContainer}>
        {players.map((ply, ind) => {
          return (
              <div className={`${styles.player} ${ind == activePlayer ? styles.active : ""}`} key={ply.id}>
                <div className={styles.avatar}>
                  <img src={ply.sex === "m" ? maleAvatar : femaleAvatar} alt={ply.sex + " Avatar"} />
                </div>
                <p className={styles.name}>{ply.name}</p>
                <p className={styles.score}>{ply.score || 0}</p>
              </div>
          )
        })}
      </div>


      <List />
      </div>
  )
}

function List(){
  const {setFile} = useStarterContext()
  const {setPlayers} = useStarterContext()
  const {setIsGameStarted} = useStarterContext()

  const [isPlayersButtonActivate, setIsPlayersButtonActivate] = useState(false)
  const [isFileButtonActivate, setIsFileButtonActivate] = useState(false)
  const [isTimeButtonActivate, setIsTimeButtonActivate] = useState(false)


  const navigate = useNavigate()

  function restart(){
    setIsGameStarted(false)
    setFile(null)
    setPlayers([])
    navigate("/")
  }

  return (
    <nav className={styles.paremeters}>
      <ul>      
        <div className={`${styles.Item} ${isPlayersButtonActivate ? styles.active : ""}`}>

          <button onClick={restart}>Restart</button>

        </div>

        <div className={`${styles.Item} ${isPlayersButtonActivate ? styles.active : ""}`}>

          <button onClick={() => setIsPlayersButtonActivate(v => !v)}>Players <i className="fa-solid fa-chevron-down"></i></button>

          {isPlayersButtonActivate && <div className={styles.subItems}>
              <button onClick={() => navigate("config/players")}>Edit Players</button>
          </div>}

        </div>
        
        <div className={`${styles.Item} ${isTimeButtonActivate ? styles.active : ""}`}>
          <button onClick={() => setIsTimeButtonActivate(v => !v)} >Timer <i className="fa-solid fa-chevron-down"></i></button>

          {isTimeButtonActivate && <div className={styles.subItems}>
            <button onClick={() => navigate("config/timer/edit")}>Edit Timer</button>
            <button onClick={() => navigate("config/timer/active")}>Active Timer</button>
          </div>}

        </div>

      </ul>
    </nav>
  )
}