import React, { Component } from "react";
import ReactDom from "react-dom"
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QUizBee extends Component{
    state={
        questionBank :[],
        score:0,
        response:0
    };

    getQuestions=()=>{
        quizService().then(question =>{
            this.setState({
                questionBank:question
            });
        });
    };

    componentDidMount(){
        this.getQuestions();
    }
    
    computeAnswer=(answer ,correct)=>{
        if(answer===correct){
            this.setState({
                score:this.state.score+1
            })
        }
        this.setState({
            response:this.state.response<5?this.state.response+1:5
        })
    }
    playAgain =()=>{
        this.getQuestions();
        this.setState({
            score:0,
            response:0
        })
    }

    render(){
        return(
            <div className="container">
                <div className="title">QuizBox</div>
                {this.state.questionBank.length>0 &&
                    this.state.response<5 &&
                     this.state.questionBank.map(({question,answers,correct,questionId})=>
                    <QuestionBox 
                        question={question}
                        options={answers}
                        key={questionId}
                        selected ={answer=>this.computeAnswer(answer,correct)}
                        />
                )}

                {
                    this.state.response===5?(<Result score={this.state.score} playAgain={this.playAgain}/>):null
                }
            </div>

        );
    }

}


ReactDom.render(<QUizBee />,document.getElementById("root"));