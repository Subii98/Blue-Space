import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QuizScore from './QuizScore.js'

function Question(props) {
    const [index, setIndex] = useState(0)
    const [questions, setQuestions] = useState(props.question)
    const [question, setQuestion] = useState(questions[0])
    const [checked, setChecked] = useState(false)
    const [disable, setDisable] = useState(false)
    const [endQuiz, setEndQuiz] = useState(false);
    const [option, setOption] = useState("");
    const [first, setFirst] = useState(question.first)
    const [second, setSecond] = useState(question.second)
    const [third, setThird] = useState(question.third)
    const [fourth, setFourth] = useState(question.fourth)
    const [correct, setCorrect] = useState(0)
    //const question = questions[index]

    useEffect( () => {
        setQuestion(questions[index])
        setFirst(question.first)
        setSecond(question.second)
        setThird(question.third)
        setFourth(question.fourth)
    }, [index])

    const onSaveClickCheckAnswer = (e) => {
        e.preventDefault()
        setDisable(true)
        document.getElementById("result").innerHTML = "";
        var ele = document.getElementsByTagName('input');
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type = "radio") {
                if (ele[i].checked && ele[i].value == question.answer){
                    document.getElementById("result").innerHTML += "Correct!"
                    setChecked(true)
                    setCorrect(correct+1)
                    setOption(ele[i].value)
                    if (option == "1"){
                        setFirst(first+1)
                    }
                    else if (option == "2"){
                        setSecond(second+1)
                    }
                    else if (option == "3"){
                        setThird(third+1)
                    }
                    else if (option == "4"){
                        setFourth(fourth+1)
                    }
                }  
                else if (ele[i].checked){
                    document.getElementById("result").innerHTML
                            += "Wrong<br>Answer: " + question.option[question.answer-1] + "<br>";
                    setChecked(true)
                    setOption(ele[i].value)
                }
            }
        }
    }
    
    const onNextClick = async (e) => {
        e.preventDefault();
        setDisable(false)
        if (checked){
            console.log('next question')
            try{
                const res = await axios.put(`/:id/question/${question._id}`, {
                    first: first,
                    second: second,
                    third: third,
                    fourth: fourth
                })
            } catch(err){
                console.log(err)
            }
            if (index < questions.length-1){
                setIndex(index+1)
                document.getElementById("result").innerHTML = ""
                setChecked(false)
            }
            else if (index == questions.length-1){
                console.log(index)
                setEndQuiz(true)
            }
        }            
    }

    const onBackClick = (e) => {
        e.preventDefault();
        if (index > 0) {
            setIndex(index-1)
            document.getElementById("result").innerHTML = ""
        }            
    }
    if (!endQuiz){
        return(
            <div className = "quizArea">
                <p>Question {question._id}</p>
                <form className="questions">
                    <span key={question._id} className="question">{question.text}</span><br/>
                    <div className="options">
                        {question.option.length >=1 
                            ?
                            [<input type="radio" id="option1" name="option" value="1" disabled={disable}></input>,
                            <label for="option1">{question.option[0]}</label>,
                            <br/>
                            ]
                           : []} 
                        {question.option.length >=2
                            ?
                            [<input type="radio" id="option2" name="option" value="2" disabled={disable}></input>,
                            <label for="option2">{question.option[1]}</label>,
                            <br/>
                            ]
                           : []} 
                        {question.option.length >=3
                            ?
                            [<input type="radio" id="option3" name="option" value="3" disabled={disable}></input>,
                            <label for="option3">{question.option[2]}</label>,
                            <br/>
                            ]
                           : []} 
                        {question.option.length >=4
                            ?
                            [<input type="radio" id="option4" name="option" value="4" disabled={disable}></input>,
                            <label for="option4">{question.option[3]}</label>,
                            <br/>
                            ]
                           : []} 
                    </div>
                    <div className = "questionButtons">
                        <button id="save" disabled = {disable} type="submit" onClick = {(e)=> {onSaveClickCheckAnswer(e)}}>SAVE</button>
                        <button onClick = {(e)=>{onNextClick(e)}}>NEXT</button>
                        <button onClick = {(e)=>{onBackClick(e)}}>BACK</button>
                    </div>
                </form>
                <div className="result" id = "result"></div>
            </div>
        )
    }
    else{
        return(
            <QuizScore questions={questions} correct={correct}/>
        )
    }
}

export default Question