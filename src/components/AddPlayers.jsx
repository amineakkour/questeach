import styles from "../styles/playersForm.module.css"

import {useEffect, useRef, useState } from "react";
import femaleAvatar from "../images/female-avatar.png";
import maleAvatar from "../images/male-avatar.png";
import shuffle from "../functions/shuffle"
import { ConfirmBox } from "../components/ConfirmBox";
import { useFocusInput } from "../hooks/useFocusInput";
import { useStarterContext } from "../context/StarterProvider";


export default function AddPlayers(){
  const { players, setPlayers, setTitleStatus, setSteps, setAlerts, setActivePlayer } = useStarterContext();

  const [sex, setSex] = useState("m");
  const [name, setName] = useState("");
  const [showMorePlayers, setShowMorePlayers] = useState(null);
  const [maxShownPlayers, setMaxShownPlayers] = useState(4);
  const [showConfirmBox, setShowConfirmBox] = useState(null);
  const [, setRerender] = useState(false);
  const nameLengthMax = 15;
  const playersLengthMax = 8;
  const setPlayerNameInput = useRef(null);
  const [activePlayerValue, setActivePlayerValue] = useState(localStorage.getItem("activePlayer"));

  useFocusInput("Enter", setPlayerNameInput.current)

  useEffect(() => {setShowMorePlayers(players.length > maxShownPlayers)}, [players, showMorePlayers, maxShownPlayers])

  function handleAddPlayer(){
    if(players.length >= playersLengthMax){
      setAlerts(alrts => [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1, state: 'error', chart: `Please the limit of the players is ${playersLengthMax}.`}])
      return 
    }

    // remove white spaces
    setName(n => n.trim())

    // check if the name contains space
    if(name.includes(" ")){
      setAlerts(alrts => [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1, state: 'error', chart: `Spaces are not allowed`}])
      return 
    }    
  
    if(name.length > nameLengthMax){
      setAlerts(alrts => [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1, state: 'error', chart: `Please limit the name of the player to a maximum of ${nameLengthMax} characters.`}])
      return 
    }

    if(name === ""){
      setAlerts(alrts => [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1, state: 'error', chart: 'The completion of the "Name" field is required'}])
      return 
    }

    setPlayers(players => [...players, {id: ((players[players.length -1]?.id +1) || 1) , name, sex, score: 0}])

    // back to default
    setSex("m")
    setName("")
  }

  function handleRemovePlayer(id){
    setPlayers(plrs => plrs.filter(plr => plr.id !== id))
    
    // remove title componenent
    setTimeout(() => setTitleStatus(null), 200)
  }
  
  function shufflePlyers(){
    const newArray = shuffle(players);

    setPlayers(newArray)
    setRerender(v => !v)

  }

  function handleRemoveAllPlayers(){
    setMaxShownPlayers(4);
    setShowConfirmBox(
      {
        message: "Are you sure? You want to delete all Players",
        trueLabel: {name: "Yes", action: () => {setPlayers([]); setShowConfirmBox(null)}},
        falseLabel: {name: "No", action: () => setShowConfirmBox(null)}
      } 
    )
  }

  function onChangeactivePlayerValue(direction) {
    var value = null;
    if(direction === 1) {
      value = parseInt(activePlayerValue) + direction > players.length -1 ? players.length -1 : parseInt(activePlayerValue) + direction;
    }else {
      value = parseInt(activePlayerValue) + direction < 0 ? 0 : parseInt(activePlayerValue) + direction;
    }

    setActivePlayerValue(value);
  }

  function handlePushPlayers () {
    if(name){
      setAlerts(alrts => [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1, state: 'error', chart: `Player {${name}} not added. click on Add Player button to move further.`}])
      return ""
    }

    setSteps(st => st +1)
  }

  return (
    <div className={styles.addPlayerformContainer}>

      {
        showConfirmBox && 
        <ConfirmBox 
          message={showConfirmBox.message} 
          trueLabel={{name: showConfirmBox.trueLabel.name, action: showConfirmBox.trueLabel.action} }
          falseLabel={{name: showConfirmBox.falseLabel.name, action: showConfirmBox.falseLabel.action}}
        />
      }

      <form className={`${styles.addPlayersWrapper}`} onSubmit={e => e.preventDefault()}>
        <div className={styles.inputBox}>
          <small className={styles.inputCount} style={{color: name.length > nameLengthMax ? "var(--red-color)" : ""}}>{name.length}/{nameLengthMax}</small>
          <input ref={setPlayerNameInput} disabled={players.length >= playersLengthMax} className={`${players.length >= playersLengthMax ? "disabledInput" : ""}`} type="text" placeholder="Player name" value={name} onChange={e => setName(e.target.value)} />
          <button disabled={players.length >= playersLengthMax} onClick={() => handleAddPlayer()} className={`${players.length >= playersLengthMax ? "disabledButton" : ""}`}>Add player</button>
        </div>

        <div className="sex">
            <p>Sex:</p>
            
            <div className={styles.fieldsWrapper}>
              <div className={styles.field}>
                <input type="radio" name="sex" id="male" value="male" checked={sex === "m"} onChange={() => setSex("m")}/>
                <label htmlFor="male"><span className={styles.title}>Male</span> <i style={{color: "skyblue"}} className="fa-solid fa-mars"></i></label>
              </div>
              <div className={styles.field}>
                <input type="radio" id="female" name="sex" value="female" checked={sex === "f"} onChange={() => setSex("f")} />
                <label htmlFor="female"><span className={styles.title}>Female</span> <i style={{color: "pink"}} className="fa-solid fa-venus"></i></label>
              </div>
            </div>
        </div>

        <div className={styles.players}>
          <div className={styles.activePlayer}>
            <label htmlFor="activePlayerValue">Start with player:</label>
            <button onClick={() => onChangeactivePlayerValue(-1)}>{"-"}</button>
            <output>{parseInt(activePlayerValue) +1}</output>
            <button onClick={() => onChangeactivePlayerValue(1)}>{"+"}</button>
          </div>
          <p className={styles.count}>Players count: <b>{players.length}/{playersLengthMax}</b></p>
          
          {players.length > 0 &&
          (players.map((player, ind) => {
            return (
            (ind < maxShownPlayers) && 
            <div key={ind} className={`${styles.player} ${ind == activePlayerValue ? styles.active : ''}`}>
              <div className={styles.ind}>
                {ind +1}
              </div>
              <div className={styles.image}>
                <img src={player.sex === "m" ? maleAvatar : femaleAvatar} alt={`${player.sex === "m" ? "Male" : "Female"} avatar`}/>
              </div>
    
              <div className={styles.name}>
                <p>Name: <b style={{textTransform: "capitalize"}}>{player.name}</b></p>
              </div>
    
              <div className={styles.remove} onDoubleClick={() => handleRemovePlayer(player.id)} onMouseEnter={e => setTitleStatus({txt: `Double click to remove Player ${player.name}`, x: e.pageX, y: e.pageY})} onMouseLeave={() => setTimeout(() => setTitleStatus(null), 200)}>
              <i className="fa-solid fa-user-minus"></i>  
              </div>
            </div>) 
          }))
        }
        {showMorePlayers &&
          <p onClick={() => {setMaxShownPlayers(99)}} className={`${styles.show} ${styles.showMore}`}>Show More<i className="fa-solid fa-caret-down"></i></p>
        }
        {!showMorePlayers && players.length > 4 &&
          <p onClick={() => {setMaxShownPlayers(4)}} className={`${styles.show} ${styles.showLess}`}>Show Less<i className="fa-solid fa-caret-up"></i></p>
        }

        <div className={styles.settings}>
          {players.length > 1 && <button className={styles.param} onClick={handleRemoveAllPlayers}>Delete All Players<i className="fa-solid fa-trash"></i></button>}
          {players.length > 1 && <button className={styles.param} onClick={shufflePlyers}>Suffle Players <i className="fa-solid fa-broom"></i></button>}
        </div>
        </div>

          {players.length >= 2 && <div className={styles["next-wrapper"]}>
          <button onClick={handlePushPlayers} className={`${styles.next} active-btn`}>Next <i className="fa-solid fa-arrow-right"></i></button>
      </div>}
      </form>

      
          
    </div>
  )
}