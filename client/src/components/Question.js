import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizScore from "./QuizScore.js";
import { FetchApiPost } from "../utils/Network";
import Timer from "../components/Timer.js";
import Statistics from "./Statistics.js";
import { set } from "mongoose";

function Question(props) {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState();
    const [question, setQuestion] = useState();
    const [checked, setChecked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [addTimeDisable, setAddTimeDisable] = useState(false)
    const [disableNext, setDisableNext] = useState(true);
    const [disableBack, setDisableBack] = useState(true);
    const [endQuiz, setEndQuiz] = useState(false);
    //const [option, setOption] = useState("");
    const [first, setFirst] = useState();
    const [second, setSecond] = useState();
    const [third, setThird] = useState();
    const [fourth, setFourth] = useState();
    const [count, setCount] = useState(0);
    const [platformId, setPlatformId] = useState();
    const [error, setError] = useState(false);
    const [timeOut, setTimeOut] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [defaultTime, setDefaultTime] = useState(10)

    //const question = questions[index]

    useEffect(() => {
        axios
            .get("/api/quizzes")
            .then(res => {
                const data = res?.data;
                setPlatformId((data.find( x => x._id === props.question[0].quizId).platformId))
                return;
            })
            .catch(error => {
                setError("Error finding quiz");
                console.log("Error finding quiz");
            });
    }, [])

    useEffect(() => {
        if(props.question && props.question.length > 0){
            setQuestions(props.question);
            setQuestion(props.question[0]);
            setFirst(props.question[0].first)
            setSecond(props.question[0].second)
            setThird(props.question[0].third)
            setFourth(props.question[0].fourth)
            setChecked(false)
            setTimeOut(false)
            setDefaultTime(10)
            setAddTimeDisable(false)
        }
    }, [ props.question ]);

    useEffect(() => {
        if(questions){
            setQuestion(questions[index]);
            setFirst(question.first);
            setSecond(question.second);
            setThird(question.third);
            setFourth(question.fourth);
            setChecked(false)
            setTimeOut(false)
            setDefaultTime(10)
            setAddTimeDisable(false)
        }
    }, [index]);

    useEffect(() => {
        if (timeOut)
            setChecked(true)
            setDisable(timeOut)
            setDisableBack(false);
            if (index <= 0) 
                setDisableBack(true);
            setDisableNext(false);
            setAddTimeDisable(timeOut)
    }, [timeOut])

    useEffect(()=> {

    }, [checked, addTimeDisable])

    const onClickSaveCheckAnswer = e => {
        console.log(question)
        e.preventDefault();
        setTimeOut(true)
        var ele = document.getElementsByTagName("input");
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio") {
                if (ele[i].checked && ele[i].value == question.answer) {
                    setDisableBack(false);
                    if (index <= 0) {
                        setDisableBack(true);
                    }
                    setDisable(true);
                    setDisableNext(false);
                    setChecked(true);
                    setCount(count + 1);
                    setCorrect(true)
                    setAddTimeDisable(true)
                    const option = ele[i].value;
                    if (option == "1") {
                        setFirst(first + 1);
                    } else if (option == "2") {
                        setSecond(second + 1);
                    } else if (option == "3") {
                        setThird(third + 1);
                    } else if (option == "4") {
                        setFourth(fourth + 1);
                    }
                } else if (ele[i].checked) {
                    setDisable(true);
                    setDisableNext(false);
                    setDisableBack(false);
                    if (index <= 0) {
                        setDisableBack(true);
                    }
                    setChecked(true);
                    const option = ele[i].value;
                    if (option == "1") {
                        setFirst(first + 1);
                    } else if (option == "2") {
                        setSecond(second + 1);
                    } else if (option == "3") {
                        setThird(third + 1);
                    } else if (option == "4") {
                        setFourth(fourth + 1);
                    }

                }
            }            
        }
    };

    const onNextClick = async e => {
        e.preventDefault();
        setDisable(false);
        if (checked) {
            console.log("next question");
            let res = await FetchApiPost("/api/questions/edit", {
                questionId: question._id,
                quizId: question.quizId,
                text: question.text,
                option: question.option,
                first: first,
                second: second,
                third: third,
                fourth: fourth,
                questionNum: question.questionNum
            });

            if (index < questions.length - 1) {
                setIndex(index + 1);
                setChecked(false);
                setDisableNext(true);
                setTimeOut(false)
                setCorrect(false)
            } else if (index == questions.length - 1) {
                setDisableBack(true);
                setCorrect(false)
                setEndQuiz(true);
            }
        }
    };

    const onBackClick = e => {
        e.preventDefault();
        if (index > 0) {
            setIndex(index - 1);
            console.log("index: ", index);
        }
        if (index <= 1) {
            setDisableBack(true);
        }
    };

    const onClickAddTime = e => {
        e.preventDefault()
        setDefaultTime(defaultTime + 5)
        setTimeOut(false)
    }

    if(question == undefined) return ( <div>LOADING..</div>)
    if (!endQuiz) {
        return (
            <div className="quizArea">
                <div className= "quizHeader">
                    <p>Question {index+1}</p>
                    <Timer time={defaultTime} timeOut={timeOut} setTimeOut={setTimeOut} setDefaultTime={setDefaultTime}/>
                </div>
                <form className="questions">
                    <span key={question._id} className="question">
                        {question.text}
                    </span>
                    <br />
                    <div className="options">
                        {question.option.length >= 1
                            ? [
                                  <input
                                      type="radio"
                                      id="option1"
                                      name="option"
                                      value="1"
                                      disabled={disable}
                                  ></input>,
                                  <label for="option1">{question.option[0]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 2
                            ? [
                                  <input
                                      type="radio"
                                      id="option2"
                                      name="option"
                                      value="2"
                                      disabled={disable}
                                  ></input>,
                                  <label for="option2">{question.option[1]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 3
                            ? [
                                  <input
                                      type="radio"
                                      id="option3"
                                      name="option"
                                      value="3"
                                      disabled={disable}
                                  ></input>,
                                  <label for="option3">{question.option[2]}</label>,
                                  <br />,
                              ]
                            : []}
                        {question.option.length >= 4
                            ? [
                                  <input
                                      type="radio"
                                      id="option4"
                                      name="option"
                                      value="4"
                                      disabled={disable}
                                  ></input>,
                                  <label for="option4">{question.option[3]}</label>,
                                  <br />,
                              ]
                            : []}
                    </div>
                    <div className="questionButtons">
                        <button
                            className="save"
                            disabled={disable}
                            type="submit"
                            onClick={e => {
                                onClickSaveCheckAnswer(e);
                            }}
                        >
                            SAVE
                        </button>
                        <button className="addTime" disabled={addTimeDisable} onClick={e => { onClickAddTime(e)}}>Add Time</button>
                        <div className="questionArrow">
                            <button
                                disabled={disableBack}
                                onClick={e => {
                                    onBackClick(e);
                                }}
                            >
                                <img src="/images/leftArrow.png" width="5%"/>
                            </button>
                            <button
                                disabled={disableNext}
                                onClick={e => {
                                    onNextClick(e);
                                }}
                            >
                                <img src="/images/rightArrow.png" width="5%"/>
                            </button>
                        </div>
                    </div>
                </form>
                {checked ? <Statistics question={question} correct={correct}/> : null}
            </div>
        );
    } else {
        return <QuizScore questions={questions} count={count} platformId={platformId}/>;
    }
}

export default Question;
