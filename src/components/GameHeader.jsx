import maleAvatar from "../images/male-avatar.png"
import femaleAvatar from "../images/female-avatar.png"

import { useMyContext } from "../App"
import styles from "../styles/game.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function GameHeader(){
  const [players] = useMyContext().players

  return (
    <div className={styles.header}>

      <div className={styles.playersContainer}>
        {players.map((ply, ind) => {
          return (
              <div className={`${styles.player} ${ind === 0 ? styles.active : ""}`} key={ply.id}>
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
  const [, setSetps] = useMyContext().steps
  const [isPlayersButtonActivate, setIsPlayersButtonActivate] = useState(false)
  const [isFileButtonActivate, setIsFileButtonActivate] = useState(false)
  const [isTimeButtonActivate, setIsTimeButtonActivate] = useState(false)

  const navigate = useNavigate()

  return (
    <div className={styles.paremeters}>
      <ul>      
        <div className={`${styles.Item} ${isPlayersButtonActivate ? styles.active : ""}`}>

          <button>Restart</button>

        </div>

        <div className={`${styles.Item} ${isPlayersButtonActivate ? styles.active : ""}`}>

          <button onClick={() => setIsPlayersButtonActivate(v => !v)}>Players <i className="fa-solid fa-chevron-down"></i></button>

          {isPlayersButtonActivate && <div className={styles.subItems}>
              <button onClick={() => navigate("/3")}>Add Player</button>
              <button onClick={() => navigate("/3")}>Activate Player</button>
              <button><Link to={"/3"}>Remove Player</Link></button>
              <button>Edit Player</button>
          </div>}

        </div>

        <div className={`${styles.Item} ${isFileButtonActivate ? styles.active : ""}`}>
          <button onClick={() => setIsFileButtonActivate(v => !v)}>File <i className="fa-solid fa-chevron-down"></i></button>

          {isFileButtonActivate && <div className={styles.subItems}>
            <button><Link to={"/2"}>Change File</Link></button>
            <button>Remove Question</button>
            <button>shuffle questions</button>
            <button>Reactivate Quests</button>
            <button>Desactivate Quests</button>
          </div>}

        </div>

        <div className={`${styles.Item} ${isTimeButtonActivate ? styles.active : ""}`}>
          <button onClick={() => setIsTimeButtonActivate(v => !v)} >Timer <i className="fa-solid fa-chevron-down"></i></button>

          {isTimeButtonActivate && <div className={styles.subItems}>
            <button>Edit Timer</button>
            <button>Remove Timer</button>
          </div>}

        </div>

      </ul>
    </div>
  )
}