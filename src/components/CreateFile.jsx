import { Link, useNavigate } from "react-router-dom"
import styles from "../styles/createFile.module.css"
import { useMyContext } from "../App"
import { createContext, useContext, useEffect, useState } from "react"
import Title from "./Title"

const createFileContext = createContext();

function Answer({id, index, question, questionId}){
  const [, setQuestions] = useContext(createFileContext).questions.values


  function thisAnswer(){
    return question.answers.filter(ans => ans.id === id)[0]
  }

  function deleteAnswer(){
    var updatedAnswers = question.answers
    updatedAnswers = updatedAnswers.filter(ans => ans.id !== id)

    setQuestions(questions => questions.map(q => q.id === questionId ? {...q, answers: updatedAnswers} : q))
  }

  function editAnswerTitle(value){
    const editedAnswers = question.answers.map(ans => ans.id === id ? {...ans, text: value} : ans)

    setQuestions(questions => questions.map(qst => qst.id === questionId ? {...qst, answers: editedAnswers} : qst))
  }

  function editIsCorrect(value){
    const editedAnswers = question.answers.map(ans => ans.id === id ? {...ans, isCorrect: value} : ans)

    setQuestions(questions => questions.map(qst => qst.id === questionId ? {...qst, answers: editedAnswers} : qst))
  }

  return (
    <div className={styles.answer}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Answer {index +1}: </label>
        <input type="text" tabIndex={-1} id="text" value={thisAnswer().text} onChange={e => editAnswerTitle(e.target.value)}  />
      </div>

      
      <div className={styles.answerParams}>
        <div className={styles.isCorrect}>
          <label htmlFor={`correctForA${id}Q${questionId}`}>Correct</label>
          <input type="checkbox" tabIndex={-1} id={`correctForA${id}Q${questionId}`} checked={thisAnswer().isCorrect} onChange={e => editIsCorrect(e.target.checked)}
          />
          <div className={`${styles.fakeCheckBox} ${thisAnswer().isCorrect ? styles.fill : ''}`}></div>
        </div>
          
          <div className={styles.remove} onClick={deleteAnswer}>
            Delete
          </div>
      </div>
    </div>
  )
}
  
  function Question({id, index}){
    const [, setTitle] = useMyContext().title;
    const [showLess, setShowLess] = useState(id !== 1) // return true when for the first question
    const [questions, setQuestions] = useContext(createFileContext).questions.values;
    const [answersCounter, setAnswersCounter] = useState(2) // starts with 2 because we have 2 default answers with each question
    const [errors] = useContext(createFileContext).errors;

  function thisQuestion(){
    return questions.filter(qst => qst.id === id)[0]
  }

  function getQuestionTitle(){
    return thisQuestion().text
  }

  function handleChangeQuestionName(e){
    const newText = e.target.value;

    setQuestions(questions.map(qst => qst.id === id ? {...qst, text: newText} : qst))
  }

  function handleAddAnswer(){
    const initialValue = {id: answersCounter, text: "", isCorrect: false};
    setAnswersCounter(c => c +1)

    setQuestions(questions => questions.map(qst => qst.id === id ? {...qst, answers: [...qst.answers, initialValue]} : qst))
  }

  function handleDropAnswer(){
    setQuestions(questions => questions.filter(question => question.id !== id))
    setTimeout(() => setTitle(), 200)
  }


  function moveQuestion(direction) {
    const replaceToIndex = direction === 1 ? index - 1 : index + 1;
    const scrollY = window.scrollY;
    const scrollAmount = 120 * - direction + scrollY

    // Check if moving the question is valid
    if ((index === 0 && direction === 1) || (index + 1 === questions.length && direction === -1)) {
        return;
    }

    // Create a new array with the question moved to the desired position
    const updatedQuestions = [...questions];
    const [question] = updatedQuestions.splice(index, 1);
    updatedQuestions.splice(replaceToIndex, 0, question);

    setQuestions(updatedQuestions);

    window.scrollTo({top: scrollAmount, behavior: "smooth"});
}

  return (
    <div className={`${styles.questionWrapper}`} id={"q" + id}>  
      <div className={`${styles.question} ${showLess ? styles.showLess : ""} ${errors?.id === id ? styles.hasError : ""}`}>
        <span className={styles.questionId}>#id:{id}</span>

        <div className={styles.icons}>

          <div className={styles.deleteQuestionIcon}
            onDoubleClick={handleDropAnswer} 
            onMouseEnter={e => setTitle({txt: "Double click to remove Questions", x: e.pageX, y: e.pageY})} 
            onMouseLeave={() => setTimeout(() => setTitle(), 200)}
          >
            <i className="fa-solid fa-trash-can"></i>
          </div>

          <div className={styles.showQuestionIcon} onClick={() => setShowLess(v => !v)} >
            <i className={`fa-solid ${showLess ? "fa-plus" : "fa-minus"}`}></i>
          </div>

          <div className={styles.moveQuestionUpIcon} onClick={() => moveQuestion(1)}>
            <i className={"fa-solid fa-angle-up"}></i>
          </div>

          <div className={styles.moveQuestionDownIcon} onClick={() => moveQuestion(-1)}>
            <i className={"fa-solid fa-angle-down"}></i>
          </div>

        </div>

        <div className={styles.field}>
          <label htmlFor="name">Question N°: {index +1} </label>
          <input type="text" value={getQuestionTitle()} onChange={e => handleChangeQuestionName(e)} />
        </div>
        
        <div className={styles.answers}>

          {thisQuestion().answers.map((answer, ind) => <Answer key={answer.id} question={thisQuestion()} questionId={id} id={answer.id} index={ind} />)}

          <button tabIndex={-1} onClick={handleAddAnswer}>Add Answer</button>

        </div>
      </div>

    </div>
  )
}


