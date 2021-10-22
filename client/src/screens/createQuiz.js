import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";

function createQuiz(props) {
    return(
        <div>
            <Tags/>
            <PostArea/>
            <div style={{margin : 4+'em'}}>
                <label>Question: </label>
                <div style={{margin : 1 +'em'}}>
                <input type="text" style={{width : 60 + 'em', height : 2 + 'em'}}></input>
                </div>
                <label>Answers: </label>
                <div style={{margin : 1+'em'}}>
                <input type="text"></input>
                </div>
                <div style={{margin : 1+'em'}}>
                <input type="text"></input>
                </div>
                <div style={{margin : 1 +'em'}}>
                <input type="text"></input>
                </div>
                <div style={{margin : 1 +'em'}}>
                <input type="text"></input>
                </div>
                <div style={{margin : 2+'em'}}>
                <button type="button">Create</button>

                <button type="button">Cancel</button>
                </div>
            </div>
            

        </div>
    )
}

export default createQuiz