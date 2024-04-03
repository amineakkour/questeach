import Home from './pages/Home';
import Game from './pages/Game';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from 'react';
import CreateFile from './components/CreateFile';
import ChooseFile from './components/ChooseFile';
import setLocalStorage from './functions/setLocalStorage';
import getLocalStorage from './functions/getLocalStorage';

export const myContext = createContext()

export default function App(){
  const [titleStatus, setTitleStatus] = useState(null)
  const [steps, setSteps] = useState(1);
  const [showInfos, setShowInfos] = useState(false)
  const [players, setPlayers] = useState(getLocalStorage("players") || []);
  const [file, setFile] = useState(getLocalStorage("file") || null)

  useEffect(() => console.log(players), [players])

  const [alerts, setAlerts] = useState([])

  const allProps = {
    players: [players, setPlayers], 
    file: [file, setFile],
    alerts: [alerts, setAlerts],
    title: [titleStatus, setTitleStatus],
    steps: [steps, setSteps],
    showInfos: [showInfos, setShowInfos]
  }

  useEffect(() => {
    setLocalStorage("players", players);
    setLocalStorage("file", file);

    // const fileFromStorage = getLocalStorage("file");
    if(file) setLocalStorage("ex_file", file);
  }, [players, file])
  
  return (
    <BrowserRouter>
      <myContext.Provider value={allProps}>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/:pageId' element={<Home />} />
          <Route path='create-file' element={<CreateFile />} />
          <Route path='choose-file' element={<ChooseFile />} />
          <Route path="game" element={<Game />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </myContext.Provider>
    </BrowserRouter>
  )
}

export function useMyContext() {
  const myc = useContext(myContext)
  return myc
}