import styles from "../styles/fileForm.module.css"
import { useMyContext } from "../App"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import getLocalStorage from "../functions/getLocalStorage"
import setLocalStorage from "../functions/setLocalStorage"

export default function FileForm(){
  const [, setAlerts] = useMyContext().alerts
  const [, setSteps] = useMyContext().steps
  const [file, setFile] = useMyContext().file
  const input = useRef(null)

  function editFileContent(newFile){
    setFile(newFile)
  }
  
  function clearFileContent(){
    input.current.value = null
    setFile(null)
  }

  function handleFileChange(e){
    try {
      const file = e.target.files[0]

      if(!file?.name){
        throw new Error("Please designate a json file to advance further")
      }

      if(file.name.split(".").pop() !== "json"){
        clearFileContent()
        throw new Error("The chosen file must be in a JSON format")
      }

      const reader = new FileReader()

      reader.readAsText(file)
      reader.onload = () => {
        editFileContent({fname: file?.name, fcontent: JSON.parse(reader.result)})
      }
    } catch (error) {
      setAlerts(alrts => {return [...alrts, {id: alrts[alrts.length -1]?.id +1 || 1 , state: "error", chart: error.message}]})
    }
  }

  function recoverFile(){
    const ex_file = getLocalStorage("ex_file");

    if(ex_file){
      setFile(ex_file)
    }

  }

  return (
    <form className={`center-with-position-absolute ${styles.fileForm}`}>
      <div>
        <p>Please choose questions/answers json file</p>
        <input className={styles.fileInput} ref={input} type="file" onChange={e => handleFileChange(e)}/>
        
        <div className={styles.wrapperFakeInput}>
          <p className={styles.fakeInput}>{file ? "Change File" : "Choose File"}</p>
          <p className={styles.fakeLabel}>{file ? (file.fname?.split(".").length > 1 ? file.fname : file.fname?.concat(".json")) : "No file chosen"}</p>
        </div>

        {file?.fname && <div className={styles["next-wrapper"]}>
        <small onClick={clearFileContent} className={styles.dropFile}><i className="fa-solid fa-trash"></i> Drop file</small>
        <button onClick={() => setSteps(st => st +1)} className={`${styles.next} active-btn`}>Next <i className="fa-solid fa-arrow-right"></i></button>
      </div>}
      </div>

      {!file?.fname && 
        <ul className={styles.fileparams}>
          <li><Link to={"/create-file"}>Create File</Link></li>
          {getLocalStorage("ex_file") && <li><Link onClick={recoverFile}>Recover File</Link></li>}
        </ul>
      }
    </form>
  )
}