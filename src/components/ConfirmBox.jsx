export function ConfirmBox({message, trueLabel , falseLabel}){
  return (
    <div>
      <div className="confirm-wrapper">
      </div>
      <div className="confirm-box">
        <h4 className="message">{message}</h4>
        <div className="btns">
          <button className="green-btn" onClick={trueLabel.action}>{trueLabel.name}</button>
          <button className="red-btn" onClick={falseLabel.action}>{falseLabel.name}</button>
        </div>
      </div>  
    </div>
  )
}