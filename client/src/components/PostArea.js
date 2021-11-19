import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../index.css";
import { FetchApiPost } from "../utils/Network";

function PostArea(props) {
    const history = useHistory();
    const [platform, setPlatform] = useState();

    const subscribe = async () => {
        let res = await FetchApiPost("/api/v1/subscribe", {});
    };

    useEffect(() => {
        if (props.platform) setPlatform(props.platform);
    }, [props.platform]);

    const onClickEdit = () => {
        history.push("/EditPlatform/" + platform._id);
    };

    if (platform == undefined) return <div>LOADING..</div>;
    console.log(platform);
    return (
        <div className="postArea">
            <div className="banner">
                <img src={platform.banner} />
            </div>
            <div className="platformInfoArea">
                <img src="/images/platformprofile.jpg" alt="platformprofile" />
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="" Style={"color:" + platform.fontColor}>{platform.title}</a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformBottom">
                        {/* <span Style={"color:#e52424"}>{platform.description}</span> */}
                        <span>{platform.description}</span>
                        {/* <span>{platform.description}</span> */}
                        <button type="button" onClick={subscribe}>
                            SUBSCRIBE
                        </button>
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
