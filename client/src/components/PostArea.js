import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

function PostArea(props) {
    const history = useHistory();
    const [platform, setPlatform] = useState();

    useEffect(() => {
        if (props.platform) setPlatform(props.platform);
    }, [props.platform]);

    const onClickEdit = () => {
        history.push("/EditPlatform/" + platform._id);
    };

    if (platform == undefined) return <div>LOADING..</div>;
    console.log(platform)
    return (
        <div className="postArea">
            <div className="banner">
                <img src={platform.banner} />
            </div>
            <div className="platformInfoArea">
                <img src="/images/platformprofile.jpg" alt="platformprofile" />
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="">{platform.title}</a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformBottom">
                        <span>{platform.description}</span>
                        <button type="button">SUBSCRIBE</button>
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
