import React, { useRef } from 'react'
import { Outlet, useNavigate } from 'react-router'
import styles from "../../styles/config.container.module.css"
import { Link } from 'react-router-dom'

export default function Container() {
  const containerEl = useRef(null)
  const navigate = useNavigate()

  function goBack(e) {
    if(e.target === containerEl.current) navigate("/game")
  }
  
  return (
    <div className={styles?.container} ref={containerEl} onClick={e => goBack(e)}>
      <div className={styles?.wrapper}>
        <div className={styles.link}><Link to={"/game"}><i className="fa-regular fa-x"></i></Link></div>
        <Outlet/>
      </div>
    </div>
  )
}
