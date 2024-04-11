import { useEffect, useRef, useState } from "react"
import { useStarterContext } from "../context/StarterProvider"

export default function Title(){
  const { titleStatus } = useStarterContext()
  const { x } = titleStatus
  const { y } = titleStatus
  const { txt } = titleStatus

  const titleEl = useRef(null)
  const [titleElementWidth, settitleElementWidth] = useState(0)
  const screenWidth = window.innerWidth 

  // check if title element should be reversed
  var reversetitle = x + titleElementWidth > screenWidth //return true or false

  useEffect(() => {
    settitleElementWidth(titleEl.current?.clientWidth)
  }, [])

  const titleStyles = {
    position: "absolute", 
    top: (y + 15) + "px", 
    left: (reversetitle ? x - titleElementWidth : x + 10) + "px",
    border: "1px solid var(--third-color)",
    backgroundColor: "var(--white-color)",
    color: "var(--third-color)",
    padding: "5px 10px",
    fontSize: "15px",
    borderRadius: "2px",
    textWrap: "nowrap",
    zIndex: 100,
  }

  return <p ref={titleEl} style={titleStyles}>{txt}</p>

}