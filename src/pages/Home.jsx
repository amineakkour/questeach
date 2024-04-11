import Title from "../components/Title.jsx"
import Content from "../components/Content.jsx";
import Header from "../components/Header.jsx";
import {useMyContext } from "../App.jsx"

export default function Home() {
  const [ titleStatus ] = useMyContext().title
  


  return (
      <div className="app">
        {titleStatus && <Title/>}

        <Header/>
        <Content/>

      </div>
  );
}

