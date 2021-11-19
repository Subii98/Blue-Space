import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
import { FetchApiPost } from "../utils/Network";
import axios from "axios";

function PostArea(props) {
    const history = useHistory();
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState(false);
    const [buttonOne, setButtonOne] = useState(true);
    const [buttonTwo, setButtonTwo] = useState(false);

    const subscribe = async () => {
        let res = await FetchApiPost("/api/v1/subscribe", {
            userId: user._id,
            platformId: platform._id,
        });
    };

    const unsubscribe = async () => {
        let res = await FetchApiPost("/api/v1/unsubscribe", {
            userId: user._id,
            platformId: platform._id,
        });
    };

    useEffect(() => {
        if (props.platform) setPlatform(props.platform);
        fetchUser();
    }, [props.platform]);

    function fetchUser() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }

    useEffect(()=> {
        if(user){
            console.log("!!!!", user.subscribedPlatforms)
            console.log("!!!!", platform._id)
            if(user.subscribedPlatforms.indexOf(platform._id) != -1){
                setButtonOne(false)
                setButtonTwo(true)
            }
            else{
                setButtonOne(true)
                setButtonTwo(false)
            }
        }
    },[user])
    
    const onClickEdit = () => {
        history.push("/EditPlatform/" + platform._id);
    };

    if (platform == undefined) return <div>LOADING..</div>;
    console.log(platform);
    console.log(user);
    return (
        <div className="postArea">
            <div className="banner">
                <img src={platform.banner} />
            </div>
            <div className="platformInfoArea">
                <img src="/images/platformprofile.jpg" alt="platformprofile" />
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="" Style={"color:" + platform.fontColor}>
                            {platform.title}
                        </a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformBottom">
                        <span>{platform.description}</span>
                        {buttonOne ? (
                            <button type="button" onClick={subscribe}>
                                SUBSCRIBE
                            </button>
                        ) : null}
                        {buttonTwo ? (
                            <button type="button" onClick={unsubscribe}>
                                UNSUBSCRIBE
                            </button>
                        ) : null}
                    </div>
                    <div className="platformBottom">
                        <span></span>

                        <button type="button" onClick={onClickEdit}>
                            EDIT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostArea;
