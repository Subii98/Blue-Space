import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";
import Platform from '../components/Platform.js';
import PlatformCard from '../components/PlatformCard.js'


function CreatePlatform(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/name/"+name);
                console.log("name " ,name)
                console.log("store", store)
                setLoading(false);
                setPlatforms(data);
                console.log("data", data)
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        if(name && name.length > 0)
            fetchData();
    }, [ name ]);

    useEffect(()=>{
        if(store && store.username)
            setName(store.username);
    },[store]);

    return (
        <div>
            {/* <Tags />
            <PostArea /> */}
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                
                {/* {platforms && platforms.map((raw,idx)=>{ */}
                    {/* return (
                        // <div key={"Platform" + idx}>
                        //     <CardContent>
                        //         <Typography >
                        //             {idx+1}
                        //         </Typography>
                        //         <Typography gutterBottom variant="h5" component="div">
                        //             {raw.title}
                        //         </Typography>     
                        //     </CardContent>
                            
                        // </div>
                        <div className>
                            <p style={{textAlign: "center", color: "#929292"}}>Owned Platforms</p>
                            <Platform platforms = {platforms}></Platform>
                            {/* <PlatformCard platform={platforms}></PlatformCard>) */}
                        {/* </div>  */}
                    {/* ); */}
                {/* })} */}
                
                
                <div className>
                    {name}
                    <p style={{textAlign: "center", color: "#929292"}}>Owned Platforms</p>
                    <Platform platforms = {platforms}></Platform>
                </div> 
            </div>
        </div>
    );
}

export default CreatePlatform;