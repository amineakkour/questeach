import styles from "../../styles/createFile.module.css"
import { useCreateFileContext } from "../../context/CreateFileProvider";
import Question from "./Question";

export default function QuestionsWrapper(){
  const {questions, setQuestions, questionsCounter, setQuestionsCounter} = useCreateFileContext();

  const newQuestion = {
    id: questionsCounter +1,
    text: "",
    answers: [{id: 0, text: "", isCorrect: false}, {id: 1, text: "", isCorrect: false}]
  };

  function handleAddQuestion(){
    setQuestionsCounter(v => v +1)
    setQuestions(qsts => [...qsts, newQuestion])
  }

  return (
    <div className={styles.questionsWrapper}>
      {questions.map((qst, ind) => 
        <Question key={qst.id} id={qst.id} index={ind} />
      )}

      <button onClick={handleAddQuestion}>Add question</button>
    </div>
  )
}