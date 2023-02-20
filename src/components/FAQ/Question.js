import React,{useState} from "react";
const Question = props => {
    const [isActive, setActive] = useState(false);
    
    const handleClick = (id) => {
     setActive(true)
   }
     return(
       <div id={props.id}>
         <button onClick={() => handleClick(props.id)} className="faq-quest-btn">
            <h4 className={isActive ? "colorfull-text" :""}>{isActive ?  " - "  : " + " }{props.question}</h4><br/>
            {isActive ?<div>{props.answer}</div> : ""}
         </button> 
       </div>
     )
     }
   export default Question;