import ChangeFile from './config/file/ChangeFile';
import CreateFile from './create-file/CreateFile';
import ChooseFile from './ChooseFile';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Container from "./config/Container";
import EditPlayers from "./config/players/EditPlayers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import setLocalStorage from '../functions/setLocalStorage';
import { useEffect } from 'react';
import { useStarterContext } from '../context/StarterProvider';

export default function Skelaton() {
  const {players, file } = useStarterContext()

  useEffect(() => {
    setLocalStorage("players", players);
    setLocalStorage("file", file);

    if(file) setLocalStorage("ex_file", file);
  }, [players, file])

  return (
    <BrowserRouter>
        <Routes>
          <Route path='' element={<Home />} />
          <Route path='/:pageId' element={<Home />} />
          <Route path='create-file' element={<CreateFile />} />
          <Route path='choose-file' element={<ChooseFile />} />

          <Route path="game" element={<Game />}>
            <Route path='config' element={<Container />}>
              <Route path='players' element={<EditPlayers />} />
              <Route path='file' element={<ChangeFile />} />
            </Route>
          </Route>

          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
    </BrowserRouter>
  )
}
