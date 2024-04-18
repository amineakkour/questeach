import { Link, useNavigate } from "react-router-dom"
import styles from "../../styles/createFile.module.css"
import { useEffect, useState } from "react"
import Title from "../Title"
import { useStarterContext } from "../../context/StarterProvider"
import { useCreateFileContext } from "../../context/CreateFileProvider"
import QuestionsWrapper from "./QuestionsWrapper"
import setLocalStorage from "../../functions/setLocalStorage"

export default function CreateFileContainer() {
  const {titleStatus, setTitleStatus, setFile} = useStarterContext();
  const {questions, setQuestions} = useCreateFileContext();
  const [fileName, setFileName] = useState(localStorage.getItem("fileName") || "exercices");
  const [errors, setErrors] = useState({invisible: true, text: "This is an error message"});
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem("fileName", fileName)
    setLocalStorage("questions", questions);
  }, [fileName, questions])


  function clearAllQuestions(){
    setQuestions([])
    setErrors(null)
    setTimeout(() => setTitleStatus(null), 200);  
  }

  function validateData(){
    const questionCounter = 3
    
    if(!fileName.length){
      return {text: "File name is required." }
    }
    
    if(questions.length < questionCounter){
      return { text: `Ensure that there are at least ${questionCounter} questions set.` }
    }

    for(var ind = 0; ind < questions.length; ind++){
      const q = questions[ind]
      const answers = q.answers
      var answersAreFilled = true
      var correctAnswersCounter = 0;

      if(!q.text.length){
        return { id: q.id, text: `#id:${q.id} Title Field is required.` }
      }

      if(answers.length < 2){
        return { id: q.id, text: `#id:${q.id} has a minimum of two answers.` }
      }

      // eslint-disable-next-line no-loop-func
      answers.map(ans => {
        
        if(!ans.text.length){
          answersAreFilled = false
        }

        if(ans.isCorrect){
          correctAnswersCounter += 1
        }
      })

      if(!answersAreFilled){
        return { id: q.id, text: `#id:${q.id} Answers field must not be left empty.` }
      }

      if(!correctAnswersCounter){
        return { id: q.id, text: `#id:${q.id} Ensure that there is at least one correct answer provided.` }
      }
    }
  }
  
  function handlePushFile(){
    const error = validateData()
    
    setErrors(error)

    if(error){
      window.scrollTo({top: 0, behavior: "smooth"});
    }else{
      setFile({fname: fileName, fcontent: questions})
      navigate("/2")
    }
  }

  function handleDownlad () {
    const error = validateData()
    
    setErrors(error)

    if(error){
      window.scrollTo({top: 0, behavior: "smooth"});
    }else{
      const jsonContent = JSON.stringify(questions);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); 
    }
  }

  return (
    <>
      {titleStatus && <Title />}

      <div className={styles.container}>

        <Link to={"/2"}>Back</Link>
        <h1>Create Json File:</h1>
        {(Boolean(errors) && !errors.invisible) && <div className={styles.error}>
          <p onClick={() => errors.id && document.querySelector(`#q${errors.id}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" }) }>
            {errors.text}
          </p>
        </div>}
        
        <div className={styles.fieldContainer}>
          <div className={styles.field}>
            <label htmlFor="name">Name of the file: </label>
            <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} />
          </div>

          
          {questions.length > 2 && <div className={styles.navigate}>
            navigate to question:
            <ul>
              
              {questions.map((q, i) => 
                <li key={i}>
                  <>
                    <Link onClick={() => document.querySelector(`#q${q.id}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })}>{i +1}</Link>
                  </>
                </li>
              )}
            </ul>
          </div>}

          <QuestionsWrapper />

            {Boolean(questions.length) && 
            <div className={styles.fileManagement}>
                
              <button
                onDoubleClick={clearAllQuestions} 
                onMouseEnter={e => setTitleStatus({txt: "Double click to remove Questions", x: e.pageX, y: e.pageY})} 
                onMouseLeave={() => setTimeout(() => setTitleStatus(), 200)}
              >
                <i className="fa-solid fa-trash-can"></i>
                Remove all questions
              </button>

              <button onClick={handlePushFile}>
                <i className="fa-solid fa-thumbtack"></i>
                Push File
              </button>

              <button onClick={handleDownlad}>
                <i className="fa-solid fa-download"></i>
                Download File
              </button>

            </div>
            }


        </div>
      </div>
    </>
  )
}
