import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import style from "../styles/chooseFile.module.css"

function ChooseFile() {
  return (
    <div className={style.container}>
      <Link to={"/2"}>Back</Link>
      <h2>Choose File:</h2>

      <div className={style.file}>

        <div className={style.title}>
          <b>File Name:</b> hello_world.json
        </div>
        <div className={style.btns}>
          <button className={style.choose}><i className="fa-solid fa-check"></i></button>
          <button className={style.delete}><i className="fa-solid fa-trash"></i></button>
        </div>

      </div>

      <div className={style.file}>

        <div className={style.title}>
          <b>File Name:</b> hello_world.json
        </div>
        <div className={style.btns}>
          <button className={style.choose}><i className="fa-solid fa-check"></i></button>
          <button className={style.delete}><i className="fa-solid fa-trash"></i></button>
        </div>

      </div>
    </div>
  )
}

export default ChooseFile