import { createContext } from 'react';
import Skelaton from './components/Skelaton';
import StarterProvider from './context/StarterProvider';

export const MyContext = createContext();

export default function App(){
  
  return (
    <StarterProvider>
      <Skelaton />
    </StarterProvider>
  )
}