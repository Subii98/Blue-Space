import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import { FetchApiGet, FetchApiPost } from "../utils/Network";
import { Button, Typography, TextField } from "@mui/material";


function CreateQuiz(props) {
    //use react hooks to set data (empty array by default)
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    console.log(props.match.params);
    const onClickSubmit = async () => {
        let res = await FetchApiPost("/api/quizzes/insert", {
            title,
            description,
            platformId: props.match.params.platformId,
        });
        alert("quiz added");
    };
    return (
        <div className="createquiz-main-container">
            {/* <Tags/> */}
            {/* <PostArea/>             */}
            <Typography fontSize="30px" marginBottom="24px">
                Create Quiz Screen
            </Typography>
            <div className="createquiz-content">
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">TITLE :</div>
                    <TextField
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        label="Title"
                        style={{ minWidth: "300px" }}
                        inputProps={{ style: { fontSize: "14px" } }}
                        InputLabelProps={{ style : {fontSize : "12px"}}}
                    />
                </div>
                <div className="createquiz-content-block">
                    <div className="createquiz-content-block-label">DESC :</div>
                    <TextField
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        label="Description"
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

export default CreateQuiz;
