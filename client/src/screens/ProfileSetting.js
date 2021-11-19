import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";
import Platform from "../components/Platform.js";
import PlatformCard from "../components/PlatformCard.js";

function ProfileSetting(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [user, setUser] = useState();
    const [subscribingPlatforms, setSubscribingPlatforms] = useState([]);

    useEffect(() => {
        // const fetchData = async () => {
        //     try {
        //         setLoading(true);
        //         const { data } = await axios.get("/api/platforms/name/"+name);
        //         console.log("name " ,name)
        //         console.log("store", store)
        //         setLoading(false);
        //         setPlatforms(data);
        //         console.log("data", data)
        //     } catch (err) {
        //         setError(err.message);
        //         setLoading(false);
        //     }
        // };
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }, []);

    useEffect(() => {
        console.log("userDataaaa", user);
        if (user) {
            const fetchData = async () => {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/" + user._id);
                setLoading(false);
                setPlatforms(data);
                console.log("dataaaa",user.subscribedPlatforms)
                user.subscribedPlatforms.map((raw, idx)=>{
                    subscribe(raw);
                })
                console.log(subscribingPlatforms)
            };
            fetchData();   
        }
    }, [user]);
    
    function subscribe(id) {
        axios
            .get("/api/platforms/by_id/" + id)
            .then(res => subscribingPlatforms.push(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }

    useEffect(() => {
        if (store && store.username) setName(store.username);
    }, [store]);

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
                    <input type="text" value={name} />
                    <p style={{ textAlign: "center", color: "#929292" }}>Owned Platforms</p>
                    <Platform platforms={platforms}></Platform>
                    <p style={{ textAlign: "center", color: "#929292" }}>Subscribing Platforms</p>
                    <Platform platforms={subscribingPlatforms}></Platform>
                </div>
            </div>
        </div>
    );
}

export default ProfileSetting;
