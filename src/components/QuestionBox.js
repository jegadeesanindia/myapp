import React,{useState} from "react";

const QuestionBox=({question,options,selected})=>{
    const [answer, setAnswer]=useState(options);
    return (
        <div className="questionBox">
            <div className="quesion">{question}</div>
            { answer.map((text,index)=>(
                <button key={index} className="answerBtn"
                onClick={
                    ()=>
                    {
                        setAnswer([text]);
                        selected(text);
                    }
                }>
                {text}
                </button>
            ))}
        </div>
    )
}

export default QuestionBox;