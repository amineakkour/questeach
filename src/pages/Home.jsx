import Title from "../components/Title.jsx";
import Content from "../components/Content.jsx";
import Header from "../components/Header.jsx";
import { useStarterContext } from "../context/StarterProvider.jsx";
import { useParams } from "react-router";
import { useEffect } from "react";

export default function Home() {
  const {titleStatus, setSteps, } = useStarterContext()
  const {pageId} = useParams()

  useEffect(() => setSteps(parseInt(pageId) || 1), [setSteps, pageId])
  
  return (
      <div className="app">
        {titleStatus && <Title/>}

        <Header/>
        <Content/>

      </div>
  );
}

