import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { useIsMounted } from "../components/useIsMounted.js";
import { FetchApiGet, FetchApiPost } from "../utils/Network";
import { Button, Typography, TextField } from "@mui/material";
import { set } from "mongoose";
import { Link } from 'react-router-dom';


function CreateQuestion(props) {
    console.log(props)
    const [text, setText] = useState("");
    const [answer, setAnswer] = useState("");
    const [optionOne, setOptionOne] = useState("");
    const [optionTwo, setOptionTwo] = useState("");
    const [optionThree, setOptionThree] = useState("");
    const [optionFour, setOptionFour] = useState("");

    const onClickSubmit = async () => {
        let res = await FetchApiPost("/api/questions/insert", {
            text: text,
            option: [optionOne, optionTwo, optionThree, optionFour],
            answer: answer,
            quizId : props.match.params.quizId
        });
        alert("question added");
        setText("")
        setAnswer("")
        setOptionOne("")
        setOptionTwo("")
        setOptionThree("")
        setOptionFour("")
    };

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
                Create Quiz Screen
            </Typography>
            <div className="createquiz-content">
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">Quesion :</div>
                    <TextField
                        onChange={e => setText(e.target.value)}
                        value={text}
                        label="Question"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style : {fontSize : "12px"}}}
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
                        InputLabelProps={{ style : {fontSize : "12px"}}}
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
                        InputLabelProps={{ style : {fontSize : "12px"}}}
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
                        InputLabelProps={{ style : {fontSize : "12px"}}}
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
                        InputLabelProps={{ style : {fontSize : "12px"}}}
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
                        InputLabelProps={{ style : {fontSize : "12px"}}}
                    />
                </div>
                <Button style={{ width: "10%", marginTop: "12px" }} onClick={onClickSubmit}>
                    SUBMIT
                </Button>
                
            </div>
        </div>
    );
}

export default CreateQuestion;
