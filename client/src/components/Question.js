import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizScore from "./QuizScore.js";

function Question(props) {
    const [index, setIndex] = useState(0);
    const [questions, setQuestions] = useState();
    const [question, setQuestion] = useState();
    const [checked, setChecked] = useState(false);
    const [disable, setDisable] = useState(false);
    const [disableNext, setDisableNext] = useState(true);
    const [disableBack, setDisableBack] = useState(true);
    const [endQuiz, setEndQuiz] = useState(false);
    const [option, setOption] = useState("");
    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [fourth, setFourth] = useState("");
    const [correct, setCorrect] = useState(0);
    const [platformId, setPlatformId] = useState();
    const [error, setError] = useState(false);

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
        }
    }, [ props.question ]);

    useEffect(() => {
        if(questions){
            setQuestion(questions[index]);
            setFirst(questions[index].option[0]);
            setSecond(questions[index].option[1]);
            setThird(questions[index].option[2]);
            setFourth(questions[index].option[3]);
        }
    }, [index]);

    const onSaveClickCheckAnswer = e => {
        console.log(question)
        e.preventDefault();
        document.getElementById("result").innerHTML = "";
        var ele = document.getElementsByTagName("input");
        for (var i = 0; i < ele.length; i++) {
            if (ele[i].type == "radio") {
                if (ele[i].checked && ele[i].value == question.answer) {
                    console.log(index);
                    setDisableBack(false);
                    if (index <= 0) {
                        setDisableBack(true);
                    }
                    setDisable(true);
                    setDisableNext(false);
                    document.getElementById("result").innerHTML += "Correct!";
                    setChecked(true);
                    setCorrect(correct + 1);
                    setOption(ele[i].value);
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
                    document.getElementById("result").innerHTML +=
                        "Wrong<br>Answer: " + question.option[question.answer - 1] + "<br>";
                    setChecked(true);
                    setOption(ele[i].value);
                }
            }
        }
    };

    const onNextClick = async e => {
        e.preventDefault();
        setDisable(false);
        if (checked) {
            console.log("next question");
            try {
                const res = await axios.put(`/:id/question/${question._id}`, { //????
                    first: first,
                    second: second,
                    third: third,
                    fourth: fourth,
                });
            } catch (err) {
                console.log(err);
            }
            if (index < questions.length - 1) {
                setIndex(index + 1);
                document.getElementById("result").innerHTML = "";
                setChecked(false);
                setDisableNext(true);
            } else if (index == questions.length - 1) {
                setDisableBack(true);
                setEndQuiz(true);
            }
        }
    };

    const onBackClick = e => {
        e.preventDefault();
        if (index > 0) {
            setIndex(index - 1);
            document.getElementById("result").innerHTML = "";
            console.log("index: ", index);
        }
        if (index <= 1) {
            setDisableBack(true);
        }
    };
    if(question == undefined) return ( <div>LOADING..</div>)
    if (!endQuiz) {
        return (
            <div className="quizArea">
                <p>Question {index+1}</p>
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
                                onSaveClickCheckAnswer(e);
                            }}
                        >
                            SAVE
                        </button>
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
                <div className="result" id="result"></div>
            </div>
        );
    } else {
        return <QuizScore questions={questions} correct={correct} platformId={platformId}/>;
    }
}

export default Question;
