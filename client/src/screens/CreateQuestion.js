import React, { useEffect, useState, useContext } from "react";
import { FetchApiGet, FetchApiPost } from "../utils/Network";
import { Button, Typography, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { set } from "mongoose";

function CreateQuestion(props) {
    const history = useHistory();
    console.log(props);
    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");
    const [optionFour, setOptionFour] = useState("");
    const [nextDisabled, setNextDisabled] = useState(true);
    const [backDisabled, setBackDisabled] = useState(true);
    const [questionDisabled, setQuestionDisabled] = useState(true);
    const [max, setMax] = useState(0);
    const [index, setIndex] = useState(0);

    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questionID, setQuestionID] = useState(0);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        console.log("updating info");
        setUpdate(false);
        if (props.match.params.quizId) fetchQuiz();
    }, [update]);

    useEffect(() => {
        console.log("index updated");
        if (index == max) {
            setText("");
            setAnswer("");
            setOptionOne("");
            setOptionTwo("");
            setOptionThree("");
            setOptionFour("");
            if (max > 0) {
                setQuestionID(quiz[index - 1].questionNum + 1);
            }
            console.log("Questionid:",questionID);
            console.log("index num:", index);
        } else {
            setText(quiz[index].text);
            setAnswer(quiz[index].answer);
            setOptionOne(quiz[index].option[0]);
            setOptionTwo(quiz[index].option[1]);
            setOptionThree(quiz[index].option[2]);
            setOptionFour(quiz[index].option[3]);
            setQuestionID(quiz[index].questionNum);
        }
    }, [index,quiz]);


    useEffect(()=> {
        if (index <= 0) {
            setBackDisabled(true);
        } else {
            setBackDisabled(false);
        }
        if (index == max){
            setQuestionDisabled(true);
            setNextDisabled(true);
        } else {
            setQuestionDisabled(false);
            setNextDisabled(false);
        }
    }, [index,max]);

    const onBackClick = e => {
        e.preventDefault();
        console.log("back not pressed, index: ", index);
        if (index > 0) {
            setIndex(index - 1);
        }
        
    };
    const onNextClick = e => {
        e.preventDefault();
        setIndex(index + 1);
    };
    const addQuestion = e => {
        e.preventDefault();
        setIndex(max);
    };

    const onClickSubmit = async () => {
        if (index == max) {
            console.log("create new question");
            let res = await FetchApiPost("/api/questions/insert", {
                text: text,
                option: [optionOne, optionTwo, optionThree, optionFour],
                answer: answer,
                quizId: props.match.params.quizId,
                questionNum: questionID,
            });
            setUpdate(true);
            alert("question added");
        } else {
            console.log('update new question');
            let res = await FetchApiPost("/api/questions/upsert", {
                text: text,
                option: [optionOne, optionTwo, optionThree, optionFour],
                answer: answer,
                quizId: props.match.params.quizId,
                questionNum: questionID,
            });
            setUpdate(true);
            alert("question modified");
        }
        
        setUpdate(true);
        /*
        setText("")
        setAnswer("")
        setOptionOne("")
        setOptionTwo("")
        setOptionThree("")
        setOptionFour("")
        */
    };

    function fetchQuiz() {
        axios
            .get("/api/questions/get_question/" + props.match.params.quizId)
            .then(res => {
                //setLoading(true);
                const data = res?.data;
                setMax(data.length);
                console.log("quiz data", data);
                setQuiz(data);
                
                setIndex(0);
                setBackDisabled(true);
                if (max > 0) {
                    setNextDisabled(false);
                }
                //setLoading(false);
                return;
            })
            .catch(error => {
                //setError("Error loading quiz");
                //setLoading(false);
                console.log("Error loading quiz");
            });
    }

    // const platform = async() =>{
    //     // const { data } = await axios.get("/api/platforms/name/"+name);
    //     let quiz = await FetchApiGet("api/quizzes/get_quiz" + props.match.params.quizId)
    //     console.log(quiz)
    // }
    // console.log(props.match.params.quizId)
    // const { data } =  axios.get("api/quizzes/get_quiz" + props.match.params.quizId)
    // console.log(data)

    // useEffect(() => {
    //     axios
    //          .get("/api/quizzes/get_quiz/" + props.match.params.quizId)
    //          .then(res => {
    //              console.log()
    //              console.log("???", res.data)
    //          })
    //          .catch((error) => {

    //    console.log("Error loading home page");
    //          });
    // }, []);

    return (
        <div className="createquiz-main-container">
            {/* <Tags/> */}
            {/* <PostArea/>             */}
            <Typography fontSize="30px" marginBottom="24px">
                Edit Quiz Screen
            </Typography>
            <div className="createquiz-content">
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Question {index+1} :</div>
                    <TextField
                        onChange={e => setText(e.target.value)}
                        value={text}
                        label="Question"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Answer :</div>
                    <TextField
                        onChange={e => setAnswer(e.target.value)}
                        value={answer}
                        label="Answer"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">First :</div>
                    <TextField
                        onChange={e => setOptionOne(e.target.value)}
                        value={optionOne}
                        label="First"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Second :</div>
                    <TextField
                        onChange={e => setOptionTwo(e.target.value)}
                        value={optionTwo}
                        label="Second"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Third :</div>
                    <TextField
                        onChange={e => setOptionThree(e.target.value)}
                        value={optionThree}
                        label="Third"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Fourth :</div>
                    <TextField
                        onChange={e => setOptionFour(e.target.value)}
                        value={optionFour}
                        label="Fourth"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style: { fontSize: "12px" } }}
                    />
                </div>
                <Button style={{ width: "10%", marginTop: "12px" }} onClick={onClickSubmit}>
                    SUBMIT
                </Button>
                <Button
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={() => history.goBack()}
                >
                    CANCEL
                </Button>
                <Button
                    disabled={backDisabled}
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={onBackClick}
                >
                    Back
                </Button>
                <Button
                    disabled={nextDisabled}
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={onNextClick}
                >
                    Next
                </Button>
                <Button
                    disabled={questionDisabled}
                    style={{ width: "10%", marginTop: "12px" }}
                    onClick={addQuestion}
                >
                    Add Question
                </Button>
            </div>
        </div>
    );
}

export default CreateQuestion;
