import EditTimer from './config/EditTimer';
import CreateFile from './create-file/CreateFile';
import ChooseFile from './ChooseFile';
import Home from '../pages/Home';
import Game from '../pages/Game';
import Container from "./config/Container";
import EditPlayers from "./config/EditPlayers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from '../pages/Error404';
import ActiveTimer from './config/ActiveTimer';
import Question from '../pages/Question';
import { useEffect, useState } from 'react';
import DevilceNotAllowed from '../pages/DeviceNotAllowed';

export default function Skelaton() {
  var [isMobile, setIsMobile] = useState(false);
  var [continuo, setContinuo] = useState(false);

  useEffect(() => {
    if(window.innerWidth < 600) setIsMobile(true)
  }, [])

  if(isMobile && !continuo) return <DevilceNotAllowed setContinuo={setContinuo} />

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:pageId' element={<Home />} />
          <Route path='create-file' element={<CreateFile />} />
          <Route path='choose-file' element={<ChooseFile />} />

          <Route path="game" element={<Game />}>
            <Route path='config' element={<Container />}>
              <Route path='players' element={<EditPlayers />} />
              <Route path='timer'>
                <Route path='edit' element={<EditTimer />} />
                <Route path='active' element={<ActiveTimer />} />
              </Route>
            </Route>

            <Route path='q/:id' element={<Question />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
    </BrowserRouter>
  )
}
