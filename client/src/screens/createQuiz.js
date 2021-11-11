import "../PlatformScreen.css";
import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet, FetchApiPost } from "../utils/Network";


function CreateQuiz(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState();
    const [id, setId] = useState("")

    const [text, setText] = useState("")
    const [option, setOption] = useState([])
    const [answer, setAnswer] = useState()
    const [optionOne, setOptionOne] = useState("")
    const [optionTwo, setOptionTwo] = useState("")
    const [optionThree, setOptionThree] = useState("")
    const [optionFour, setOptionFour] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/platformid/"+ id);
                setLoading(false);
                setPlatforms(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const onClickSubmit = async () => {
        let res = await FetchApiPost("/api/questions/insert",{
            text: text,
            option: [optionOne, optionTwo, optionThree, optionFour],
            answer: answer
        });
        alert("question added")
    };
    return(
        <div>
            {/* <Tags/> */}
            {/* <PostArea/>             */}
            <div style={{margin : 4+'em'}}>
                <label>Question: </label>
                <div style={{margin : 1 +'em'}}>
                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" style={{width : 60 + 'em', height : 2 + 'em'}}></input>
                </div>
                <label>Answers: </label>
                <div style={{margin : 1+'em'}}>
                <input type="text" value={optionOne} onChange={(e)=>setOptionOne(e.target.value)}></input>
                </div>
                <div style={{margin : 1+'em'}}>
                <input type="text" value={optionTwo} onChange={(e)=>setOptionTwo(e.target.value)}></input>
                </div>
                <div style={{margin : 1 +'em'}}>
                <input type="text" value={optionThree} onChange={(e)=>setOptionThree(e.target.value)}></input>
                </div>
                <div style={{margin : 1 +'em'}}>
                <input type="text" value={optionFour} onChange={(e)=>setOptionFour(e.target.value)}></input>
                </div>
                <div style={{margin : 1 +'em'}}>
                <label>Correct Answers: </label>
                <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)}></input>
                </div>
                <div style={{margin : 2+'em'}}>
                <button type="button" onClick={onClickSubmit}>Create</button>
                <button type="button">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateQuiz