import Home from './pages/Home';
import Game from './pages/Game';
import Container from "./components/config/Container";
import EditPlayers from "./components/config/players/EditPlayers";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from 'react';
import CreateFile from './components/CreateFile';
import ChooseFile from './components/ChooseFile';
import setLocalStorage from './functions/setLocalStorage';
import getLocalStorage from './functions/getLocalStorage';

export const MyContext = createContext()

export default function App(){
  const [titleStatus, setTitleStatus] = useState(null)
  const [steps, setSteps] = useState(1);
  const [showInfos, setShowInfos] = useState(false)
  const [players, setPlayers] = useState(getLocalStorage("players") || []);
  const [file, setFile] = useState(getLocalStorage("file") || null)

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

    if(file) setLocalStorage("ex_file", file);
  }, [players, file])
  
  return (
    <BrowserRouter>
      <MyContext.Provider value={allProps}>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/:pageId' element={<Home />} />
          <Route path='create-file' element={<CreateFile />} />
          <Route path='choose-file' element={<ChooseFile />} />

          <Route path="game" element={<Game />}>
            <Route path='config' element={<Container />}>
              <Route path='players' element={<EditPlayers />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  )
}

export function useMyContext() {
  const myc = useContext(MyContext)
  return myc
}