import { createContext, useContext, useEffect, useState } from 'react'
import getLocalStorage from '../functions/getLocalStorage';
import setLocalStorage from '../functions/setLocalStorage';

const MyContext = createContext();

export default function StarterProvider({children}) {
  const [titleStatus, setTitleStatus] = useState(null);
  const [steps, setSteps] = useState(1);
  const [showInfos, setShowInfos] = useState(false);
  const [players, setPlayers] = useState(getLocalStorage("players") || []);
  const [file, setFile] = useState(getLocalStorage("file") || null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alerts, setAlerts] = useState([])
  const [timer, setTimer] = useState(getLocalStorage("timer") || {seconds: 20, isActive: true})
  const [activePlayer, setActivePlayer] = useState(localStorage.getItem("activePlayer") || 0)

  useEffect(() => {
    setLocalStorage("players", players);
    setLocalStorage("file", file);
    setLocalStorage("timer", timer);
    localStorage.setItem("activePlayer", activePlayer)

    if(file) setLocalStorage("ex_file", file);
  }, [players, file, timer, activePlayer])

  const allProps = {
    players, setPlayers,
    file, setFile,
    alerts, setAlerts,
    titleStatus, setTitleStatus,
    steps, setSteps,
    showInfos, setShowInfos,
    isGameStarted, setIsGameStarted,
    timer, setTimer, 
    activePlayer, setActivePlayer,
  }

  return (
    <MyContext.Provider value={allProps}>
      {children}
      </MyContext.Provider>
  )
}

export const useStarterContext = () => {
  return useContext(MyContext)
}
