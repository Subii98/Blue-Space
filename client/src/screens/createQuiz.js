import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";

function CreateQuiz(props) {
    // const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    // const [name, setName] = useState("");
    // const [platforms, setPlatforms] = useState();
    // const [id, setId] = useState("")

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             setLoading(true);
    //             const { data } = await axios.get("/api/platforms/platformid/"+id);
    //             console.log("name " ,name)
    //             console.log("store", store)
    //             setLoading(false);
    //             setPlatforms(data);
    //         } catch (err) {
    //             setError(err.message);
    //             setLoading(false);
    //         }
    //     };
    //     if(name && name.length > 0)
    //         fetchData();
    // }, [ name ]);
    return(
        <div>
            <Tags/>
            {/* <PostArea/> */}
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

export default CreateQuiz