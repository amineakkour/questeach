import { createContext, useContext, useState } from 'react'
import getLocalStorage from '../functions/getLocalStorage';

const MyContext = createContext();

export default function StarterProvider({children}) {
  const [titleStatus, setTitleStatus] = useState(null);
  const [steps, setSteps] = useState(1);
  const [showInfos, setShowInfos] = useState(false);
  const [players, setPlayers] = useState(getLocalStorage("players") || []);
  const [file, setFile] = useState(getLocalStorage("file") || null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [alerts, setAlerts] = useState([])

  const allProps = {
    players,
    setPlayers,
    file,
    setFile,
    alerts,
    setAlerts,
    titleStatus,
    setTitleStatus,
    steps,
    setSteps,
    showInfos,
    setShowInfos,
    isGameStarted,
    setIsGameStarted,
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