function QuestionsWrapper(){
  const [questions, setQuestions] = useContext(createFileContext).questions.values;
  const [questionCounter, updateAnswerCounter] = useContext(createFileContext).questions.id;
  const newQuestion = {
    id: questionCounter +1,
    text: "",
    answers: [{id: 0, text: "", isCorrect: false}, {id: 1, text: "", isCorrect: false}]
  };

  function handleAddQuestion(){
    updateAnswerCounter()
    setQuestions(qsts => [...qsts, newQuestion])
  }

  return (
    <div className={styles.questionsWrapper}>
      {questions.map((qst, ind) => 
        <Question key={qst.id} id={qst.id} index={ind}
      />)}

      <button onClick={handleAddQuestion}>Add question</button>
    </div>
  )
}

export default function CreateFile(){
  
  function getDataFromLocalStorage(key){
    return JSON.parse(localStorage.getItem(key))
  }

  const [title, setTitle] = useMyContext().title
  const [fileContent, setFileContent] = useMyContext().file
  const [questions, setQuestions] = useState(getDataFromLocalStorage("questions") || []);
  const [questionCounter, setQuestionCounter] = useState(0);
  const [fileName, setFileName] = useState(localStorage.getItem("fileName") || "exercices");
  const [errors, setErrors] = useState({invisible: true, text: "This is an error message"});

  useEffect(() => {
    function setItemInLocalStorage(key, value){
      localStorage.setItem(key, value)
    }
    
    setItemInLocalStorage("fileName", fileName);
    setItemInLocalStorage("questions", JSON.stringify(questions));
  }, [fileName, questions])


  const navigate = useNavigate()
  
  function incrementQuestionCounter(){
    setQuestionCounter(c => c +1);
  }

  const fileContextValues = {
    questions: {
      id: [questionCounter, incrementQuestionCounter], 
      values: [questions, setQuestions],
    },
    errors: [errors, setErrors]
  }


  function clearAllQuestions(){
    setQuestions([])
    setErrors(null)
    setTimeout(() => setTitle(null), 200);  
  }

  function validateData(){
    var localError = null;
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
      setFileContent({fname: fileName, fcontent: questions})
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
  };

  return (
    <createFileContext.Provider value={fileContextValues}>
      {title && <Title />}

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
                
              <button onDoubleClick={clearAllQuestions} 
                onMouseEnter={e => setTitle({txt: "Double click to remove Questions", x: e.pageX, y: e.pageY})} 
                onMouseLeave={() => setTimeout(() => setTitle(), 200)}
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
    </createFileContext.Provider>
  )
}