import "../PlatformScreen.css";
import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";

function CreatePlatform(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/platform/name/"+name);
                setLoading(false);
                setPlatforms(data);
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
            <Tags />
            <PostArea />
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                {platforms && platforms.map((raw,idx)=>{
                    return (
                        <div key={"Platform" + idx}>
                            <div>{idx+1}</div>
                            {/* <div>{raw.description}</div> */}
                            <div>{raw.title}</div>
                            {/* <div>{raw.subscriber}</div> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CreatePlatform;