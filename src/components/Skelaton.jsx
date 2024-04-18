import ChangeFile from './config/file/ChangeFile';
<<<<<<< HEAD
import CreateFile from './create-file/CreateFile';
=======
import EditTimer from './config/timer/EditTimer';
import CreateFile from './CreateFile';
>>>>>>> e237b511673409b5b2372e7ec6ab88df7d85a633
import ChooseFile from './ChooseFile';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Container from "./config/Container";
import EditPlayers from "./config/players/EditPlayers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import setLocalStorage from '../functions/setLocalStorage';
import { useEffect } from 'react';
import { useStarterContext } from '../context/StarterProvider';
import Error404 from '../pages/Error404';

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
              <Route path='timer'>
              <Route path='edit' element={<EditTimer />} />

              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}
